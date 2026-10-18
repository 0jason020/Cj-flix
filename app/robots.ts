import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api",
          "/admin",
          "/watchlist",
          "/my-list",
          "/profile",
          "/login",
          "/register",
          "/.next",
        ],
      },
    ],
    sitemap: "https://cjflix.com/sitemap.xml",
    host: "https://cjflix.com",
  };
}
