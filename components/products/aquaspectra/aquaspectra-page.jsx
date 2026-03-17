import SitePageShell from "../../site-page-shell";
import ButtonLink from "../../ui/button-link";
import SectionCta from "../../ui/section-cta";
import SectionShell from "../../ui/section-shell";
import CtaSection from "../../home/cta-section";

const heroStats = [
  ["Connectivity", "RS485 half-duplex to AquaLink hub"],
  ["Battery", "3,200 mAh 3S 11.1V Li-Ion"],
  ["Form Factor", "120 mm W x 145 mm H"],
  ["Enclosure", "Waterproof, depth rated to 100 m"]
];

const tabPanels = [
  {
    title: "Overview",
    items: [
      "Compact, field-ready optical sensing summary",
      "Positioning for researchers and infrastructure teams",
      "Narrative handoff from the probe landing page"
    ]
  },
  {
    title: "Features",
    items: [
      "Dual-mode spectrometer and fluorometer story",
      "Swappable optics and cartridge messaging",
      "Telemetry, storage, and modular sensing details"
    ]
  },
  {
    title: "Use Cases",
    items: [
      "Watershed research",
      "Agricultural runoff and coastal sensing",
      "Smart infrastructure monitoring"
    ]
  },
  {
    title: "Specifications",
    items: [
      "Detection range, storage, and sampling cadence",
      "Waterproofing and corrosion-resistance details",
      "Final spec-table structure and measurement caveats"
    ]
  }
];

export default function AquaspectraPage() {
  return (
    <SitePageShell route="products/aquaspectra">
      {/* TODO: Port the technical-page hero image, spec summary, and pricing block. */}
      <SectionShell
        eyebrow="Technical Page"
        title="AquaSpectra Sensor"
        description="This route replaces the legacy technical specs page with a native skeleton that keeps the same hero summary and tabbed information architecture."
        align="left"
      >
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[32px] border border-aquamesh-300/40 bg-aquamesh-50 p-8">
            <p className="text-base leading-7 text-slate-700">
              The final page should explain the sensor as a full-spectrum, in-situ optical system with modular cartridges, live telemetry, and advanced analytics for field monitoring programs.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/products/aquaspectra-probe/" size="sm">
                Narrative Page
              </ButtonLink>
              <ButtonLink href="/preorder/" size="sm" variant="outline">
                Preorder
              </ButtonLink>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-xl shadow-slate-900/5">
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-aquamesh-500">
              Hero Specs To Port
            </p>
            <dl className="mt-5 space-y-4">
              {heroStats.map(([label, value]) => (
                <div key={label} className="rounded-2xl bg-slate-50 px-4 py-3">
                  <dt className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500">
                    {label}
                  </dt>
                  <dd className="mt-1 text-sm font-medium text-slate-800">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </SectionShell>

      {/* TODO: Rebuild the legacy tabbed interface as a native, accessible React/Tailwind component. */}
      <SectionShell
        id="details"
        title="Tabbed Interface Placeholder"
        description="The legacy page uses four tabs. This skeleton keeps each panel's content bucket visible so the eventual native tabs can be built without losing scope."
      >
        <div className="grid gap-6 md:grid-cols-2">
          {tabPanels.map((panel) => (
            <article
              key={panel.title}
              className="rounded-[28px] border border-slate-200 bg-white p-6 text-left shadow-lg shadow-slate-900/5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-aquamesh-500">
                Future Tab
              </p>
              <h3 className="mt-3 text-2xl font-semibold text-aquamesh-700">{panel.title}</h3>
              <ul className="mt-4 space-y-2 text-sm leading-6 text-slate-600">
                {panel.items.map((item) => (
                  <li key={item} className="rounded-2xl bg-slate-50 px-4 py-3">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </SectionShell>

      {/* TODO: Port the sticky CTA and any downstream links to related product pages. */}
      <SectionCta
        title="Bring AquaSpectra into a monitoring stack"
        description="This placeholder holds the final conversion section while the technical page is rebuilt with native components."
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-6 text-slate-600">
            Add final preorder language here, along with any supporting copy about cartridges, deployment planning, or integrations.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/preorder/" size="sm">
              Preorder
            </ButtonLink>
          </div>
        </div>
      </SectionCta>

      <CtaSection />
    </SitePageShell>
  );
}
