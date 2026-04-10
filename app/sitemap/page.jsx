import SitemapPage from "../../components/sitemap/sitemap-page";
import { createPageMetadata } from "../../lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Sitemap | AquaMesh",
  description: "HTML sitemap for AquaMesh pages, products, and case studies.",
  path: "/sitemap/",
  noIndex: true
});

export default function SitemapRoute() {
  return <SitemapPage />;
}
