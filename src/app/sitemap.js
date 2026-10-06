import { siteUrl } from "@/lib/seo";

export default function sitemap() {
  const now = new Date();
  const sections = ["#hero", "#work", "#experience", "#skills", "#testimonials", "#contact"];

  return [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    ...sections.map((hash) => ({
      url: `${siteUrl}/${hash}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
}
