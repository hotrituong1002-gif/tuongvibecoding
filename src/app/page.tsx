import Link from "next/link";
import { getProducts } from "@/lib/queries/products";
import { formatVnd } from "@/lib/format";

const STATS = [
  { value: "3.200+", label: "học viên đã tham gia" },
  { value: "4.8/5", label: "đánh giá trung bình" },
  { value: "24 giờ", label: "để ra trang bán hàng đầu tiên" },
];

const PROBLEMS = [
  "Muốn bán hàng online nhưng không biết thiết kế, không biết code.",
  "Viết content mãi không ai đọc, không ai mua.",
  "Thuê ngoài làm trang bán hàng thì tốn tiền, chờ lâu, sửa mệt.",
];

const FEATURES = [
  {
    title: "Lộ trình theo từng bước",
    desc: "Không lý thuyết dàn trải — đi từ tư duy, viết content, dựng trang, đến tự động hoá và tối ưu doanh số.",
  },
  {
    title: "Dùng AI làm thay việc khó",
    desc: "Bạn không cần biết thiết kế hay lập trình. AI lo phần kỹ thuật, bạn tập trung vào sản phẩm & khách hàng.",
  },
  {
    title: "Học xong có trang thật",
    desc: "Kết thúc lộ trình, bạn có ít nhất một trang bán hàng hoàn chỉnh, sẵn sàng chạy quảng cáo.",
  },
];

const TESTIMONIALS = [
  {
    name: "Minh Anh",
    role: "Kinh doanh mỹ phẩm online",
    quote:
      "Trước giờ mình toàn thuê ngoài làm landing page, giờ tự làm trong một buổi tối bằng AI, tiết kiệm cả triệu bạc mỗi lần sửa.",
  },
  {
    name: "Đức Huy",
    role: "Freelancer dịch vụ AI",
    quote:
      "Combo Copywriting với Thiết Kế Trang Bán Hàng giúp mình có ngay sản phẩm demo để chào khách, chốt đơn nhanh hơn hẳn.",
  },
  {
    name: "Thu Trang",
    role: "Chủ shop thời trang",
    quote:
      "Phần automation giúp shop mình trả lời khách tự động 24/7, không còn bỏ sót đơn vào ban đêm nữa.",
  },
];

const FAQS = [
  {
    q: "Tôi không biết gì về AI hay thiết kế, có học được không?",
    a: "Được. Lộ trình thiết kế cho người mới bắt đầu từ số 0, có hướng dẫn từng bước và prompt mẫu dùng ngay.",
  },
  {
    q: "Học xong tôi có cần trả thêm phí công cụ AI không?",
    a: "Khoá học ưu tiên các công cụ có bản miễn phí hoặc chi phí thấp, phù hợp để bắt đầu mà không cần đầu tư lớn.",
  },
  {
    q: "Tôi có thể mua lẻ từng combo thay vì mua trọn bộ không?",
    a: "Có. Bạn có thể mua từng combo theo nhu cầu, hoặc chọn trọn bộ để tiết kiệm hơn — xem chi tiết ở trang Sản phẩm.",
  },
];

export default async function HomePage() {
  const products = await getProducts();
  const ebook = products.find((p) => p.kind === "ebook");
  const combos = products.filter((p) => p.kind === "combo");

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(242,183,5,0.12),_transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-block rounded-full border border-gold/40 bg-gold/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-gold">
              Hướng dẫn tạo trang bán hàng · Kiếm tiền với AI
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Tự tay dựng trang bán hàng{" "}
              <span className="gold-gradient-text">chuyên nghiệp</span> bằng AI
              — không cần biết code
            </h1>
            <p className="mt-6 text-lg text-muted">
              Lộ trình từng bước giúp bạn viết content, thiết kế trang bán hàng
              và tự động hoá chăm sóc khách hàng — tất cả bằng công cụ AI, dù
              bạn chưa từng làm marketing hay lập trình.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/san-pham"
                className="btn-gold w-full rounded-full px-8 py-3 text-center text-base sm:w-auto"
              >
                Xem lộ trình &amp; bảng giá
              </Link>
              <Link
                href="/hoc-vien"
                className="w-full rounded-full border border-border px-8 py-3 text-center text-base font-semibold text-foreground hover:border-gold hover:text-gold sm:w-auto"
              >
                Vào Học viện
              </Link>
            </div>
          </div>

          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="card-panel rounded-2xl px-6 py-5 text-center"
              >
                <p className="text-2xl font-extrabold text-gold">{s.value}</p>
                <p className="mt-1 text-sm text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problems */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Bạn có đang gặp những vấn đề này?
            </h2>
            <p className="mt-4 text-muted">
              Rất nhiều người muốn bán hàng online nhưng bị chặn lại ngay từ
              bước đầu tiên: dựng một trang bán hàng đủ chuyên nghiệp để khách
              tin tưởng và xuống tiền.
            </p>
            <ul className="mt-8 space-y-4">
              {PROBLEMS.map((p) => (
                <li key={p} className="flex gap-3">
                  <span className="mt-1 text-gold">✕</span>
                  <span className="text-foreground/90">{p}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card-panel rounded-3xl p-8">
            <p className="text-sm font-semibold uppercase tracking-wide text-gold">
              Giải pháp
            </p>
            <p className="mt-3 text-xl font-bold">
              Dùng AI làm phần việc khó — bạn chỉ cần làm theo lộ trình.
            </p>
            <p className="mt-4 text-muted">
              Ebook &quot;{ebook?.title ?? "Kiếm Tiền Với AI"}&quot; và {combos.length}{" "}
              combo trong lộ trình sẽ dẫn bạn đi từ tư duy đến một trang bán
              hàng thật, đang chạy được doanh số.
            </p>
            <Link
              href="/san-pham"
              className="mt-6 inline-block font-semibold text-gold hover:underline"
            >
              Xem lộ trình chi tiết →
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-y border-border bg-panel/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold sm:text-4xl">
            Vì sao chọn AI Sales Academy?
          </h2>
          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {FEATURES.map((f) => (
              <div key={f.title} className="card-panel rounded-2xl p-8">
                <h3 className="text-lg font-bold text-gold">{f.title}</h3>
                <p className="mt-3 text-sm text-muted">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum preview */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">
              Lộ trình 5 combo + 1 ebook
            </h2>
            <p className="mt-3 max-w-2xl text-muted">
              Mỗi combo tập trung giải quyết một bước trong hành trình dựng
              trang bán hàng bằng AI, học xong áp dụng được ngay.
            </p>
          </div>
          <Link
            href="/san-pham"
            className="whitespace-nowrap font-semibold text-gold hover:underline"
          >
            Xem đầy đủ &amp; bảng giá →
          </Link>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {combos.map((c, i) => (
            <div
              key={c.slug}
              className={`rounded-2xl bg-gradient-to-br p-6 ${c.cover} border border-border`}
            >
              <span className="text-xs font-semibold uppercase tracking-widest text-gold-2">
                {c.tag}
              </span>
              <h3 className="mt-2 text-xl font-bold">
                {i + 1}. {c.title}
              </h3>
              <p className="mt-3 text-sm text-white/70">{c.description}</p>
              <div className="mt-5 flex items-center justify-between text-sm">
                <span className="text-white/60">{c.lessons_count} bài học</span>
                <span className="font-bold text-gold">{formatVnd(c.price)}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-y border-border bg-panel/40 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold sm:text-4xl">
            Học viên nói gì?
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div key={t.name} className="card-panel rounded-2xl p-6">
                <p className="text-gold">★★★★★</p>
                <p className="mt-3 text-sm text-foreground/90">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p className="mt-4 text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          Câu hỏi thường gặp
        </h2>
        <div className="mt-10 space-y-4">
          {FAQS.map((f) => (
            <details
              key={f.q}
              className="card-panel group rounded-xl p-5 open:border-gold/40"
            >
              <summary className="cursor-pointer list-none font-semibold">
                <span className="mr-2 text-gold">Q.</span>
                {f.q}
              </summary>
              <p className="mt-3 text-sm text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="card-panel rounded-3xl px-8 py-14 text-center">
          <h2 className="text-3xl font-bold sm:text-4xl">
            Sẵn sàng có trang bán hàng đầu tiên bằng AI?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted">
            Bắt đầu với ebook {formatVnd(ebook?.price ?? 0)} hoặc chọn trọn bộ
            lộ trình để tiết kiệm hơn.
          </p>
          <Link
            href="/san-pham"
            className="btn-gold mt-8 inline-block rounded-full px-8 py-3 text-base"
          >
            Xem bảng giá ngay
          </Link>
        </div>
      </section>
    </div>
  );
}
