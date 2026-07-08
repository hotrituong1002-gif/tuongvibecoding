import ProductForm from "../ProductForm";
import { createProduct } from "../actions";

export const metadata = {
  title: "Quản trị — Thêm sản phẩm",
};

export default function NewProductPage() {
  return (
    <div>
      <h1 className="text-2xl font-bold">Thêm sản phẩm mới</h1>
      <p className="mt-1 text-sm text-muted">
        Sản phẩm mới sẽ xuất hiện ngay trên Trang chủ, Sản phẩm và Học viện
        nếu bật &quot;Hiển thị công khai&quot;.
      </p>
      <ProductForm action={createProduct} submitLabel="Tạo sản phẩm" />
    </div>
  );
}
