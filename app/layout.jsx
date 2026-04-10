import "./globals.css";
import { Poppins } from "next/font/google";
import SharedHeadLinks from "../components/shared-head-links";
import { siteAssets } from "../lib/site-assets";
import {
  absoluteSiteUrl,
  DEFAULT_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  SITE_NAME
} from "../lib/page-metadata";

const siteTitle = SITE_NAME;
const siteDescription = DEFAULT_DESCRIPTION;
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-poppins"
});

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: siteTitle,
  url: absoluteSiteUrl("/"),
  logo: absoluteSiteUrl(siteAssets.logo),
  description: siteDescription
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: siteTitle,
  url: absoluteSiteUrl("/"),
  description: siteDescription
};

export const metadata = {
  metadataBase: new URL("https://aquamesh.ai"),
  title: siteTitle,
  description: siteDescription,
  applicationName: siteTitle,
  publisher: siteTitle,
  alternates: {
    canonical: "/"
  },
  icons: {
    icon: siteAssets.favicon
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1
    }
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "https://aquamesh.ai",
    siteName: siteTitle,
    type: "website",
    images: [
      {
        url: DEFAULT_OG_IMAGE,
        alt: "AquaMesh water-quality monitoring overview"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: siteTitle,
    description: siteDescription,
    images: [DEFAULT_OG_IMAGE]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <SharedHeadLinks />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
      </head>
      <body className={`${poppins.variable} bg-white text-slate-900 antialiased`}>{children}</body>
    </html>
  );
}
