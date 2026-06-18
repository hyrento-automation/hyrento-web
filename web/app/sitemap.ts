import type { MetadataRoute } from "next";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://carrental.digital";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`,          lastModified: now, changeFrequency: "weekly",  priority: 1.0  },
    { url: `${BASE_URL}/features`,  lastModified: now, changeFrequency: "monthly", priority: 0.9  },
    { url: `${BASE_URL}/pricing`,   lastModified: now, changeFrequency: "weekly",  priority: 0.9  },
    { url: `${BASE_URL}/solutions`, lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/about`,     lastModified: now, changeFrequency: "monthly", priority: 0.7  },
    { url: `${BASE_URL}/demo`,      lastModified: now, changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE_URL}/contact`,   lastModified: now, changeFrequency: "yearly",  priority: 0.7  },
    { url: `${BASE_URL}/downloads`, lastModified: now, changeFrequency: "monthly", priority: 0.6  },
  ];

  return staticRoutes;
}
