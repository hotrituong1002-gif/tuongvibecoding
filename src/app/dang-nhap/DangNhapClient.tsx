"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

function mapAuthError(message: string) {
  if (message.includes("Invalid login credentials")) {
    return "Email hoặc mật khẩu không đúng.";
  }
  if (message.includes("User already registered")) {
    return "Email này đã có tài khoản. Hãy chuyển sang tab Đăng nhập.";
  }
  if (message.includes("Password should be at least")) {
    return "Mật khẩu cần tối thiểu 6 ký tự.";
  }
  return message;
}

export default function DangNhapClient() {
  const [tab, setTab] = useState<"login" | "register" | "forgot">("login");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/hoc-vien";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setNotice("");
    setSubmitting(true);
    const supabase = createClient();

    if (tab === "forgot") {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/dat-lai-mat-khau`,
      });
      setSubmitting(false);
      if (error) {
        setError(mapAuthError(error.message));
        return;
      }
      setNotice(
        "Đã gửi email đặt lại mật khẩu. Vui lòng kiểm tra hộp thư của bạn.",
      );
      return;
    }

    if (tab === "login") {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      setSubmitting(false);
      if (error) {
        setError(mapAuthError(error.message));
        return;
      }
      router.push(next);
      router.refresh();
    } else {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: { full_name: fullName } },
      });
      setSubmitting(false);
      if (error) {
        setError(mapAuthError(error.message));
        return;
      }
      if (data.session) {
        router.push(next);
        router.refresh();
      } else {
        setNotice(
          "Đã tạo tài khoản. Vui lòng kiểm tra email để xác nhận trước khi đăng nhập.",
        );
        setTab("login");
      }
    }
  }

  return (
    <div className="mx-auto flex min-h-[70vh] max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <div className="card-panel rounded-2xl p-8">
        <div className="mb-6 flex rounded-full border border-border bg-panel-2 p-1 text-sm font-semibold">
          <button
            onClick={() => {
              setTab("login");
              setError("");
              setNotice("");
            }}
            className={`flex-1 rounded-full py-2 transition-colors ${
              tab === "login" ? "bg-gold text-black" : "text-muted"
            }`}
          >
            Đăng nhập
          </button>
          <button
            onClick={() => {
              setTab("register");
              setError("");
              setNotice("");
            }}
            className={`flex-1 rounded-full py-2 transition-colors ${
              tab === "register" ? "bg-gold text-black" : "text-muted"
            }`}
          >
            Đăng ký
          </button>
        </div>

        <h1 className="text-xl font-bold">
          {tab === "login" && "Chào mừng trở lại"}
          {tab === "register" && "Tạo tài khoản mới"}
          {tab === "forgot" && "Lấy lại mật khẩu"}
        </h1>
        <p className="mt-1 text-sm text-muted">
          {tab === "login" &&
            "Đăng nhập để vào Học viện và mở khóa các combo đã mua."}
          {tab === "register" &&
            "Tạo tài khoản để bắt đầu hành trình kiếm tiền với AI."}
          {tab === "forgot" &&
            "Nhập email đã đăng ký, chúng tôi sẽ gửi liên kết đặt lại mật khẩu."}
        </p>

        {notice && (
          <p className="mt-4 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-4 py-2.5 text-sm text-emerald-300">
            {notice}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          {tab === "register" && (
            <div>
              <label className="text-xs font-semibold uppercase tracking-wide text-muted">
                Họ và tên
              </label>
              <input
                required
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
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
          {tab !== "forgot" && (
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
          )}

          {tab === "login" && (
            <button
              type="button"
              onClick={() => {
                setTab("forgot");
                setError("");
                setNotice("");
              }}
              className="text-xs font-semibold text-muted hover:text-gold"
            >
              Quên mật khẩu?
            </button>
          )}

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="btn-gold w-full rounded-full py-3 text-sm disabled:opacity-60"
          >
            {submitting && "Đang xử lý..."}
            {!submitting && tab === "login" && "Đăng nhập"}
            {!submitting && tab === "register" && "Tạo tài khoản"}
            {!submitting && tab === "forgot" && "Gửi liên kết đặt lại"}
          </button>

          {tab === "forgot" && (
            <button
              type="button"
              onClick={() => {
                setTab("login");
                setError("");
                setNotice("");
              }}
              className="w-full text-center text-xs font-semibold text-muted hover:text-gold"
            >
              ← Quay lại đăng nhập
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
