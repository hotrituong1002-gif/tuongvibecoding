import { createClient } from "@/lib/supabase/server";
import { getProducts } from "@/lib/queries/products";
import type { ActivationCode } from "@/lib/types";
import {
  createActivationCode,
  toggleActivationCode,
  deleteActivationCode,
} from "./actions";

export const metadata = {
  title: "Quản trị — Mã kích hoạt",
};

function statusOf(code: ActivationCode) {
  if (!code.is_active) return { label: "Đã vô hiệu hoá", cls: "bg-panel-2 text-muted" };
  if (code.expires_at && new Date(code.expires_at) < new Date())
    return { label: "Hết hạn", cls: "bg-red-500/10 text-red-400" };
  if (code.uses_count >= code.max_uses)
    return { label: "Hết lượt", cls: "bg-amber-500/10 text-amber-400" };
  return { label: "Đang hoạt động", cls: "bg-emerald-500/10 text-emerald-400" };
}

export default async function AdminCodesPage() {
  const supabase = await createClient();
  const [{ data: codes }, products] = await Promise.all([
    supabase
      .from("activation_codes")
      .select("*")
      .order("created_at", { ascending: false }),
    getProducts(),
  ]);

  const list = (codes ?? []) as ActivationCode[];

  return (
    <div>
      <h1 className="text-2xl font-bold">Mã kích hoạt</h1>
      <p className="mt-1 text-sm text-muted">
        Tạo mã để học viên tự mở khóa sản phẩm trong Học viện. Mỗi mã dùng
        được tối đa số lượt bạn đặt, sau đó tự động hết hiệu lực.
      </p>

      <form
        action={createActivationCode}
        className="mt-6 grid gap-4 rounded-2xl border border-border bg-panel p-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-muted">
            Mã (để trống để tự sinh)
          </label>
          <input
            name="code"
            placeholder="VD: AISALES2026"
            className="mt-1.5 w-full rounded-lg border border-border bg-panel-2 px-4 py-2.5 text-sm outline-none focus:border-gold"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-muted">
            Phạm vi mở khóa
          </label>
          <select
            name="scope"
            className="mt-1.5 w-full rounded-lg border border-border bg-panel-2 px-4 py-2.5 text-sm outline-none focus:border-gold"
          >
            <option value="bundle">Trọn bộ (tất cả sản phẩm)</option>
            {products.map((p) => (
              <option key={p.slug} value={p.slug}>
                Chỉ: {p.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-muted">
            Số lượt dùng tối đa
          </label>
          <input
            type="number"
            name="max_uses"
            min={1}
            defaultValue={1}
            className="mt-1.5 w-full rounded-lg border border-border bg-panel-2 px-4 py-2.5 text-sm outline-none focus:border-gold"
          />
        </div>
        <div>
          <label className="text-xs font-semibold uppercase tracking-wide text-muted">
            Hết hạn (tuỳ chọn)
          </label>
          <input
            type="date"
            name="expires_at"
            className="mt-1.5 w-full rounded-lg border border-border bg-panel-2 px-4 py-2.5 text-sm outline-none focus:border-gold"
          />
        </div>
        <div className="sm:col-span-2 lg:col-span-3">
          <label className="text-xs font-semibold uppercase tracking-wide text-muted">
            Ghi chú (chỉ admin thấy)
          </label>
          <input
            name="note"
            placeholder="VD: Tặng cho khách mua sách đợt 1"
            className="mt-1.5 w-full rounded-lg border border-border bg-panel-2 px-4 py-2.5 text-sm outline-none focus:border-gold"
          />
        </div>
        <div className="flex items-end">
          <button className="btn-gold w-full rounded-full px-6 py-2.5 text-sm">
            Tạo mã
          </button>
        </div>
      </form>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-panel-2 text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3">Mã</th>
              <th className="px-4 py-3">Phạm vi</th>
              <th className="px-4 py-3">Lượt dùng</th>
              <th className="px-4 py-3">Hết hạn</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3">Ghi chú</th>
              <th className="px-4 py-3 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {list.map((code) => {
              const status = statusOf(code);
              return (
                <tr key={code.id}>
                  <td className="px-4 py-3 font-mono font-semibold text-gold">
                    {code.code}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {code.scope === "bundle" ? "Trọn bộ" : code.scope}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {code.uses_count} / {code.max_uses}
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {code.expires_at
                      ? new Date(code.expires_at).toLocaleDateString("vi-VN")
                      : "Không giới hạn"}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${status.cls}`}
                    >
                      {status.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted">{code.note ?? "—"}</td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-3">
                      <form
                        action={toggleActivationCode.bind(
                          null,
                          code.id,
                          !code.is_active,
                        )}
                      >
                        <button className="font-semibold text-gold hover:underline">
                          {code.is_active ? "Vô hiệu hoá" : "Kích hoạt lại"}
                        </button>
                      </form>
                      <form action={deleteActivationCode.bind(null, code.id)}>
                        <button className="font-semibold text-red-400 hover:underline">
                          Xoá
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              );
            })}
            {list.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-muted">
                  Chưa có mã kích hoạt nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
