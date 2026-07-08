import { getSetting } from "@/lib/queries/settings";
import { updateBundlePrice } from "./actions";

export const metadata = {
  title: "Quản trị — Cài đặt",
};

export default async function AdminSettingsPage() {
  const bundlePrice = await getSetting<number>("bundle_price", 990000);

  return (
    <div>
      <h1 className="text-2xl font-bold">Cài đặt</h1>
      <p className="mt-1 text-sm text-muted">
        Các thông số chung của website.
      </p>

      <form
        action={updateBundlePrice}
        className="mt-8 max-w-sm rounded-2xl border border-border bg-panel p-6"
      >
        <label className="text-xs font-semibold uppercase tracking-wide text-muted">
          Giá gói trọn bộ (đ)
        </label>
        <input
          type="number"
          min={0}
          name="bundle_price"
          defaultValue={bundlePrice}
          className="mt-1.5 w-full rounded-lg border border-border bg-panel-2 px-4 py-2.5 text-sm outline-none focus:border-gold"
        />
        <p className="mt-2 text-xs text-muted">
          Hiển thị ở trang Sản phẩm, phần &quot;Trọn bộ lộ trình&quot;.
        </p>
        <button className="btn-gold mt-4 rounded-full px-6 py-2.5 text-sm">
          Lưu thay đổi
        </button>
      </form>
    </div>
  );
}
