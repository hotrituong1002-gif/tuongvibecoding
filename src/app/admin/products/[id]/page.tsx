import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Product } from "@/lib/types";
import ProductForm from "../ProductForm";
import { updateProduct, deleteProduct } from "../actions";

export const metadata = {
  title: "Quản trị — Sửa sản phẩm",
};

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle<Product>();

  if (!product) notFound();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Sửa: {product.title}</h1>
          <p className="mt-1 text-sm text-muted">
            Thay đổi sẽ được áp dụng ngay trên website công khai.
          </p>
        </div>
        <form action={deleteProduct.bind(null, product.id)}>
          <button className="rounded-full border border-red-500/40 px-4 py-2 text-sm font-semibold text-red-400 hover:bg-red-500/10">
            Xoá sản phẩm
          </button>
        </form>
      </div>
      <ProductForm
        product={product}
        action={updateProduct.bind(null, product.id)}
        submitLabel="Lưu thay đổi"
      />
    </div>
  );
}
