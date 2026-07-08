import { createClient } from "@/lib/supabase/server";
import { formatVnd } from "@/lib/format";

export const metadata = {
  title: "Quản trị — Tổng quan",
};

export default async function AdminOverviewPage() {
  const supabase = await createClient();

  const [
    { count: userCount },
    { count: productCount },
    { count: codeCount },
    { count: unlockCount },
    { count: pendingOrderCount },
    { data: paidOrders },
  ] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase
      .from("activation_codes")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true),
    supabase.from("unlocks").select("*", { count: "exact", head: true }),
    supabase
      .from("orders")
      .select("*", { count: "exact", head: true })
      .eq("status", "pending"),
    supabase.from("orders").select("amount").eq("status", "paid"),
  ]);

  const totalRevenue = (paidOrders ?? []).reduce(
    (sum, o) => sum + o.amount,
    0,
  );

  const stats = [
    { label: "Doanh thu đã thu (SePay)", value: formatVnd(totalRevenue) },
    { label: "Đơn chờ thanh toán", value: pendingOrderCount ?? 0 },
    { label: "Người dùng", value: userCount ?? 0 },
    { label: "Sản phẩm", value: productCount ?? 0 },
    { label: "Mã kích hoạt đang hoạt động", value: codeCount ?? 0 },
    { label: "Lượt mở khóa", value: unlockCount ?? 0 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold">Tổng quan</h1>
      <p className="mt-1 text-sm text-muted">
        Toàn cảnh hệ thống AI Sales Academy.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((s) => (
          <div
            key={s.label}
            className="card-panel rounded-2xl px-6 py-5 text-center"
          >
            <p className="text-3xl font-extrabold text-gold">{s.value}</p>
            <p className="mt-1 text-sm text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
