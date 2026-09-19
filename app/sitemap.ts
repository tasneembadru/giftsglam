import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://giftsglam.vercel.app";

  return [
    {
      url: baseUrl,
      priority: 1,
      changeFrequency: "weekly",
    },

    {
      url: `${baseUrl}/projects`,
      priority: 0.9,
      changeFrequency: "weekly",
    },

    {
      url: `${baseUrl}/admin/login`,
      priority: 0.2,
      changeFrequency: "monthly",
    },
  ];
}