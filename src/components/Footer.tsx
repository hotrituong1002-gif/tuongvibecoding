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
              <li>
                <a
                  className="hover:text-gold"
                  href="https://zalo.me/0945658114"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Zalo: 0945 658 114
                </a>
              </li>
              <li>
                <a
                  className="hover:text-gold"
                  href="mailto:hotrituong1002@gmail.com"
                >
                  Email: hotrituong1002@gmail.com
                </a>
              </li>
              <li>Thời gian: 8:00 - 22:00 (T2-CN)</li>
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-gold">
              Chính sách
            </p>
            <ul className="mt-3 space-y-2 text-sm text-muted">
              <li>
                <Link className="hover:text-gold" href="/dieu-khoan">
                  Điều khoản dịch vụ
                </Link>
              </li>
              <li>
                <Link className="hover:text-gold" href="/chinh-sach-hoan-tien">
                  Chính sách hoàn tiền
                </Link>
              </li>
              <li>
                <Link className="hover:text-gold" href="/chinh-sach-bao-mat">
                  Chính sách bảo mật
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-xs text-muted">
          © {new Date().getFullYear()} AI Sales Academy — vận hành bởi Hồ Trí
          Tượng. Mọi thắc mắc liên hệ Zalo/Email ở trên.
        </div>
      </div>
    </footer>
  );
}
