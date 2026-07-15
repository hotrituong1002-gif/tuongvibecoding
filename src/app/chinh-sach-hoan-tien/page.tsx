export const metadata = {
  title: "Chính sách hoàn tiền",
  description: "Chính sách hoàn tiền của AI Sales Academy.",
};

export default function ChinhSachHoanTienPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <h1 className="text-3xl font-bold sm:text-4xl">Chính sách hoàn tiền</h1>
      <p className="mt-2 text-sm text-muted">
        Cập nhật lần cuối: {new Date().toLocaleDateString("vi-VN")}
      </p>

      <div className="prose prose-invert mt-8 max-w-none prose-headings:font-bold prose-a:text-gold">
        <p>
          Chúng tôi muốn học viên hoàn toàn yên tâm khi đăng ký. Chính sách
          dưới đây áp dụng cho mọi sản phẩm mua trên AI Sales Academy.
        </p>

        <h2>1. Điều kiện được hoàn tiền</h2>
        <p>
          Học viên được hoàn 100% tiền trong vòng <strong>7 ngày</strong>{" "}
          kể từ ngày thanh toán thành công, nếu:
        </p>
        <ul>
          <li>Chưa hoàn thành quá 30% số bài học của sản phẩm đã mua.</li>
          <li>
            Gửi yêu cầu hoàn tiền kèm lý do cụ thể (nội dung không như mô tả,
            không phù hợp, hoặc lỗi kỹ thuật không thể khắc phục).
          </li>
        </ul>

        <h2>2. Trường hợp không áp dụng hoàn tiền</h2>
        <ul>
          <li>Yêu cầu hoàn tiền sau 7 ngày kể từ ngày thanh toán.</li>
          <li>Đã hoàn thành trên 30% nội dung khoá học.</li>
          <li>
            Tài khoản bị khoá do vi phạm Điều khoản dịch vụ (chia sẻ tài
            khoản, sao chép nội dung...).
          </li>
          <li>Sản phẩm thuộc nhóm ưu đãi đặc biệt được ghi rõ &quot;không hoàn tiền&quot; tại thời điểm mua.</li>
        </ul>

        <h2>3. Quy trình yêu cầu hoàn tiền</h2>
        <ol>
          <li>
            Nhắn Zalo{" "}
            <a href="https://zalo.me/0945658114" target="_blank" rel="noopener noreferrer">
              0945 658 114
            </a>{" "}
            hoặc gửi email tới{" "}
            <a href="mailto:hotrituong1002@gmail.com">
              hotrituong1002@gmail.com
            </a>
            , kèm: email tài khoản đã đăng ký, mã đơn hàng/mã thanh toán, lý
            do yêu cầu hoàn tiền.
          </li>
          <li>Chúng tôi xác nhận và kiểm tra điều kiện trong vòng 2 ngày làm việc.</li>
          <li>
            Nếu đủ điều kiện, tiền được hoàn lại qua đúng tài khoản ngân hàng
            đã dùng để chuyển khoản, trong vòng 3-5 ngày làm việc.
          </li>
        </ol>

        <h2>4. Sau khi hoàn tiền</h2>
        <p>
          Quyền truy cập vào sản phẩm tương ứng sẽ bị thu hồi ngay khi hoàn
          tất hoàn tiền.
        </p>

        <h2>5. Liên hệ</h2>
        <p>
          Mọi thắc mắc về chính sách hoàn tiền, vui lòng liên hệ Zalo/Email ở
          trên — chúng tôi phản hồi trong khung giờ 8:00 - 22:00 (T2-CN).
        </p>
      </div>
    </div>
  );
}
