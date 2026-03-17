import { siteAssets } from "../lib/site-assets";
import {
  getFooterProductLinks,
  getFooterQuickLinks
} from "../lib/site-navigation";
import { routeHref } from "../lib/site-paths";
import SiteContainer from "./ui/site-container";

const currentYear = new Date().getFullYear();

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-aquamesh-300">
        {title}
      </h3>
      <ul className="mt-5 space-y-3 text-sm text-slate-300">
        {links.map((link) => (
          <li key={link.label}>
            <a className="transition hover:text-white" href={link.href}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function MarketingFooter({ route = "" }) {
  const quickLinks = getFooterQuickLinks(route);
  const productLinks = getFooterProductLinks(route);
  const description =
    route === "products/aquaspectra-probe"
      ? "Continuous optical sensing, resilient telemetry, and deployable field systems for modern monitoring programs."
      : "Connected sensing, field telemetry, and data workflows for teams managing critical water systems.";

  return (
    <footer className="bg-slate-950 text-white">
      <SiteContainer className="py-16">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr_0.75fr_1fr]">
          <div className="max-w-sm">
            <img src={siteAssets.logo} alt="AquaMesh Logo" className="h-11 w-auto" />
            <p className="mt-5 text-sm leading-7 text-slate-300">{description}</p>
          </div>

          <FooterColumn title="Quick Links" links={quickLinks} />
          <FooterColumn title="Products" links={productLinks} />

          <div className="text-sm text-slate-300">
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-aquamesh-300">
              Contact
            </h3>
            <div className="mt-5 space-y-3 leading-7">
              <p>9510 Innovation Ln, La Jolla, CA</p>
              <p>(619) 354-8667</p>
              <p>info@aquamesh.ai</p>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>&copy; {currentYear} AquaMesh Inc. All Rights Reserved.</p>
          <div className="flex flex-wrap gap-4">
            <a className="transition hover:text-white" href={routeHref("/privacy/")}>
              Privacy Policy
            </a>
            <a className="transition hover:text-white" href={routeHref("/terms/")}>
              Terms of Service
            </a>
            <a className="transition hover:text-white" href={routeHref("/sitemap/")}>
              Sitemap
            </a>
          </div>
        </div>
      </SiteContainer>
    </footer>
  );
}

export default function SiteFooter({ route = "" }) {
  return <MarketingFooter route={route} />;
}
