import Link from "next/link";

export const metadata = {
  title: "Đối tác",
  description:
    "Tham gia chương trình đối tác AI Sales Academy: giới thiệu sản phẩm, nhận hoa hồng minh bạch tới 40% trên mỗi đơn hàng.",
};

const STEPS = [
  {
    title: "Đăng ký làm đối tác",
    desc: "Điền thông tin và nhận link giới thiệu riêng cùng mã đối tác của bạn.",
  },
  {
    title: "Chia sẻ sản phẩm",
    desc: "Giới thiệu Ebook và các combo AI Sales Academy tới cộng đồng của bạn qua link riêng.",
  },
  {
    title: "Nhận hoa hồng",
    desc: "Mỗi đơn hàng chốt thành công qua link của bạn, hoa hồng được ghi nhận và đối soát hàng tháng.",
  },
];

const TIERS = [
  { name: "Ebook", commission: "30%" },
  { name: "Từng combo lẻ", commission: "35%" },
  { name: "Trọn bộ lộ trình", commission: "40%" },
];

export default function DoiTacPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-block rounded-full border border-gold/40 bg-gold/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold">
          Chương trình đối tác
        </span>
        <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">
          Kiếm thêm thu nhập cùng AI Sales Academy
        </h1>
        <p className="mt-4 text-muted">
          Giới thiệu sản phẩm bạn tin tưởng, nhận hoa hồng minh bạch trên mỗi
          đơn hàng thành công.
        </p>
      </div>

      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {STEPS.map((s, i) => (
          <div key={s.title} className="card-panel rounded-2xl p-6">
            <span className="text-3xl font-extrabold text-gold/40">
              0{i + 1}
            </span>
            <h3 className="mt-3 font-bold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted">{s.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 rounded-2xl border border-border bg-panel p-8">
        <h2 className="text-xl font-bold">Mức hoa hồng</h2>
        <div className="mt-6 divide-y divide-border">
          {TIERS.map((t) => (
            <div
              key={t.name}
              className="flex items-center justify-between py-4"
            >
              <span className="text-foreground/90">{t.name}</span>
              <span className="text-lg font-bold text-gold">
                {t.commission}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-14 text-center">
        <h2 className="text-2xl font-bold">Sẵn sàng trở thành đối tác?</h2>
        <p className="mt-2 text-muted">
          Đăng nhập hoặc tạo tài khoản để lấy link giới thiệu riêng của bạn.
        </p>
        <Link
          href="/dang-nhap"
          className="btn-gold mt-6 inline-block rounded-full px-8 py-3 text-base"
        >
          Đăng ký làm đối tác
        </Link>
      </div>
    </div>
  );
}
