import type { MetadataRoute } from "next";

const SITE_URL = "https://ai-sales-academy-seven.vercel.app";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/san-pham", "/doi-tac", "/dang-nhap"];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.7,
  }));
}
