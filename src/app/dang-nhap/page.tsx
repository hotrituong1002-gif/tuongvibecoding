import { Suspense } from "react";
import DangNhapClient from "./DangNhapClient";

export const metadata = {
  title: "Đăng nhập — AI Sales Academy",
};

export default function DangNhapPage() {
  return (
    <Suspense>
      <DangNhapClient />
    </Suspense>
  );
}
