import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <span className="gold-gradient-text text-7xl font-extrabold">404</span>
      <h1 className="mt-4 text-2xl font-bold">Không tìm thấy trang</h1>
      <p className="mt-2 text-sm text-muted">
        Trang bạn tìm không tồn tại, hoặc đã được chuyển sang địa chỉ khác.
      </p>
      <Link
        href="/"
        className="btn-gold mt-8 inline-block rounded-full px-8 py-3 text-sm"
      >
        Về trang chủ
      </Link>
    </div>
  );
}
