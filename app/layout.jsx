import "./globals.css";
import SharedHeadLinks from "../components/shared-head-links";
import { siteAssets } from "../lib/site-assets";

const siteTitle = "AquaMesh";
const siteDescription =
  "Real-time water-quality monitoring for aquaculture, environmental research, and conservation. Affordable smart sensors, wireless connectivity, and a cloud analytics platform.";

export const metadata = {
  metadataBase: new URL("https://aquamesh.ai"),
  title: siteTitle,
  description: siteDescription,
  icons: {
    icon: siteAssets.favicon
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "https://aquamesh.ai",
    siteName: siteTitle,
    type: "website"
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <SharedHeadLinks />
      </head>
      <body className="bg-white text-slate-900 antialiased">{children}</body>
    </html>
  );
}
