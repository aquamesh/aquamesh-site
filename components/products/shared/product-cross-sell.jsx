import ButtonLink from "../../ui/button-link";
import InfoCard from "../../ui/info-card";
import SectionShell from "../../ui/section-shell";
import crossSellCatalog from "./cross-sell-data";

const slugs = Object.keys(crossSellCatalog);

export default function ProductCrossSell({ currentProduct }) {
  const others = slugs.filter((s) => s !== currentProduct);

  return (
    <SectionShell
      eyebrow="Explore the Stack"
      title="Built to work together."
      className="bg-[radial-gradient(circle_at_top_left,rgba(28,157,187,0.09),transparent_36%),linear-gradient(180deg,#ffffff_0%,#f7fbfc_100%)]"
      containerClassName="max-w-5xl"
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {others.map((slug) => {
          const product = crossSellCatalog[slug];
          return (
            <InfoCard
              key={slug}
              eyebrow={product.eyebrow}
              title={product.name}
              description={product.tagline}
              className="border border-slate-200 bg-white/95 shadow-[0_20px_60px_rgba(8,24,32,0.08)]"
              leading={
                <div
                  className={`aspect-[16/9] overflow-hidden rounded-xl bg-slate-50 ${slug === "platform" ? "" : "p-5"}`}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-contain"
                  />
                </div>
              }
            >
              <ButtonLink href={product.href} variant="subtle" size="sm">
                Learn more
              </ButtonLink>
            </InfoCard>
          );
        })}
      </div>
    </SectionShell>
  );
}
