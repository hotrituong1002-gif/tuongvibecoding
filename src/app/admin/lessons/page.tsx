import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { getProducts } from "@/lib/queries/products";

export const metadata = {
  title: "Quản trị — Bài học",
};

export default async function AdminLessonsIndexPage() {
  const supabase = await createClient();
  const [products, { data: lessons }] = await Promise.all([
    getProducts(),
    supabase.from("lessons").select("product_slug"),
  ]);

  const countBySlug = new Map<string, number>();
  (lessons ?? []).forEach((l) => {
    countBySlug.set(l.product_slug, (countBySlug.get(l.product_slug) ?? 0) + 1);
  });

  return (
    <div>
      <h1 className="text-2xl font-bold">Bài học</h1>
      <p className="mt-1 text-sm text-muted">
        Chọn sản phẩm để thêm/sửa nội dung bài học bên trong.
      </p>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-panel-2 text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3">Sản phẩm</th>
              <th className="px-4 py-3">Số bài học đã có</th>
              <th className="px-4 py-3 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {products.map((p) => (
              <tr key={p.slug}>
                <td className="px-4 py-3">
                  <p className="font-semibold">{p.title}</p>
                  <p className="text-xs text-muted">{p.slug}</p>
                </td>
                <td className="px-4 py-3 text-muted">
                  {countBySlug.get(p.slug) ?? 0} / {p.lessons_count} dự kiến
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/lessons/${p.slug}`}
                    className="font-semibold text-gold hover:underline"
                  >
                    Quản lý bài học
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
