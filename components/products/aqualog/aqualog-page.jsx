import SitePageShell from "../../site-page-shell";
import ButtonLink from "../../ui/button-link";
import SectionCta from "../../ui/section-cta";
import SectionShell from "../../ui/section-shell";
import CtaSection from "../../home/cta-section";

const heroStats = [
  ["Display", "3.5-inch IPS screen"],
  ["Connectivity", "USB-C and Bluetooth LE"],
  ["Battery", "3,500 mAh with 8-hour runtime"],
  ["Enclosure", "IP67 polymer body"]
];

const specItems = [
  "Touchscreen detail and pixel dimensions",
  "Battery capacity, runtime, and charging notes",
  "USB-C, Bluetooth LE, and storage details",
  "Ingress protection and field durability"
];

const useCases = [
  "Field analysis of nitrate and fluorescence levels",
  "Sensor calibration and quick deployment validation",
  "Paired viewing workflows alongside AquaLink nodes"
];

export default function AqualogPage() {
  return (
    <SitePageShell route="products/aqualog">
      {/* TODO: Port the handheld product hero, media, and price treatment from legacy. */}
      <SectionShell
        eyebrow="Product"
        title="Aqualog Handheld Viewer"
        description="This native skeleton mirrors the legacy handheld viewer page: hero summary, overview, technical specs, use cases, and a preorder CTA."
        align="left"
      >
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-[32px] border border-aquamesh-300/40 bg-aquamesh-50 p-8">
            <p className="text-base leading-7 text-slate-700">
              The legacy page positions Aqualog as an all-in-one field viewer for live spectral data, onboard graphs, and fast setup without a laptop. Port that framing into the final hero component.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <ButtonLink href="/preorder/" size="sm">
                Enquire or Preorder
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

      {/* TODO: Port the overview tab copy and supporting media from legacy. */}
      <SectionShell
        id="overview"
        title="Overview"
        description="Use this area for the product story that explains why the handheld viewer exists and how it supports field workflows."
        align="left"
      >
        <div className="rounded-[32px] border border-slate-200 bg-white p-8 shadow-lg shadow-slate-900/5">
          <p className="text-sm leading-7 text-slate-600">
            TODO: Bring over the overview copy about real-time spectral viewing, Bluetooth sync, and onboard storage. This should become a richer narrative block, not just a single paragraph.
          </p>
        </div>
      </SectionShell>

      {/* TODO: Convert the legacy technical specs tab into a reusable spec layout. */}
      <SectionShell
        id="specs"
        title="Technical Specs"
        description="The final build should replace these cards with the full handheld spec list and any supporting imagery."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {specItems.map((item) => (
            <div
              key={item}
              className="rounded-[28px] border border-slate-200 bg-white p-5 text-sm leading-6 text-slate-700 shadow-lg shadow-slate-900/5"
            >
              {item}
            </div>
          ))}
        </div>
      </SectionShell>

      {/* TODO: Port the legacy use-case tab content into richer field-workflow content. */}
      <SectionShell
        id="use-cases"
        title="Use Cases"
        description="These placeholders preserve the exact use-case buckets already named on the legacy page."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {useCases.map((useCase) => (
            <article
              key={useCase}
              className="rounded-[28px] border border-aquamesh-300/40 bg-aquamesh-50 p-6 text-left shadow-lg shadow-aquamesh-900/5"
            >
              <p className="text-sm font-medium leading-6 text-slate-700">{useCase}</p>
            </article>
          ))}
        </div>
      </SectionShell>

      {/* TODO: Replace this CTA placeholder with the final inquiry and preorder messaging. */}
      <SectionCta
        title="Talk to AquaMesh about field workflows"
        description="The legacy page ends with a simple pricing note. This placeholder reserves space for the final CTA treatment and sales copy."
      >
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-6 text-slate-600">
            Add the final contact or preorder pathway here, along with any pricing qualifier or accessory notes carried over from legacy.
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
