import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ["", "/flowers", "/about", "/order"].map((path) => ({
    url: `${site.url}${path}`,
    lastModified,
  }));
}
