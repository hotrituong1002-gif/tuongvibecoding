import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/types";

export const metadata = {
  title: "Quản trị — Người dùng",
};

export default async function AdminUsersPage() {
  const supabase = await createClient();
  const { data: profiles } = await supabase
    .from("profiles")
    .select("*")
    .order("created_at", { ascending: false });

  const { data: unlockCounts } = await supabase
    .from("unlocks")
    .select("user_id");

  const countByUser = new Map<string, number>();
  (unlockCounts ?? []).forEach((row) => {
    countByUser.set(row.user_id, (countByUser.get(row.user_id) ?? 0) + 1);
  });

  const list = (profiles ?? []) as Profile[];

  return (
    <div>
      <h1 className="text-2xl font-bold">Người dùng</h1>
      <p className="mt-1 text-sm text-muted">
        Xem tài khoản đã đăng ký, cấp quyền admin, hoặc mở/thu hồi sản phẩm
        thủ công cho từng người.
      </p>

      <div className="mt-8 overflow-x-auto rounded-2xl border border-border">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="bg-panel-2 text-xs uppercase tracking-wide text-muted">
            <tr>
              <th className="px-4 py-3">Người dùng</th>
              <th className="px-4 py-3">Vai trò</th>
              <th className="px-4 py-3">Sản phẩm đã mở</th>
              <th className="px-4 py-3">Ngày tham gia</th>
              <th className="px-4 py-3 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {list.map((p) => (
              <tr key={p.id}>
                <td className="px-4 py-3">
                  <p className="font-semibold">{p.full_name || "(chưa đặt tên)"}</p>
                  <p className="text-xs text-muted">{p.email}</p>
                </td>
                <td className="px-4 py-3">
                  {p.role === "admin" ? (
                    <span className="rounded-full bg-gold/10 px-2.5 py-1 text-xs font-semibold text-gold">
                      Admin
                    </span>
                  ) : (
                    <span className="rounded-full bg-panel-2 px-2.5 py-1 text-xs font-semibold text-muted">
                      Khách hàng
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-muted">
                  {countByUser.get(p.id) ?? 0}
                </td>
                <td className="px-4 py-3 text-muted">
                  {new Date(p.created_at).toLocaleDateString("vi-VN")}
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    href={`/admin/users/${p.id}`}
                    className="font-semibold text-gold hover:underline"
                  >
                    Quản lý
                  </Link>
                </td>
              </tr>
            ))}
            {list.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-muted">
                  Chưa có người dùng nào đăng ký.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
