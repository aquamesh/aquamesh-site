import { imageAssetHref } from "../../../lib/site-assets";
import { cx } from "../../../lib/cx";
import ButtonLink from "../../ui/button-link";
import FeatureChecklist from "../../ui/feature-checklist";
import IconBadge from "../../ui/icon-badge";
import ProbeSection from "./probe-section";
import { storyPanels } from "./probe-page-data";

function StoryPanel({ panel }) {
  const isInterfaceMedia = panel.mediaClassName?.includes("probe-story-media--interface");

  const headerBlock = (
    <div>
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-aquamesh-500">
        {panel.index}
      </p>
      <h3 className="mt-4 text-3xl font-semibold tracking-tight text-aquamesh-700">
        {panel.title}
      </h3>
    </div>
  );

  function renderMediaBlock(wrapperClassName = "") {
    return (
      <figure
        className={cx(
          "mx-auto w-full lg:max-w-none",
          isInterfaceMedia ? "max-w-[30rem] md:max-w-[34rem]" : "max-w-[28rem] md:max-w-[30rem]",
          wrapperClassName
        )}
      >
        <div
          className={cx(
            "flex items-center justify-center overflow-hidden border border-slate-200 shadow-[0_26px_46px_rgba(15,23,42,0.12)]",
            isInterfaceMedia
              ? "rounded-[12px] bg-white"
              : "rounded-[16px] bg-[linear-gradient(180deg,#f8fbfc_0%,#e9f1f4_100%)] px-6 py-8 sm:px-8 sm:py-10"
          )}
        >
          <img
            src={imageAssetHref(panel.imageSrc)}
            alt={panel.imageAlt}
            className={cx(
              "mx-auto",
              isInterfaceMedia
                ? "w-full object-cover"
                : panel.mediaImageClassName || "w-[85%] object-contain drop-shadow-[0_26px_46px_rgba(0,0,0,0.42)]",
              !isInterfaceMedia && "object-contain drop-shadow-[0_26px_46px_rgba(0,0,0,0.42)]"
            )}
          />
        </div>
        {(panel.badgeTitle || panel.badgeCopy) ? (
          <figcaption className="mt-4 px-1">
            {panel.badgeTitle ? (
              <p className="text-sm font-semibold tracking-tight text-aquamesh-700">
                {panel.badgeTitle}
              </p>
            ) : null}
            {panel.badgeCopy ? (
              <p className="mt-1 text-sm leading-6 text-slate-600">
                {panel.badgeCopy}
              </p>
            ) : null}
          </figcaption>
        ) : null}
      </figure>
    );
  }

  const bodyBlock = (
    <div>
      <FeatureChecklist
        items={panel.points}
        className="mt-4"
        itemClassName="flex items-start gap-3 text-sm leading-6 rounded-[18px] bg-slate-900/5 px-4 py-3.5 text-[#1d3b48] font-semibold"
        renderIcon={(item) => <IconBadge icon={item.icon} className="self-center" />}
      />
      {panel.ctaHref ? (
        <div className="mt-5">
          <ButtonLink href={panel.ctaHref} variant="subtle" size="sm">
            {panel.ctaLabel || "Learn More"}
          </ButtonLink>
        </div>
      ) : null}
    </div>
  );

  const mediaBlock = renderMediaBlock();
  const desktopTextBlock = (
    <div>
      {headerBlock}
      {bodyBlock}
    </div>
  );

  return (
    <article
      className={cx(
        "grid gap-6 rounded-[32px] border border-slate-900/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(238,243,246,0.92))] p-6 shadow-[0_22px_64px_rgba(8,24,32,0.08)] lg:gap-x-8 lg:items-center lg:p-8",
        panel.reverse
          ? "lg:grid-cols-[minmax(320px,480px)_minmax(0,1fr)]"
          : "lg:grid-cols-[minmax(0,1fr)_minmax(320px,480px)]"
      )}
      data-aos="fade-up"
    >
      <div className={cx("lg:hidden", panel.reverse ? "lg:order-2" : "lg:order-1")}>
        {headerBlock}
      </div>
      <div className={cx("hidden lg:block", panel.reverse ? "lg:order-2" : "lg:order-1")}>
        {desktopTextBlock}
      </div>
      <div
        className={cx(
          panel.reverse ? "lg:order-1" : "lg:order-2"
        )}
      >
        {mediaBlock}
      </div>
      <div className="lg:hidden">
        {bodyBlock}
      </div>
    </article>
  );
}

export default function ProbeStoryPanels() {
  return (
    <ProbeSection
      id="inside"
      eyebrow="Key Advantages"
      title="Three reasons AquaSpectra is easier to deploy at scale."
      intro="Multi-parameter sensing, straightforward scalability, and low-maintenance operation"
      tone="mist"
      containerClassName="max-w-6xl"
    >
      <div className="space-y-6">
        {storyPanels.map((panel) => (
          <StoryPanel key={panel.index} panel={panel} />
        ))}
      </div>
    </ProbeSection>
  );
}
