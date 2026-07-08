"use client";

import { useState } from "react";
import Link from "next/link";
import { COMBOS, EBOOK, SPECIAL } from "@/lib/products";
import { useUnlock } from "@/lib/unlock";
import CourseCard from "@/components/CourseCard";

const SIDEBAR_LINKS = [
  { label: "Khóa học", icon: "▭", active: true },
  { label: "Cộng đồng", icon: "👥" },
  { label: "Tư vấn", icon: "📞" },
  { label: "Hỗ trợ", icon: "⏱" },
  { label: "Đối tác", icon: "🤝", href: "/doi-tac" },
];

export default function HocVienClient() {
  const { unlocked, loaded, redeem } = useUnlock();
  const [modalOpen, setModalOpen] = useState(false);
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  const allCourses = [EBOOK, ...COMBOS, SPECIAL];
  const completedGates = unlocked ? allCourses.length : 0;
  const progressPct = Math.round((completedGates / allCourses.length) * 100);

  function handleRedeem() {
    if (!code.trim()) {
      setError("Vui lòng nhập mã kích hoạt.");
      return;
    }
    const ok = redeem(code);
    if (ok) {
      setModalOpen(false);
      setCode("");
      setError("");
    } else {
      setError("Mã kích hoạt không hợp lệ. Vui lòng kiểm tra lại.");
    }
  }

  return (
    <div className="mx-auto flex max-w-7xl gap-8 px-4 py-10 sm:px-6 lg:px-8">
      {/* Sidebar */}
      <aside className="hidden w-56 shrink-0 lg:block">
        <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted">
          Main menu
        </p>
        <nav className="space-y-1">
          {SIDEBAR_LINKS.map((link) => {
            const content = (
              <span
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium ${
                  link.active
                    ? "bg-gold/10 text-gold"
                    : "text-foreground/80 hover:bg-panel-2"
                }`}
              >
                <span>{link.icon}</span>
                {link.label}
              </span>
            );
            return link.href ? (
              <Link key={link.label} href={link.href}>
                {content}
              </Link>
            ) : (
              <div key={link.label}>{content}</div>
            );
          })}
        </nav>

        <p className="mb-3 mt-10 text-xs font-semibold uppercase tracking-widest text-muted">
          Tài khoản
        </p>
        <nav className="space-y-1">
          <button
            onClick={() => setModalOpen(true)}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-foreground/80 hover:bg-panel-2"
          >
            <span>🔑</span> Nhập mã kích hoạt
          </button>
          <Link
            href="/dang-nhap"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-foreground/80 hover:bg-panel-2"
          >
            <span>↩</span> Đăng xuất
          </Link>
        </nav>
      </aside>

      {/* Main */}
      <div className="min-w-0 flex-1">
        <h1 className="text-3xl font-extrabold">Khóa học của tôi</h1>
        <p className="mt-1 text-sm text-muted">
          5 combo theo 5 chương + cuốn đặc biệt AI SALES SYSTEM — học theo lộ
          trình.
        </p>

        {loaded && !unlocked && (
          <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-gold/30 bg-gold/5 p-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm">
              <span className="mr-2">🔒</span>
              Bạn chưa mở khóa.{" "}
              <span className="font-semibold text-gold">
                Đã có Ebook Kiếm Tiền Với AI?
              </span>{" "}
              Nhập mã để mở trọn 5 combo — hoặc đặt sách để nhận mã.
            </p>
            <div className="flex shrink-0 gap-3">
              <button
                onClick={() => setModalOpen(true)}
                className="btn-gold rounded-full px-5 py-2 text-sm"
              >
                🔑 Nhập mã kích hoạt
              </button>
              <Link
                href="/san-pham"
                className="rounded-full border border-border px-5 py-2 text-sm font-semibold hover:border-gold hover:text-gold"
              >
                📕 Đặt sách
              </Link>
            </div>
          </div>
        )}

        <div className="mt-6 flex items-center gap-4 rounded-2xl border border-border bg-panel px-5 py-4">
          <span className="whitespace-nowrap text-sm text-muted">
            Tiến độ bản đồ: <span className="font-bold text-gold">{progressPct}%</span>
          </span>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-panel-2">
            <div
              className="h-full rounded-full bg-gradient-to-r from-gold-2 to-gold transition-all"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <span className="whitespace-nowrap text-sm text-muted">
            {completedGates} / {allCourses.length} cửa hoàn thành
          </span>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {allCourses.map((c) => (
            <CourseCard key={c.slug} product={c} unlocked={unlocked} />
          ))}
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="w-full max-w-sm rounded-2xl border border-border bg-panel p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold">Nhập mã kích hoạt</h2>
            <p className="mt-1 text-sm text-muted">
              Mã đi kèm sách &quot;Ebook Kiếm Tiền Với AI&quot; hoặc email xác
              nhận đơn hàng của bạn.
            </p>
            <input
              value={code}
              onChange={(e) => {
                setCode(e.target.value);
                setError("");
              }}
              placeholder="VD: AISALES2026"
              className="mt-4 w-full rounded-lg border border-border bg-panel-2 px-4 py-2.5 text-sm outline-none focus:border-gold"
            />
            {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="flex-1 rounded-full border border-border py-2.5 text-sm font-semibold hover:border-gold"
              >
                Huỷ
              </button>
              <button
                onClick={handleRedeem}
                className="btn-gold flex-1 rounded-full py-2.5 text-sm"
              >
                Mở khóa
              </button>
            </div>
            <p className="mt-4 text-center text-xs text-muted">
              Demo: dùng mã <span className="font-mono text-gold">AISALES2026</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
