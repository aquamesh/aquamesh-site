import InfoCard from "../../ui/info-card";
import ProbeSection from "./probe-section";
import { sellingPoints } from "./probe-page-data";

export default function ProbeSellingPoints() {
  return (
    <ProbeSection
      id="selling-points"
      eyebrow="Key Advantages"
      title="Why AquaSpectra stands out in the field."
      intro="Broad sensing coverage, stainless durability, and a cleaner path from deployment to decision."
      tone="dark"
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {sellingPoints.map((point) => (
          <InfoCard
            key={point.title}
            title={point.title}
            description={point.copy}
            className="border-white/15 shadow-[0_22px_48px_rgba(0,0,0,0.12)]"
            style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03)), rgba(19,31,38,0.9)" }}
            titleClassName="text-white"
            descriptionClassName="text-slate-300"
            data-aos="fade-up"
            data-aos-delay={point.delay}
            leading={
              <div
                className="inline-flex h-[3.3rem] w-[3.3rem] items-center justify-center rounded-2xl text-aquamesh-300"
                style={{ background: "linear-gradient(135deg, rgba(102,211,240,0.22), rgba(255,255,255,0.12))" }}
              >
                <i className={point.icon}></i>
              </div>
            }
          />
        ))}
      </div>
    </ProbeSection>
  );
}
