import { imageAssetHref } from "../../../lib/site-assets";
import ButtonLink from "../../ui/button-link";
import IconBadge from "../../ui/icon-badge";
import SiteContainer from "../../ui/site-container";
import { platformHeroStats } from "./platform-page-data";

export default function PlatformHero() {
  return (
    <section
      id="overview"
      className="relative isolate overflow-hidden bg-black text-white"
    >
      <div className="relative overflow-hidden bg-black">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              radial-gradient(ellipse 72% 62% at 50% 42%, rgba(24,24,24,0.48) 0%, rgba(12,12,14,0.2) 42%, transparent 72%),
              linear-gradient(to bottom, rgb(0, 0, 0) 0%, rgb(8, 8, 10) 38%, rgb(14, 14, 16) 68%, rgb(0, 0, 0) 100%)
            `
          }}
        />

        <SiteContainer className="relative px-4 py-10 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
          <div className="mx-auto flex max-w-6xl flex-col items-center text-center">
            <div className="max-w-4xl" data-aos="fade-up">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-aquamesh-300">
                Software Platform
              </p>
              <h1 className="mt-5 text-5xl font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl">
                AquaView
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-200 sm:text-xl">
                A web application for monitoring, visualizing, and analyzing
                water quality data from connected AquaMesh sensors in real time.
              </p>
            </div>

            <div className="relative mt-10 w-full max-w-6xl sm:mt-12" data-aos="fade-up">
              <div className="absolute inset-x-8 bottom-10 h-36 rounded-full bg-aquamesh-500/30 blur-3xl sm:inset-x-16 sm:h-44" />
              <div className="relative overflow-hidden rounded-[22px] border border-white/10 bg-white/[0.05] p-2 shadow-[0_36px_90px_rgba(0,0,0,0.45)] backdrop-blur-sm sm:rounded-[26px] sm:p-3">
                <div className="overflow-hidden rounded-[16px] border border-white/10 bg-slate-900/60 sm:rounded-[20px]">
                  <img
                    src={imageAssetHref("platform/platform_hero.png")}
                    alt="AquaView dashboard showing water quality trends and deployment analytics"
                    className="h-auto w-full"
                  />
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:mt-12">
              <ButtonLink href="#product-tour" size="lg">
                View Features
              </ButtonLink>
              <ButtonLink href="#contact" variant="secondary" size="lg">
                Get in Touch
              </ButtonLink>
            </div>

            <div className="mt-8 grid w-full gap-4 sm:mt-10 sm:grid-cols-2 xl:grid-cols-4">
              {platformHeroStats.map((stat) => (
                <article
                  key={stat.value}
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
