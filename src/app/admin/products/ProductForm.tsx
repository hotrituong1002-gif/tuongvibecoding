import type { Product } from "@/lib/types";

export default function ProductForm({
  product,
  action,
  submitLabel,
}: {
  product?: Product;
  action: (formData: FormData) => void;
  submitLabel: string;
}) {
  return (
    <form action={action} className="mt-6 space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-muted">
            Tên sản phẩm
          </label>
          <input
            required
            name="title"
            defaultValue={product?.title}
            className="mt-1.5 w-full rounded-lg border border-border bg-panel-2 px-4 py-2.5 text-sm outline-none focus:border-gold"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-muted">
            Slug (định danh, không dấu, không trùng)
          </label>
          <input
            required
            name="slug"
            defaultValue={product?.slug}
            placeholder="vd: combo-copywriting"
            className="mt-1.5 w-full rounded-lg border border-border bg-panel-2 px-4 py-2.5 text-sm outline-none focus:border-gold"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-muted">
          Nhãn phụ (hiện phía trên tên sản phẩm)
        </label>
        <input
          name="tag"
          defaultValue={product?.tag}
          placeholder="vd: Combo 2 · Nội dung"
          className="mt-1.5 w-full rounded-lg border border-border bg-panel-2 px-4 py-2.5 text-sm outline-none focus:border-gold"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-muted">
            Loại
          </label>
          <select
            name="kind"
            defaultValue={product?.kind ?? "combo"}
            className="mt-1.5 w-full rounded-lg border border-border bg-panel-2 px-4 py-2.5 text-sm outline-none focus:border-gold"
          >
            <option value="ebook">Ebook</option>
            <option value="combo">Combo</option>
            <option value="special">Đặc biệt</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-muted">
            Nhãn khoá
          </label>
          <select
            name="badge"
            defaultValue={product?.badge ?? "Khóa"}
            className="mt-1.5 w-full rounded-lg border border-border bg-panel-2 px-4 py-2.5 text-sm outline-none focus:border-gold"
          >
            <option value="Khóa">Khóa</option>
            <option value="Đặc biệt">Đặc biệt</option>
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-muted">
            Thứ tự hiển thị
          </label>
          <input
            type="number"
            name="sort_order"
            defaultValue={product?.sort_order ?? 0}
            className="mt-1.5 w-full rounded-lg border border-border bg-panel-2 px-4 py-2.5 text-sm outline-none focus:border-gold"
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-muted">
            Giá (đ)
          </label>
          <input
            type="number"
            min={0}
            name="price"
            defaultValue={product?.price ?? 0}
            className="mt-1.5 w-full rounded-lg border border-border bg-panel-2 px-4 py-2.5 text-sm outline-none focus:border-gold"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-muted">
            Số bài học
          </label>
          <input
            type="number"
            min={0}
            name="lessons_count"
            defaultValue={product?.lessons_count ?? 0}
            className="mt-1.5 w-full rounded-lg border border-border bg-panel-2 px-4 py-2.5 text-sm outline-none focus:border-gold"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-muted">
          Mô tả
        </label>
        <textarea
          name="description"
          rows={3}
          defaultValue={product?.description}
          className="mt-1.5 w-full rounded-lg border border-border bg-panel-2 px-4 py-2.5 text-sm outline-none focus:border-gold"
        />
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-muted">
          Lợi ích (mỗi dòng một ý)
        </label>
        <textarea
          name="outcomes"
          rows={4}
          defaultValue={product?.outcomes.join("\n")}
          className="mt-1.5 w-full rounded-lg border border-border bg-panel-2 px-4 py-2.5 text-sm outline-none focus:border-gold"
        />
      </div>

      <div>
        <label className="text-xs font-semibold uppercase tracking-wide text-muted">
          Gradient nền thẻ (class Tailwind, vd: from-sky-900 via-zinc-900 to-black)
        </label>
        <input
          name="cover"
          defaultValue={product?.cover}
          className="mt-1.5 w-full rounded-lg border border-border bg-panel-2 px-4 py-2.5 text-sm outline-none focus:border-gold"
        />
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          name="is_active"
          defaultChecked={product?.is_active ?? true}
          className="h-4 w-4 rounded border-border"
        />
        Hiển thị công khai (đang bán)
      </label>

      <button
        type="submit"
        className="btn-gold rounded-full px-6 py-2.5 text-sm"
      >
        {submitLabel}
      </button>
    </form>
  );
}
