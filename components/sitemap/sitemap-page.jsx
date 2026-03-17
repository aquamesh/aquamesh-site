import { routeHref } from "../../lib/site-paths";
import SitePageShell from "../site-page-shell";
import SectionShell from "../ui/section-shell";

const sections = [
  {
    title: "Main",
    links: [
      { label: "Home", href: "/" },
      { label: "Team", href: "/team/" },
      { label: "Careers", href: "/join/" },
      { label: "Contact", href: "/contact/" },
      { label: "Preorder", href: "/preorder/" },
      { label: "Competition", href: "/competition/" }
    ]
  },
  {
    title: "Products",
    links: [
      { label: "AquaSpectra Probe", href: "/products/aquaspectra-probe/" },
      { label: "AquaLink Hub", href: "/products/aqualink-hub/" },
      { label: "AquaView Platform", href: "/products/aquaview-platform/" }
    ]
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy/" },
      { label: "Terms and Conditions", href: "/terms/" }
    ]
  }
];

export default function SitemapPage() {
  return (
    <SitePageShell route="sitemap">
      <SectionShell
        eyebrow="Navigation"
        title="Sitemap"
        description="A complete overview of all pages on the AquaMesh website."
      >
        <div className="mx-auto grid max-w-3xl gap-6 md:grid-cols-3">
          {sections.map((section) => (
            <div
              key={section.title}
              className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-lg shadow-slate-900/5"
            >
              <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-aquamesh-500">
                {section.title}
              </h3>
              <ul className="mt-4 space-y-3 text-sm">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <a
                      href={routeHref(link.href)}
                      className="text-slate-700 transition hover:text-aquamesh-700"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </SectionShell>
    </SitePageShell>
  );
}
