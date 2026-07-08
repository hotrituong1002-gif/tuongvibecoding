import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/types";
import { getProducts } from "@/lib/queries/products";
import {
  setUserRole,
  grantProductAccess,
  revokeProductAccess,
} from "../actions";

export const metadata = {
  title: "Quản trị — Chi tiết người dùng",
};

export default async function AdminUserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const [{ data: profile }, { data: unlocks }, products] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", id).maybeSingle<Profile>(),
    supabase.from("unlocks").select("product_slug").eq("user_id", id),
    getProducts(),
  ]);

  if (!profile) notFound();

  const unlockedSlugs = new Set((unlocks ?? []).map((u) => u.product_slug));

  return (
    <div>
      <h1 className="text-2xl font-bold">
        {profile.full_name || "(chưa đặt tên)"}
      </h1>
      <p className="mt-1 text-sm text-muted">{profile.email}</p>

      <div className="mt-8 rounded-2xl border border-border bg-panel p-6">
        <h2 className="font-bold">Vai trò</h2>
        <p className="mt-1 text-sm text-muted">
          Admin có toàn quyền vào trang quản trị này.
        </p>
        <div className="mt-4 flex gap-3">
          <form action={setUserRole.bind(null, profile.id, "admin")}>
            <button
              disabled={profile.role === "admin"}
              className="btn-gold rounded-full px-5 py-2 text-sm disabled:opacity-40"
            >
              Đặt làm Admin
            </button>
          </form>
          <form action={setUserRole.bind(null, profile.id, "customer")}>
            <button
              disabled={profile.role === "customer"}
              className="rounded-full border border-border px-5 py-2 text-sm font-semibold hover:border-gold disabled:opacity-40"
            >
              Đặt làm Khách hàng
            </button>
          </form>
        </div>
      </div>

      <div className="mt-8 rounded-2xl border border-border bg-panel p-6">
        <h2 className="font-bold">Quyền truy cập sản phẩm</h2>
        <p className="mt-1 text-sm text-muted">
          Mở hoặc thu hồi từng sản phẩm thủ công, không cần mã kích hoạt.
        </p>
        <div className="mt-4 divide-y divide-border">
          {products.map((p) => {
            const unlocked = unlockedSlugs.has(p.slug);
            return (
              <div
                key={p.slug}
                className="flex items-center justify-between py-3"
              >
                <div>
                  <p className="text-sm font-semibold">{p.title}</p>
                  <p className="text-xs text-muted">{p.slug}</p>
                </div>
                {unlocked ? (
                  <form action={revokeProductAccess.bind(null, profile.id, p.slug)}>
                    <button className="rounded-full border border-red-500/40 px-4 py-1.5 text-xs font-semibold text-red-400 hover:bg-red-500/10">
                      Thu hồi
                    </button>
                  </form>
                ) : (
                  <form action={grantProductAccess.bind(null, profile.id, p.slug)}>
                    <button className="btn-gold rounded-full px-4 py-1.5 text-xs">
                      Mở khóa
                    </button>
                  </form>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
