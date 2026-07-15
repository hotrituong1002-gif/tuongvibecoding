export const metadata = {
  title: "Điều khoản dịch vụ",
  description: "Điều khoản sử dụng dịch vụ AI Sales Academy.",
};

export default function DieuKhoanPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">Điều khoản dịch vụ</h1>
      <p className="mt-2 text-sm text-muted">
        Cập nhật lần cuối: {new Date().toLocaleDateString("vi-VN")}
      </p>

      <div className="prose prose-invert mt-8 max-w-none prose-headings:font-bold prose-a:text-gold">
        <p>
          AI Sales Academy (&quot;chúng tôi&quot;) là dịch vụ đào tạo trực
          tuyến do <strong>Hồ Trí Tượng</strong>{" "}
          vận hành, cung cấp các khoá học và tài liệu hướng dẫn ứng dụng AI
          vào bán hàng. Khi đăng ký tài khoản hoặc mua sản phẩm trên website
          này, bạn (&quot;học viên&quot;) đồng ý với các điều khoản dưới đây.
        </p>

        <h2>1. Sản phẩm &amp; dịch vụ</h2>
        <p>
          Chúng tôi cung cấp các khoá học số (ebook, video, bài học văn bản)
          truy cập trực tuyến qua tài khoản cá nhân của học viên. Sản phẩm
          được giao dưới dạng quyền truy cập nội dung trong Học viện, không
          phải hàng hoá vật lý.
        </p>

        <h2>2. Tài khoản</h2>
        <ul>
          <li>Học viên chịu trách nhiệm bảo mật thông tin đăng nhập của mình.</li>
          <li>
            Mỗi tài khoản dành cho một cá nhân sử dụng; không chia sẻ tài
            khoản hoặc nội dung đã mua cho người khác dưới mọi hình thức.
          </li>
          <li>
            Chúng tôi có quyền tạm khoá tài khoản nếu phát hiện hành vi gian
            lận, chia sẻ tài khoản, hoặc vi phạm điều khoản này.
          </li>
        </ul>

        <h2>3. Thanh toán</h2>
        <p>
          Thanh toán được thực hiện qua chuyển khoản ngân hàng (SePay). Sau
          khi hệ thống xác nhận đã nhận được thanh toán đúng số tiền và đúng
          nội dung chuyển khoản, sản phẩm sẽ được mở khóa tự động trong tài
          khoản của học viên. Trường hợp chuyển khoản sai nội dung khiến hệ
          thống không tự nhận diện được, học viên liên hệ hỗ trợ để được mở
          khóa thủ công.
        </p>

        <h2>4. Bản quyền nội dung</h2>
        <p>
          Toàn bộ nội dung khoá học (bài viết, video, tài liệu, hình ảnh)
          thuộc bản quyền của AI Sales Academy / Hồ Trí Tượng. Học viên được
          cấp quyền sử dụng cho mục đích học tập cá nhân, <strong>không được</strong>{" "}
          sao chép, phân phối lại, đăng tải công khai, hoặc bán lại dưới bất
          kỳ hình thức nào mà không có sự đồng ý bằng văn bản.
        </p>

        <h2>5. Giới hạn trách nhiệm</h2>
        <p>
          Nội dung khoá học mang tính chất hướng dẫn, chia sẻ kinh nghiệm và
          phương pháp. Kết quả kinh doanh thực tế phụ thuộc vào nhiều yếu tố
          (thị trường, sản phẩm, mức độ thực hành của học viên...) — chúng tôi
          không cam kết một kết quả doanh thu/lợi nhuận cụ thể nào.
        </p>

        <h2>6. Thay đổi điều khoản</h2>
        <p>
          Điều khoản này có thể được cập nhật theo thời gian. Phiên bản mới
          nhất luôn được đăng tại trang này; việc tiếp tục sử dụng dịch vụ sau
          khi điều khoản thay đổi đồng nghĩa với việc chấp nhận điều khoản
          mới.
        </p>

        <h2>7. Liên hệ</h2>
        <p>
          Mọi thắc mắc về điều khoản dịch vụ, vui lòng liên hệ:
          <br />
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
