import Link from "next/link";
import { getProducts } from "@/lib/queries/products";
import { getSetting } from "@/lib/queries/settings";
import { formatVnd } from "@/lib/format";

export const metadata = {
  title: "Sản phẩm — AI Sales Academy",
};

export default async function SanPhamPage() {
  const [products, bundlePrice] = await Promise.all([
    getProducts(),
    getSetting<number>("bundle_price", 990000),
  ]);

  const ebook = products.find((p) => p.kind === "ebook");
  const combos = products.filter((p) => p.kind === "combo");
  const special = products.find((p) => p.kind === "special");
  const bundleOriginalPrice = products.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-block rounded-full border border-gold/40 bg-gold/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold">
          Sản phẩm
        </span>
        <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">
          Chọn combo phù hợp với bạn
        </h1>
        <p className="mt-4 text-muted">
          Mua lẻ theo nhu cầu, hoặc chọn trọn bộ lộ trình {combos.length} combo
          + ebook để tiết kiệm và đi nhanh hơn.
        </p>
      </div>

      {/* Bundle CTA */}
      <div className="mt-12 overflow-hidden rounded-3xl border border-gold/40 bg-gradient-to-br from-amber-950/60 via-panel to-panel">
        <div className="flex flex-col items-center gap-6 p-8 sm:flex-row sm:justify-between sm:p-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-gold-2">
              Tiết kiệm nhất
            </span>
            <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
              Trọn bộ lộ trình: Ebook + {combos.length} combo + AI Sales System
            </h2>
            <p className="mt-2 text-sm text-muted">
              Đầy đủ hành trình từ tư duy đến tối ưu doanh số, cùng cộng đồng
              tinh hoa AI Sales System đi kèm.
            </p>
          </div>
          <div className="text-center sm:text-right">
            <p className="text-sm text-muted line-through">
              {formatVnd(bundleOriginalPrice)}
            </p>
            <p className="text-3xl font-extrabold text-gold">
              {formatVnd(bundlePrice)}
            </p>
            <Link
              href="/dang-nhap"
              className="btn-gold mt-4 inline-block rounded-full px-8 py-3 text-sm"
            >
              Mua trọn bộ ngay
            </Link>
          </div>
        </div>
      </div>

      {/* Ebook */}
      {ebook && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold">Sách khởi động</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <div
              className={`rounded-2xl border border-border bg-gradient-to-br p-6 ${ebook.cover}`}
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-2">
                {ebook.tag}
              </span>
              <h3 className="mt-2 text-xl font-bold">{ebook.title}</h3>
              <p className="mt-3 text-sm text-white/70">{ebook.description}</p>
              <ul className="mt-4 space-y-1.5 text-sm text-white/80">
                {ebook.outcomes.map((o) => (
                  <li key={o} className="flex gap-2">
                    <span className="text-gold">✓</span>
                    {o}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-lg font-bold text-gold">
                  {formatVnd(ebook.price)}
                </span>
                <Link
                  href="/dang-nhap"
                  className="btn-gold rounded-full px-5 py-2 text-sm"
                >
                  Đặt sách
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Combos */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold">Lộ trình {combos.length} combo</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {combos.map((c, i) => (
            <div
              key={c.slug}
              className="flex flex-col rounded-2xl border border-border bg-panel p-6"
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-gold">
                {c.tag}
              </span>
              <h3 className="mt-2 text-lg font-bold">
                {i + 1}. {c.title}
              </h3>
              <p className="mt-3 flex-1 text-sm text-muted">
                {c.description}
              </p>
              <ul className="mt-4 space-y-1.5 text-sm">
                {c.outcomes.map((o) => (
                  <li key={o} className="flex gap-2">
                    <span className="text-gold">✓</span>
                    <span className="text-foreground/80">{o}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center justify-between border-t border-border pt-4">
                <div>
                  <p className="font-bold text-gold">{formatVnd(c.price)}</p>
                  <p className="text-xs text-muted">{c.lessons_count} bài học</p>
                </div>
                <Link
                  href="/dang-nhap"
                  className="rounded-full border border-gold px-4 py-2 text-sm font-semibold text-gold hover:bg-gold hover:text-black"
                >
                  Mua ngay
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Special */}
      {special && (
        <div className="mt-16 rounded-2xl border border-violet-500/40 bg-gradient-to-br from-violet-950/60 via-panel to-panel p-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-violet-300">
            {special.tag}
          </span>
          <h3 className="mt-2 text-2xl font-bold">{special.title}</h3>
          <p className="mt-3 max-w-2xl text-sm text-muted">
            {special.description}
          </p>
          <ul className="mt-4 space-y-1.5 text-sm">
            {special.outcomes.map((o) => (
              <li key={o} className="flex gap-2">
                <span className="text-violet-300">✓</span>
                <span className="text-foreground/80">{o}</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm font-semibold text-violet-300">
            Tặng kèm khi mua trọn bộ
          </p>
        </div>
      )}

      <p className="mt-10 text-center text-xs text-muted">
        Tổng {products.length} sản phẩm trong hệ sinh thái AI Sales Academy.
        Nút &quot;Mua ngay&quot; hiện dẫn tới trang đăng nhập — kết nối cổng
        thanh toán thật khi triển khai chính thức.
      </p>
    </div>
  );
}
