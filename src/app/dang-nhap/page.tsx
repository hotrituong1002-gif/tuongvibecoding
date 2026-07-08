import { Suspense } from "react";
import DangNhapClient from "./DangNhapClient";

export const metadata = {
  title: "Đăng nhập",
  description: "Đăng nhập hoặc tạo tài khoản AI Sales Academy để vào Học viện.",
};

export default function DangNhapPage() {
  return (
    <Suspense>
      <DangNhapClient />
    </Suspense>
  );
}
