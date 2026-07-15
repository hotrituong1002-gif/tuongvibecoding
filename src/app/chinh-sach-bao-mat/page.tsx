export const metadata = {
  title: "Chính sách bảo mật",
  description: "Chính sách bảo mật thông tin của AI Sales Academy.",
};

export default function ChinhSachBaoMatPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">Chính sách bảo mật</h1>
      <p className="mt-2 text-sm text-muted">
        Cập nhật lần cuối: {new Date().toLocaleDateString("vi-VN")}
      </p>

      <div className="prose prose-invert mt-8 max-w-none prose-headings:font-bold prose-a:text-gold">
        <p>
          Chúng tôi tôn trọng quyền riêng tư của học viên. Chính sách này giải
          thích chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân như
          thế nào.
        </p>

        <h2>1. Thông tin chúng tôi thu thập</h2>
        <ul>
          <li>
            <strong>Thông tin tài khoản</strong>: họ tên, email, mật khẩu (đã
            mã hoá) khi bạn đăng ký.
          </li>
          <li>
            <strong>Thông tin đơn hàng</strong>: sản phẩm đã mua, số tiền, mã
            giao dịch chuyển khoản.
          </li>
          <li>
            <strong>Không thu thập thông tin thẻ ngân hàng</strong> — thanh
            toán xử lý qua chuyển khoản trực tiếp/SePay, chúng tôi không lưu
            trữ số thẻ hay mật khẩu ngân hàng của bạn.
          </li>
        </ul>

        <h2>2. Mục đích sử dụng thông tin</h2>
        <ul>
          <li>Xác thực tài khoản và cấp quyền truy cập khoá học đã mua.</li>
          <li>Liên hệ hỗ trợ, thông báo về đơn hàng, cập nhật nội dung khoá học.</li>
          <li>Cải thiện chất lượng sản phẩm dựa trên dữ liệu sử dụng tổng hợp (không định danh cá nhân).</li>
        </ul>

        <h2>3. Chia sẻ thông tin với bên thứ ba</h2>
        <p>Chúng tôi chỉ chia sẻ thông tin cần thiết với các đối tác vận hành:</p>
        <ul>
          <li>
            <strong>Supabase</strong> — nền tảng lưu trữ dữ liệu tài khoản và
            nội dung khoá học.
          </li>
          <li>
            <strong>SePay</strong> — đối tác xử lý xác nhận thanh toán chuyển
            khoản ngân hàng.
          </li>
          <li>
            <strong>Vercel</strong> — nền tảng lưu trữ và vận hành website.
          </li>
        </ul>
        <p>
          Chúng tôi <strong>không bán</strong> thông tin cá nhân của học viên
          cho bất kỳ bên thứ ba nào cho mục đích quảng cáo.
        </p>

        <h2>4. Bảo mật dữ liệu</h2>
        <p>
          Mật khẩu được mã hoá, dữ liệu được bảo vệ bằng cơ chế phân quyền
          truy cập (Row Level Security) — mỗi tài khoản chỉ truy cập được dữ
          liệu của chính mình, trừ quản trị viên được uỷ quyền.
        </p>

        <h2>5. Quyền của bạn</h2>
        <ul>
          <li>Yêu cầu xem lại thông tin cá nhân đang được lưu trữ.</li>
          <li>Yêu cầu chỉnh sửa thông tin không chính xác.</li>
          <li>Yêu cầu xoá tài khoản và dữ liệu cá nhân (trừ dữ liệu cần lưu theo quy định kế toán/thuế).</li>
        </ul>
        <p>Gửi yêu cầu qua email hoặc Zalo bên dưới, chúng tôi xử lý trong vòng 7 ngày làm việc.</p>

        <h2>6. Cookie</h2>
        <p>
          Website sử dụng cookie cần thiết để duy trì phiên đăng nhập. Chúng
          tôi không dùng cookie theo dõi quảng cáo bên thứ ba trừ khi được
          thông báo cập nhật riêng.
        </p>

        <h2>7. Liên hệ</h2>
        <p>
          Zalo:{" "}
          <a href="https://zalo.me/0945658114" target="_blank" rel="noopener noreferrer">
            0945 658 114
          </a>
          <br />
          Email:{" "}
          <a href="mailto:hotrituong1002@gmail.com">
            hotrituong1002@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
