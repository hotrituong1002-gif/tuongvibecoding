"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import type { CurrentUser } from "@/lib/queries/auth";
import { createClient } from "@/lib/supabase/client";

const NAV_LINKS = [
  { href: "/", label: "Trang chủ" },
  { href: "/san-pham", label: "Sản phẩm" },
  { href: "/hoc-vien", label: "Học viện" },
];

export default function Header({ user }: { user: CurrentUser | null }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    setOpen(false);
    router.push("/");
    router.refresh();
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex flex-col leading-tight">
          <span className="text-xl font-bold tracking-tight">
            AI SALES <span className="gold-gradient-text">ACADEMY</span>
          </span>
          <span className="text-[11px] uppercase tracking-widest text-muted">
            Kiếm tiền với AI
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-semibold uppercase tracking-wide transition-colors ${
                  active ? "text-gold" : "text-foreground/80 hover:text-gold"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          {user?.isAdmin && (
            <Link
              href="/admin"
              className={`text-sm font-semibold uppercase tracking-wide transition-colors ${
                pathname.startsWith("/admin")
                  ? "text-gold"
                  : "text-foreground/80 hover:text-gold"
              }`}
            >
              Quản trị
            </Link>
          )}
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          {user ? (
            <>
              <span className="max-w-[10rem] truncate text-sm text-muted" title={user.email ?? ""}>
                {user.email}
              </span>
              <button
                onClick={handleLogout}
                className="rounded-full border border-border px-5 py-2 text-sm font-bold text-foreground hover:border-gold hover:text-gold"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <Link
              href="/dang-nhap"
              className="btn-gold rounded-full px-5 py-2 text-sm font-bold"
            >
              Đăng nhập
            </Link>
          )}
        </div>

        <button
          aria-label="Mở menu"
          className="text-2xl text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>
      </div>

      {open && (
        <div className="border-t border-border px-4 py-4 md:hidden">
          <nav className="flex flex-col gap-4">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm font-semibold uppercase tracking-wide text-foreground/80 hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
            {user?.isAdmin && (
              <Link
                href="/admin"
                onClick={() => setOpen(false)}
                className="text-sm font-semibold uppercase tracking-wide text-foreground/80 hover:text-gold"
              >
                Quản trị
              </Link>
            )}
            {user ? (
              <>
                <span className="text-sm text-muted">{user.email}</span>
                <button
                  onClick={handleLogout}
                  className="w-fit rounded-full border border-border px-5 py-2 text-sm font-bold hover:border-gold hover:text-gold"
                >
                  Đăng xuất
                </button>
              </>
            ) : (
              <Link
                href="/dang-nhap"
                onClick={() => setOpen(false)}
                className="btn-gold w-fit rounded-full px-5 py-2 text-sm font-bold"
              >
                Đăng nhập
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
