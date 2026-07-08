import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-panel">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <p className="text-lg font-bold">
              AI SALES <span className="gold-gradient-text">ACADEMY</span>
            </p>
            <p className="mt-3 text-sm text-muted">
              Hướng dẫn tạo trang bán hàng &amp; kiếm tiền với AI — dễ hiểu, dễ
              làm theo, có kết quả thật.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-gold">
              Điều hướng
            </p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li><Link className="hover:text-gold" href="/">Trang chủ</Link></li>
              <li><Link className="hover:text-gold" href="/san-pham">Sản phẩm</Link></li>
              <li><Link className="hover:text-gold" href="/hoc-vien">Học viện</Link></li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-gold">
              Hỗ trợ
            </p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Zalo: 090x xxx xxx</li>
              <li>Email: hotro@aisalesacademy.vn</li>
              <li>Thời gian: 8:00 - 22:00 (T2-CN)</li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-gold">
              Cam kết
            </p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>Học thử trước khi quyết định</li>
              <li>Hoàn tiền trong 7 ngày nếu không phù hợp</li>
              <li>Cập nhật công cụ AI mới miễn phí</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-xs text-muted">
          © {new Date().getFullYear()} AI Sales Academy. Nội dung minh hoạ —
          vui lòng cập nhật thông tin pháp lý &amp; liên hệ thật trước khi vận hành.
        </div>
      </div>
    </footer>
  );
}
