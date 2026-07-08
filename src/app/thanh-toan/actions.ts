"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getSetting } from "@/lib/queries/settings";

function randomPaymentCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let out = "";
  for (let i = 0; i < 6; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return `DH${out}`;
}

/**
 * scope: "bundle" to buy the whole roadmap, or an exact product slug.
 */
export async function createOrder(scope: string) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/dang-nhap?next=/san-pham");
  }

  let amount: number;
  if (scope === "bundle") {
    amount = await getSetting<number>("bundle_price", 990000);
  } else {
    const { data: product } = await supabase
      .from("products")
      .select("price")
      .eq("slug", scope)
      .eq("is_active", true)
      .maybeSingle();
    if (!product) throw new Error("Sản phẩm không tồn tại.");
    amount = product.price;
  }

  const { data: order, error } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      scope,
      amount,
      payment_code: randomPaymentCode(),
    })
    .select()
    .single();

  if (error) throw new Error(error.message);

  redirect(`/thanh-toan/${order.id}`);
}
