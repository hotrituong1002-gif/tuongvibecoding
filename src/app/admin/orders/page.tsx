import { createClient } from "@/lib/supabase/server";
import { formatVnd } from "@/lib/format";
import { markOrderPaid, cancelOrder } from "./actions";

export const metadata = {
  title: "Quản trị — Đơn hàng",
};

const STATUS_LABEL: Record<string, { label: string; cls: string }> = {
  pending: { label: "Chờ thanh toán", cls: "bg-amber-500/10 text-amber-400" },
  paid: { label: "Đã thanh toán", cls: "bg-emerald-500/10 text-emerald-400" },
  expired: { label: "Hết hạn", cls: "bg-panel-2 text-muted" },
  cancelled: { label: "Đã huỷ", cls: "bg-red-500/10 text-red-400" },
};

export default async function AdminOrdersPage() {
  const supabase = await createClient();
  const { data: orders } = await supabase
    .from("orders")
    .select("*, profiles(email, full_name)")
    .order("created_at", { ascending: false });

  const list = orders ?? [];

  return (
    <div>
      <h1 className="text-2xl font-bold">Đơn hàng</h1>
      <p className="mt-1 text-sm text-muted">
        Đơn hàng thanh toán qua SePay. Đơn &quot;Chờ thanh toán&quot; tự động
        chuyển &quot;Đã thanh toán&quot; khi webhook nhận được chuyển khoản
        khớp mã.
      </p>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[820px] text-left text-sm">
          <thead className="bg-panel-2 text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3">Mã đơn</th>
              <th className="px-4 py-3">Khách hàng</th>
              <th className="px-4 py-3">Sản phẩm</th>
              <th className="px-4 py-3">Số tiền</th>
              <th className="px-4 py-3">Trạng thái</th>
              <th className="px-4 py-3">Tạo lúc</th>
              <th className="px-4 py-3 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {list.map((order) => {
              const status = STATUS_LABEL[order.status] ?? STATUS_LABEL.pending;
              const profile = order.profiles as {
                email: string | null;
                full_name: string | null;
              } | null;
              return (
                <tr key={order.id}>
                  <td className="px-4 py-3 font-mono font-semibold text-gold">
                    {order.payment_code}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold">
                      {profile?.full_name || "(chưa đặt tên)"}
                    </p>
                    <p className="text-xs text-muted">{profile?.email}</p>
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {order.scope === "bundle" ? "Trọn bộ" : order.scope}
                  </td>
                  <td className="px-4 py-3 text-gold">
                    {formatVnd(order.amount)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${status.cls}`}
                    >
                      {status.label}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-muted">
                    {new Date(order.created_at).toLocaleString("vi-VN")}
                  </td>
                  <td className="px-4 py-3">
                    {order.status === "pending" && (
                      <div className="flex justify-end gap-3">
                        <form action={markOrderPaid.bind(null, order.id)}>
                          <button className="font-semibold text-gold hover:underline">
                            Xác nhận đã trả
                          </button>
                        </form>
                        <form action={cancelOrder.bind(null, order.id)}>
                          <button className="font-semibold text-red-400 hover:underline">
                            Huỷ
                          </button>
                        </form>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
            {list.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-muted">
                  Chưa có đơn hàng nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
