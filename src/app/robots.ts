import type { MetadataRoute } from "next";

const SITE_URL = "https://ai-sales-academy-seven.vercel.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/hoc-vien", "/admin", "/dat-lai-mat-khau"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
