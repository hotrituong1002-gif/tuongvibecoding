import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

const LINKS = [
  { href: "/admin", label: "Tổng quan" },
  { href: "/admin/products", label: "Sản phẩm" },
  { href: "/admin/codes", label: "Mã kích hoạt" },
  { href: "/admin/users", label: "Người dùng" },
  { href: "/admin/settings", label: "Cài đặt" },
];

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/dang-nhap?next=/admin");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle();

  if (profile?.role !== "admin") {
    redirect("/hoc-vien");
  }

  return (
    <div className="mx-auto flex max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:px-8">
      <aside className="hidden w-56 shrink-0 lg:block">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">
          Quản trị
        </p>
        <nav className="space-y-1">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-panel-2 hover:text-gold"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/hoc-vien"
          className="mt-10 block text-xs text-muted hover:text-gold"
        >
          ← Về Học viện
        </Link>
      </aside>

      <div className="min-w-0 flex-1">{children}</div>
    </div>
  );
}
