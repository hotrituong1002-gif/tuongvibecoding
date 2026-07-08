import Link from "next/link";
import { getProducts } from "@/lib/queries/products";
import { formatVnd } from "@/lib/format";
import { deleteProduct } from "./actions";

export const metadata = {
  title: "Quản trị — Sản phẩm",
};

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Sản phẩm</h1>
          <p className="mt-1 text-sm text-muted">
            Quản lý ebook, combo và gói đặc biệt hiển thị trên website.
          </p>
        </div>
        <Link
          href="/admin/products/new"
          className="btn-gold rounded-full px-5 py-2 text-sm"
        >
          + Thêm sản phẩm
        </Link>
      </div>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="bg-panel-2 text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3">Sản phẩm</th>
              <th className="px-4 py-3">Loại</th>
              <th className="px-4 py-3">Giá</th>
              <th className="px-4 py-3">Bài học</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3">
                  <p className="font-semibold">{p.title}</p>
                  <p className="text-xs text-muted">{p.slug}</p>
                </td>
                <td className="px-4 py-3 text-muted">{p.kind}</td>
                <td className="px-4 py-3 text-gold">{formatVnd(p.price)}</td>
                <td className="px-4 py-3 text-muted">{p.lessons_count}</td>
                <td className="px-4 py-3">
                  {p.is_active ? (
                    <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400">
                      Đang bán
                    </span>
                  ) : (
                    <span className="rounded-full bg-panel-2 px-2.5 py-1 text-xs font-semibold text-muted">
                      Đã ẩn
                    </span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-3">
                    <Link
                      href={`/admin/products/${p.id}`}
                      className="font-semibold text-gold hover:underline"
                    >
                      Sửa
                    </Link>
                    <form action={deleteProduct.bind(null, p.id)}>
                      <button className="font-semibold text-red-400 hover:underline">
                        Xoá
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-muted">
                  Chưa có sản phẩm nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
