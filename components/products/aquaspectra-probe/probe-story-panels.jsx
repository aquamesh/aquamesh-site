import { imageAssetHref } from "../../../lib/site-assets";
import FeatureChecklist from "../../ui/feature-checklist";
import ProbeSection from "./probe-section";
import { storyPanels } from "./probe-page-data";

function StoryPanel({ panel }) {
  return (
    <article
      className="grid gap-8 rounded-[32px] border border-slate-900/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(238,243,246,0.92))] p-6 shadow-[0_22px_64px_rgba(8,24,32,0.08)] lg:grid-cols-[minmax(0,1fr)_minmax(320px,480px)] lg:items-center lg:p-8"
      data-aos="fade-up"
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-aquamesh-500">
          {panel.index}
        </p>
        <h3 className="mt-4 text-3xl font-semibold tracking-tight text-aquamesh-700">
          {panel.title}
        </h3>
        <p className="mt-4 text-base leading-7 text-slate-700">{panel.copy}</p>
        <FeatureChecklist
          items={panel.points}
          className="mt-6"
          itemClassName="flex items-start gap-3 text-sm leading-6 rounded-[18px] bg-slate-900/5 px-4 py-3.5 text-[#1d3b48] font-semibold"
          iconClassName="mt-0.5 inline-flex h-5 w-5 flex-none items-center justify-center rounded-full bg-aquamesh-50 text-aquamesh-500"
        />
      </div>

      <div className="flex items-center justify-center">
        <img
          src={imageAssetHref(panel.imageSrc)}
          alt={panel.imageAlt}
          className="mx-auto w-[85%] object-contain drop-shadow-[0_26px_46px_rgba(0,0,0,0.42)]"
        />
      </div>
    </article>
  );
}

export default function ProbeStoryPanels() {
  return (
    <ProbeSection
      id="inside"
      eyebrow="Inside The Probe"
      title="Built to cover chemistry, survive deployment, and stay connected."
      intro="A full-spectrum optical stack, field-ready materials, and a clean fit with the wider AquaMesh system."
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
