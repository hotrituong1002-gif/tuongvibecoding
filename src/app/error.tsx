"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <span className="text-5xl">⚠️</span>
      <h1 className="mt-4 text-2xl font-bold">Đã có lỗi xảy ra</h1>
      <p className="mt-2 text-sm text-muted">
        Rất tiếc, trang gặp sự cố khi tải. Vui lòng thử lại.
      </p>
      <button
        onClick={reset}
        className="btn-gold mt-8 inline-block rounded-full px-8 py-3 text-sm"
      >
        Thử lại
      </button>
    </div>
  );
}
