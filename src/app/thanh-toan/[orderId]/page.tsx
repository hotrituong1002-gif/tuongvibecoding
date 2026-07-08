import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getProducts } from "@/lib/queries/products";
import type { Order } from "@/lib/types";
import CheckoutClient from "./CheckoutClient";

export const metadata = {
  title: "Thanh toán",
};

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/dang-nhap?next=/thanh-toan/${orderId}`);
  }

  const { data: order } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .maybeSingle<Order>();

  if (!order || order.user_id !== user.id) notFound();

  if (order.status === "paid") {
    redirect("/hoc-vien");
  }

  const products = await getProducts();
  const productTitle =
    order.scope === "bundle"
      ? "Trọn bộ lộ trình"
      : (products.find((p) => p.slug === order.scope)?.title ?? order.scope);

  return (
    <CheckoutClient
      order={order}
      productTitle={productTitle}
      bankAccountNumber={process.env.SEPAY_BANK_ACCOUNT_NUMBER ?? ""}
      bankName={process.env.SEPAY_BANK_NAME ?? ""}
      bankAccountHolder={process.env.SEPAY_BANK_ACCOUNT_HOLDER ?? ""}
    />
  );
}
