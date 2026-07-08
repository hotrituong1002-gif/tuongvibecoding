"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { Order } from "@/lib/types";
import { formatVnd } from "@/lib/format";
import { createClient } from "@/lib/supabase/client";

export default function CheckoutClient({
  order,
  productTitle,
  bankAccountNumber,
  bankName,
  bankAccountHolder,
}: {
  order: Order;
  productTitle: string;
  bankAccountNumber: string;
  bankName: string;
  bankAccountHolder: string;
}) {
  const [status, setStatus] = useState(order.status);
  const [copied, setCopied] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (status === "paid") return;

    const supabase = createClient();
    const id = setInterval(async () => {
      const { data } = await supabase
        .from("orders")
        .select("status")
        .eq("id", order.id)
        .maybeSingle();
      if (data?.status === "paid") {
        setStatus("paid");
        clearInterval(id);
      }
    }, 3000);

    return () => clearInterval(id);
  }, [order.id, status]);

  useEffect(() => {
    if (status !== "paid") return;
    const t = setTimeout(() => {
      router.push("/hoc-vien");
      router.refresh();
    }, 1800);
    return () => clearTimeout(t);
  }, [status, router]);

  function copy(value: string, label: string) {
    navigator.clipboard.writeText(value);
    setCopied(label);
    setTimeout(() => setCopied(null), 1500);
  }

  const hasBankInfo = Boolean(bankAccountNumber && bankName);
  const qrUrl = hasBankInfo
    ? `https://qr.sepay.vn/img?acc=${encodeURIComponent(bankAccountNumber)}&bank=${encodeURIComponent(bankName)}&amount=${order.amount}&des=${encodeURIComponent(order.payment_code)}`
    : null;

  if (status === "paid") {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
        <span className="text-5xl">✅</span>
        <h1 className="mt-4 text-2xl font-bold">Thanh toán thành công!</h1>
        <p className="mt-2 text-sm text-muted">
          Đang chuyển bạn tới Học viện...
        </p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <span className="urgency-badge">Chờ thanh toán</span>
        <h1 className="mt-4 text-2xl font-bold sm:text-3xl">
          Thanh toán: {productTitle}
        </h1>
        <p className="mt-2 text-sm text-muted">
          Chuyển khoản đúng số tiền và nội dung bên dưới — hệ thống tự động mở
          khóa trong ít phút sau khi nhận được tiền.
        </p>
      </div>

      <div className="card-panel countdown-box mt-8 rounded-3xl p-8">
        {hasBankInfo ? (
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start">
            {qrUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={qrUrl}
                alt="Mã QR chuyển khoản"
                width={220}
                height={220}
                className="rounded-xl border border-border bg-white p-2"
              />
            )}
            <div className="w-full flex-1 space-y-3 text-sm">
              <Row label="Ngân hàng" value={bankName} onCopy={copy} />
              <Row
                label="Số tài khoản"
                value={bankAccountNumber}
                onCopy={copy}
              />
              {bankAccountHolder && (
                <Row label="Chủ tài khoản" value={bankAccountHolder} />
              )}
              <Row
                label="Số tiền"
                value={formatVnd(order.amount)}
                highlight
              />
              <Row
                label="Nội dung chuyển khoản"
                value={order.payment_code}
                onCopy={copy}
                highlight
              />
              <p className="text-xs text-amber-400">
                ⚠️ Ghi đúng nội dung &quot;{order.payment_code}&quot; để hệ
                thống nhận diện đúng đơn hàng của bạn.
              </p>
            </div>
          </div>
        ) : (
          <p className="text-center text-sm text-muted">
            Chưa cấu hình thông tin ngân hàng nhận tiền. Vui lòng liên hệ quản
            trị viên.
          </p>
        )}

        <div className="mt-6 flex items-center justify-center gap-2 border-t border-border pt-6 text-sm text-muted">
          <span className="h-2 w-2 animate-pulse rounded-full bg-gold" />
          Đang chờ xác nhận thanh toán tự động...
        </div>

        {copied && (
          <p className="mt-2 text-center text-xs text-emerald-400">
            Đã sao chép {copied}
          </p>
        )}
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  onCopy,
  highlight,
}: {
  label: string;
  value: string;
  onCopy?: (value: string, label: string) => void;
  highlight?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg bg-panel-2 px-4 py-2.5">
      <div>
        <p className="text-xs text-muted">{label}</p>
        <p className={highlight ? "font-bold text-gold" : "font-semibold"}>
          {value}
        </p>
      </div>
      {onCopy && (
        <button
          onClick={() => onCopy(value, label)}
          className="shrink-0 rounded-full border border-border px-3 py-1 text-xs font-semibold hover:border-gold hover:text-gold"
        >
          Sao chép
        </button>
      )}
    </div>
  );
}
