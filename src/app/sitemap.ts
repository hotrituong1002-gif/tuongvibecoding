import type { MetadataRoute } from "next";

const SITE_URL = "https://ai-sales-academy-seven.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/san-pham",
    "/dang-nhap",
    "/dieu-khoan",
    "/chinh-sach-hoan-tien",
    "/chinh-sach-bao-mat",
  ];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
