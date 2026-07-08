"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DangNhapClient() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
    window.setTimeout(() => {
      router.push("/hoc-vien");
    }, 600);
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <div className="card-panel rounded-2xl p-8">
        <div className="mb-6 flex rounded-full border border-border bg-panel-2 p-1 text-sm font-semibold">
          <button
            onClick={() => setTab("login")}
            className={`flex-1 rounded-full py-2 transition-colors ${
              tab === "login" ? "bg-gold text-black" : "text-muted"
            }`}
          >
            Đăng nhập
          </button>
          <button
            onClick={() => setTab("register")}
            className={`flex-1 rounded-full py-2 transition-colors ${
              tab === "register" ? "bg-gold text-black" : "text-muted"
            }`}
          >
            Đăng ký
          </button>
        </div>

        <h1 className="text-xl font-bold">
          {tab === "login" ? "Chào mừng trở lại" : "Tạo tài khoản mới"}
        </h1>
        <p className="mt-1 text-sm text-muted">
          {tab === "login"
            ? "Đăng nhập để vào Học viện và mở khóa các combo đã mua."
            : "Tạo tài khoản để bắt đầu hành trình kiếm tiền với AI."}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {tab === "register" && (
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-muted">
                Họ và tên
              </label>
              <input
                required
                type="text"
                placeholder="Nguyễn Văn A"
                className="mt-1.5 w-full rounded-lg border border-border bg-panel-2 px-4 py-2.5 text-sm outline-none focus:border-gold"
              />
            </div>
          )}
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-muted">
              Email
            </label>
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ban@email.com"
              className="mt-1.5 w-full rounded-lg border border-border bg-panel-2 px-4 py-2.5 text-sm outline-none focus:border-gold"
            />
          </div>
          <div>
            <label className="text-xs font-semibold uppercase tracking-wide text-muted">
              Mật khẩu
            </label>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              minLength={6}
              className="mt-1.5 w-full rounded-lg border border-border bg-panel-2 px-4 py-2.5 text-sm outline-none focus:border-gold"
            />
          </div>

          <button
            type="submit"
            disabled={submitted}
            className="btn-gold w-full rounded-full py-3 text-sm disabled:opacity-60"
          >
            {submitted
              ? "Đang xử lý..."
              : tab === "login"
                ? "Đăng nhập"
                : "Tạo tài khoản"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-muted">
          Đây là biểu mẫu minh hoạ (chưa kết nối hệ thống tài khoản thật).
          Nhấn nút để xem thử trang Học viện.
        </p>
      </div>
    </div>
  );
}
