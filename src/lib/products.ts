export type Product = {
  slug: string;
  title: string;
  tag: string;
  badge: "Khóa" | "Đặc biệt";
  price: number;
  priceLabel: string;
  lessonsCount: number;
  cover: string; // tailwind gradient classes
  description: string;
  outcomes: string[];
};

export const EBOOK: Product = {
  slug: "ebook-kiem-tien-voi-ai",
  title: "Ebook: Kiếm Tiền Với AI",
  tag: "Sách nền tảng",
  badge: "Khóa",
  price: 199000,
  priceLabel: "199.000đ",
  lessonsCount: 12,
  cover: "from-zinc-800 via-zinc-900 to-black",
  description:
    "Cuốn sách nền tảng giúp bạn hiểu đúng tư duy kiếm tiền với AI trước khi bắt tay xây trang bán hàng đầu tiên.",
  outcomes: [
    "Tư duy đúng về AI trong kinh doanh online",
    "Lộ trình 5 bước xây trang bán hàng bằng AI",
    "20+ prompt mẫu dùng ngay",
  ],
};

export const COMBOS: Product[] = [
  {
    slug: "tu-duy-ban-hang-x-ai",
    title: "Tư Duy Bán Hàng x AI",
    tag: "Combo 1 · Nền tảng",
    badge: "Khóa",
    price: 115000,
    priceLabel: "115.000đ",
    lessonsCount: 5,
    cover: "from-amber-900 via-zinc-900 to-black",
    description:
      "Xây nền tư duy: vì sao AI thay đổi cách bán hàng online, và cách bạn tận dụng nó để đi trước thị trường.",
    outcomes: [
      "Hiểu bản chất phễu bán hàng hiện đại",
      "Xác định sản phẩm/dịch vụ phù hợp để bán bằng AI",
      "Đặt mục tiêu doanh số theo lộ trình 90 ngày",
    ],
  },
  {
    slug: "ai-copywriting-ban-hang",
    title: "AI Copywriting Bán Hàng",
    tag: "Combo 2 · Nội dung",
    badge: "Khóa",
    price: 189000,
    priceLabel: "189.000đ",
    lessonsCount: 6,
    cover: "from-fuchsia-900 via-zinc-900 to-black",
    description:
      "Dùng AI viết tiêu đề, mô tả sản phẩm và kịch bản bán hàng có tỉ lệ chuyển đổi cao chỉ trong vài phút.",
    outcomes: [
      "Bộ khung prompt viết copy bán hàng chuyển đổi cao",
      "Viết tiêu đề, USP, CTA bằng AI trong 5 phút",
      "Tối ưu giọng văn theo từng nhóm khách hàng",
    ],
  },
  {
    slug: "thiet-ke-trang-ban-hang-ai",
    title: "Thiết Kế Trang Bán Hàng Bằng AI",
    tag: "Combo 3 · Xây trang",
    badge: "Khóa",
    price: 256000,
    priceLabel: "256.000đ",
    lessonsCount: 8,
    cover: "from-sky-900 via-zinc-900 to-black",
    description:
      "Dựng landing page bán hàng chuyên nghiệp bằng công cụ AI, không cần biết code, xong trong một buổi chiều.",
    outcomes: [
      "Chọn đúng công cụ AI dựng trang cho từng ngân sách",
      "Quy trình dựng landing page hoàn chỉnh từ A-Z",
      "Checklist tối ưu tốc độ & giao diện chuyên nghiệp",
    ],
  },
  {
    slug: "pheu-automation-ai",
    title: "Phễu & Automation AI",
    tag: "Combo 4 · Tự động hoá",
    badge: "Khóa",
    price: 279000,
    priceLabel: "279.000đ",
    lessonsCount: 7,
    cover: "from-orange-900 via-zinc-900 to-black",
    description:
      "Kết nối chatbot AI, email và trang bán hàng thành một phễu chạy tự động, chăm sóc khách 24/7.",
    outcomes: [
      "Dựng chatbot AI tư vấn & chốt đơn tự động",
      "Kết nối phễu: trang bán hàng → chăm sóc → chốt đơn",
      "Tự động hoá follow-up khách hàng bằng AI",
    ],
  },
  {
    slug: "toi-uu-scale-doanh-so",
    title: "Tối Ưu & Scale Doanh Số",
    tag: "Combo 5 · Tăng trưởng",
    badge: "Khóa",
    price: 350000,
    priceLabel: "350.000đ",
    lessonsCount: 9,
    cover: "from-emerald-900 via-zinc-900 to-black",
    description:
      "Đọc số liệu, tối ưu tỉ lệ chuyển đổi và nhân bản hệ thống bán hàng bằng AI sang nhiều sản phẩm khác.",
    outcomes: [
      "Đọc và tối ưu chỉ số chuyển đổi trang bán hàng",
      "Dùng AI phân tích & đề xuất cải tiến trang bán hàng",
      "Nhân bản mô hình sang sản phẩm/thị trường mới",
    ],
  },
];

export const SPECIAL: Product = {
  slug: "ai-sales-system",
  title: "AI SALES SYSTEM",
  tag: "Đặc biệt · Cộng đồng tinh hoa",
  badge: "Đặc biệt",
  price: 0,
  priceLabel: "Tặng kèm khi mua trọn bộ",
  lessonsCount: 0,
  cover: "from-violet-950 via-zinc-900 to-black",
  description:
    "Cộng đồng riêng dành cho học viên hoàn thành trọn bộ lộ trình: review trang bán hàng, cập nhật công cụ AI mới nhất, và tặng kèm ebook.",
  outcomes: [
    "Review trang bán hàng 1-1 cùng mentor",
    "Cập nhật công cụ & prompt AI mới nhất hàng tháng",
    "Tặng kèm Ebook Kiếm Tiền Với AI bản in",
  ],
};

export const ALL_PRODUCTS: Product[] = [EBOOK, ...COMBOS, SPECIAL];

export const BUNDLE_PRICE = 990000;
export const BUNDLE_ORIGINAL_PRICE =
  EBOOK.price + COMBOS.reduce((sum, c) => sum + c.price, 0);

export function formatVnd(amount: number) {
  return amount.toLocaleString("vi-VN") + "đ";
}
