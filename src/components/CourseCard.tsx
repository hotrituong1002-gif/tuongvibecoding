import type { Product } from "@/lib/types";
import { formatVnd } from "@/lib/format";

export default function CourseCard({
  product,
  unlocked,
}: {
  product: Product;
  unlocked: boolean;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-panel">
      <div
        className={`relative flex h-40 items-end bg-gradient-to-br p-4 ${product.cover}`}
      >
        <span
          className={`absolute right-3 top-3 flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
            unlocked
              ? "bg-emerald-500/90 text-black"
              : "bg-black/60 text-white"
          }`}
        >
          {unlocked ? "✓ Đã mở" : "🔒 " + product.badge}
        </span>
        <span className="rounded-full bg-black/60 px-3 py-1 text-xs font-bold text-gold">
          {product.price > 0 ? formatVnd(product.price) : "Tặng kèm"}
        </span>
      </div>

      <div className="p-5">
        <h3 className="text-base font-bold">{product.title}</h3>
        <p className="mt-1 text-xs text-muted">{product.tag}</p>

        <div className="mt-4 flex items-center justify-between text-sm">
          {product.lessons_count > 0 ? (
            <span className="flex items-center gap-1 text-muted">
              ▶ {product.lessons_count} bài học
            </span>
          ) : (
            <span className="text-muted">Cộng đồng riêng</span>
          )}

          {unlocked ? (
            <button className="rounded-full bg-gold px-4 py-1.5 text-xs font-bold text-black hover:brightness-105">
              Vào học
            </button>
          ) : (
            <span className="text-xs font-semibold text-muted">Đã khoá</span>
          )}
        </div>
      </div>
    </div>
  );
}
