import { imageAssetHref } from "../../../lib/site-assets";
import ButtonLink from "../../ui/button-link";
import IconBadge from "../../ui/icon-badge";
import SiteContainer from "../../ui/site-container";
import { heroStats } from "./bench-page-data";

export default function BenchHero() {
  return (
    <section
      id="overview"
      className="relative isolate overflow-hidden bg-black text-white"
    >
      <div className="relative overflow-hidden bg-black">
        {/* emergence from the shadows — black -> deep charcoal vignette */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 72% 62% at 50% 42%, rgba(24,24,24,0.48) 0%, rgba(12,12,14,0.2) 42%, transparent 72%),
              linear-gradient(to bottom, rgb(0, 0, 0) 0%, rgb(8, 8, 10) 38%, rgb(14, 14, 16) 68%, rgb(0, 0, 0) 100%)
            `
          }}
        />

        <SiteContainer className="relative px-4 py-8 sm:px-6 sm:py-10 lg:px-8 lg:py-12">
          <div className="mx-auto flex max-w-5xl flex-col items-center text-center" data-aos="fade-up">
            <h1 className="max-w-4xl text-5xl font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl">
              AquaLab™
            </h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-100 sm:text-xl">
              Multi-parameter optical water analysis in a compact benchtop unit
              built for lab verification and grab-sample workflows.
            </p>
            <div className="relative mt-10 w-full max-w-3xl sm:mt-12">
              <div
                className="pointer-events-none absolute inset-x-10 bottom-2 h-28 rounded-full bg-white/8 blur-3xl sm:inset-x-16 sm:h-36"
                aria-hidden="true"
              />
              <img
                className="relative mx-auto max-h-[420px] w-full object-contain sm:max-h-[520px] lg:max-h-[560px]"
                src={imageAssetHref("bench_front_trans.png")}
                alt="AquaLab benchtop unit"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0.82) 82%, rgba(0, 0, 0, 0) 100%)",
                  maskImage:
                    "linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 1) 70%, rgba(0, 0, 0, 0.82) 82%, rgba(0, 0, 0, 0) 100%)"
                }}
              />
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:mt-12">
              <ButtonLink href="#specs" size="lg">
                Tech Specs
              </ButtonLink>
              <ButtonLink href="/preorder/" variant="secondary" size="lg">
                Preorder
              </ButtonLink>
              <ButtonLink href="#contact" variant="secondary" size="lg">
                Get in Touch
              </ButtonLink>
            </div>

            <div className="mt-8 grid w-full gap-4 sm:mt-10 sm:grid-cols-2 xl:grid-cols-4">
              {heroStats.map((stat) => (
                <article
                  key={stat.label}
                  className="rounded-[22px] border border-white/10 bg-white/8 px-5 py-5 text-left shadow-[0_20px_40px_rgba(0,0,0,0.2)] backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3">
                    <IconBadge icon={stat.icon} />
                    <p className="text-lg font-semibold leading-tight text-white">{stat.value}</p>
                  </div>
                  <p className="mt-3 text-xs uppercase tracking-[0.18em] text-slate-300">
                    {stat.label}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </SiteContainer>
      </div>
    </section>
  );
}
