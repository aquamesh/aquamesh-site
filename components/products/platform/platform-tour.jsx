import { imageAssetHref } from "../../../lib/site-assets";
import { cx } from "../../../lib/cx";
import SectionShell from "../../ui/section-shell";
import FeatureChecklist from "../../ui/feature-checklist";
import IconBadge from "../../ui/icon-badge";
import { platformTourCards } from "./platform-page-data";

function TourCard({ card }) {
  const textBlock = (
    <div className="flex flex-col justify-center">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-aquamesh-500">
        {card.index}
      </p>
      <h3 className="mt-4 text-3xl font-semibold tracking-tight text-aquamesh-700">
        {card.title}
      </h3>
      <p className="mt-4 text-base leading-7 text-slate-700">{card.copy}</p>
      <FeatureChecklist
        items={card.points}
        className="mt-6"
        itemClassName="flex items-center gap-3 text-sm leading-6 rounded-[18px] bg-slate-900/5 px-4 py-3.5 text-[#1d3b48] font-semibold"
        renderIcon={(item) => <IconBadge icon={item.icon} className="self-center" />}
      />
    </div>
  );

  const mediaBlock = (
    <div className="order-first flex items-center justify-center lg:order-none">
      <img
        src={imageAssetHref(card.imageSrc)}
        alt={card.imageAlt}
        className="w-full rounded-2xl border border-slate-200 object-cover shadow-lg"
      />
    </div>
  );

  return (
    <article
      className={cx(
        "grid gap-8 rounded-[32px] border border-slate-900/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(238,243,246,0.92))] p-6 shadow-[0_22px_64px_rgba(8,24,32,0.08)] lg:items-center lg:p-8",
        card.reverse
          ? "lg:grid-cols-[minmax(320px,480px)_minmax(0,1fr)]"
          : "lg:grid-cols-[minmax(0,1fr)_minmax(320px,480px)]"
      )}
      data-aos="fade-up"
    >
      {card.reverse ? mediaBlock : textBlock}
      {card.reverse ? textBlock : mediaBlock}
    </article>
  );
}

export default function PlatformTour() {
  return (
    <SectionShell
      id="product-tour"
      eyebrow="Product Tour"
      title="From raw data to actionable intelligence."
      description="Walk through the core views that keep water-quality programs running — from live maps to AI-generated reports."
      className="bg-[linear-gradient(180deg,#f8fbfc_0%,#eef6f8_100%)]"
      containerClassName="max-w-6xl"
    >
      <div className="space-y-6">
        {platformTourCards.map((card) => (
          <TourCard key={card.index} card={card} />
        ))}
      </div>
    </SectionShell>
  );
}
