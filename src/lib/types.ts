export type ProductKind = "ebook" | "combo" | "special";
export type ProductBadge = "Khóa" | "Đặc biệt";

export type Product = {
  id: string;
  slug: string;
  title: string;
  tag: string;
  badge: ProductBadge;
  kind: ProductKind;
  price: number;
  lessons_count: number;
  cover: string;
  description: string;
  outcomes: string[];
  sort_order: number;
  is_active: boolean;
};

export type ActivationCode = {
  id: string;
  code: string;
  scope: string;
  max_uses: number;
  uses_count: number;
  is_active: boolean;
  expires_at: string | null;
  note: string | null;
  created_at: string;
};

export type Profile = {
  id: string;
  email: string | null;
  full_name: string | null;
  role: "customer" | "admin";
  created_at: string;
};

export type OrderStatus = "pending" | "paid" | "expired" | "cancelled";

export type Order = {
  id: string;
  user_id: string;
  scope: string;
  amount: number;
  payment_code: string;
  status: OrderStatus;
  sepay_transaction_id: string | null;
  paid_at: string | null;
  created_at: string;
};
