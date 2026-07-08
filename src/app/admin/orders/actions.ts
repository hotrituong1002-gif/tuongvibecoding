"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

/**
 * Manual reconciliation: admin confirms a transfer that the webhook missed
 * (e.g. customer used the wrong transfer content). Runs as the admin's own
 * session, so RLS's "orders_update_admin" policy gates this — only admins
 * can call it.
 */
export async function markOrderPaid(orderId: string) {
  const supabase = await createClient();

  const { data: order, error: fetchError } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .maybeSingle();

  if (fetchError) throw new Error(fetchError.message);
  if (!order || order.status !== "pending") return;

  const { error: updateError } = await supabase
    .from("orders")
    .update({
      status: "paid",
      paid_at: new Date().toISOString(),
      sepay_transaction_id: "manual-admin",
    })
    .eq("id", orderId);
  if (updateError) throw new Error(updateError.message);

  const slugsToUnlock: string[] =
    order.scope === "bundle"
      ? ((
          await supabase.from("products").select("slug").eq("is_active", true)
        ).data?.map((p) => p.slug) ?? [])
      : [order.scope];

  for (const slug of slugsToUnlock) {
    await supabase
      .from("unlocks")
      .upsert(
        { user_id: order.user_id, product_slug: slug, source: "purchase" },
        { onConflict: "user_id,product_slug", ignoreDuplicates: true },
      );
  }

  revalidatePath("/admin/orders");
}

export async function cancelOrder(orderId: string) {
  const supabase = await createClient();
  const { error } = await supabase
    .from("orders")
    .update({ status: "cancelled" })
    .eq("id", orderId)
    .eq("status", "pending");
  if (error) throw new Error(error.message);
  revalidatePath("/admin/orders");
}
