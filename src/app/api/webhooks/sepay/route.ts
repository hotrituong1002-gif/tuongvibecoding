import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

type SepayPayload = {
  id?: number | string;
  referenceCode?: string;
  content?: string;
  transferAmount?: number;
  transferType?: string; // "in" | "out"
};

function isAuthorized(request: Request): boolean {
  const secret = process.env.SEPAY_WEBHOOK_API_KEY;
  if (!secret) return false;

  const header = request.headers.get("authorization") ?? "";
  const token = header.replace(/^(Bearer|Apikey)\s+/i, "").trim();
  return token === secret;
}

function extractPaymentCode(content: string): string | null {
  const match = content.toUpperCase().replace(/\s+/g, "").match(/DH[A-Z0-9]{6,}/);
  return match ? match[0] : null;
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ success: false, error: "unauthorized" }, { status: 401 });
  }

  let payload: SepayPayload;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ success: false, error: "invalid_json" }, { status: 400 });
  }

  const transferType = payload.transferType ?? "in";
  if (transferType !== "in") {
    return NextResponse.json({ success: true });
  }

  const content = payload.content ?? "";
  const transferAmount = Number(payload.transferAmount ?? 0);
  const transactionRef = String(payload.id ?? payload.referenceCode ?? "");

  const paymentCode = extractPaymentCode(content);
  if (!paymentCode) {
    return NextResponse.json({ success: true, note: "no_matching_code" });
  }

  const supabase = createAdminClient();

  const { data: order, error: lookupError } = await supabase
    .from("orders")
    .select("*")
    .eq("payment_code", paymentCode)
    .maybeSingle();

  if (lookupError) {
    // Transient/config error (e.g. Supabase unreachable) — ask SePay to retry
    // rather than silently reporting success.
    return NextResponse.json({ success: false, error: lookupError.message }, { status: 500 });
  }

  if (!order) {
    return NextResponse.json({ success: true, note: "order_not_found" });
  }

  if (order.status !== "pending") {
    return NextResponse.json({ success: true, note: "already_processed" });
  }

  if (transferAmount < order.amount) {
    return NextResponse.json({ success: true, note: "underpaid" });
  }

  const { error: updateError } = await supabase
    .from("orders")
    .update({
      status: "paid",
      paid_at: new Date().toISOString(),
      sepay_transaction_id: transactionRef,
    })
    .eq("id", order.id)
    .eq("status", "pending");

  if (updateError) {
    return NextResponse.json({ success: false, error: updateError.message }, { status: 500 });
  }

  let slugsToUnlock: string[];
  if (order.scope === "bundle") {
    const { data: products } = await supabase
      .from("products")
      .select("slug")
      .eq("is_active", true);
    slugsToUnlock = (products ?? []).map((p) => p.slug);
  } else {
    slugsToUnlock = [order.scope];
  }

  await supabase
    .from("unlocks")
    .upsert(
      slugsToUnlock.map((slug) => ({
        user_id: order.user_id,
        product_slug: slug,
        source: "purchase",
      })),
      { onConflict: "user_id,product_slug", ignoreDuplicates: true },
    );

  return NextResponse.json({ success: true });
}
