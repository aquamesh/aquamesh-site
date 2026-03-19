import { imageAssetHref } from "../../../lib/site-assets"
import ButtonLink from "../../ui/button-link"
import IconBadge from "../../ui/icon-badge"
import SiteContainer from "../../ui/site-container"
import { aqualinkHeroStats } from "./aqualink-page-data"

export default function AqualinkHero() {
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
          <div className="mx-auto grid max-w-6xl gap-10 lg:gap-12">
            <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-12">
            <div className="max-w-2xl" data-aos="fade-up">
              <p className="text-sm font-semibold uppercase tracking-[0.28em] text-aquamesh-300">
                Gateway Hub
              </p>
              <h1 className="mt-5 text-5xl font-bold tracking-tight text-balance sm:text-6xl lg:text-7xl">
                AquaLink
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-200 sm:text-xl">
                The backbone of AquaMesh&apos;s long-range IoT network, built to
                move water-quality telemetry from remote sensor deployments into
                live operational visibility.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <ButtonLink href="#deployment" size="lg">
                  View Deployment
                </ButtonLink>
                <ButtonLink href="#contact" variant="secondary" size="lg">
                  Get in Touch
                </ButtonLink>
              </div>

              {/* <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-full bg-emerald-400/15 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-200">
                  Deployment ready
                </span>
                <span className="rounded-full bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200">
                  Included
                </span>
              </div> */}
            </div>

            <div className="relative" data-aos="fade-up" data-aos-delay="100">
              <div className="absolute inset-x-8 top-12 h-40 rounded-full bg-aquamesh-500/25 blur-3xl sm:inset-x-16 sm:h-48" />
              <div className="relative flex justify-center px-4 pb-2 pt-2 sm:px-8 sm:pt-6 lg:px-6">
                <img
                  src={imageAssetHref("transparent_hub.png")}
                  alt="AquaLink Hub gateway hardware"
                  className="h-auto max-h-[420px] w-full max-w-[380px] object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.55)] sm:max-h-[500px] sm:max-w-[440px] lg:max-h-[560px] lg:max-w-[500px]"
                />
              </div>
            </div>
          </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4" data-aos="fade-up" data-aos-delay="140">
              {aqualinkHeroStats.map((stat) => (
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
  )
}
