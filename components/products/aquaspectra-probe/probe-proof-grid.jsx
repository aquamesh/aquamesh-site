import InfoCard from "../../ui/info-card";
import SiteContainer from "../../ui/site-container";
import { proofCards } from "./probe-page-data";

export default function ProbeProofGrid() {
  return (
    <section className="bg-[linear-gradient(180deg,#f8fbfc_0%,#eef6f8_100%)] px-4 py-8 sm:px-6 lg:px-8">
      <SiteContainer padded={false}>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4" data-aos="fade-up">
          {proofCards.map((card) => (
            <InfoCard
              key={card.label}
              eyebrow={card.label}
              title={card.value}
              description={card.copy}
              className="rounded-[26px] border-[rgba(210,219,226,0.52)] bg-[linear-gradient(135deg,white_96%,#eef2f5_92%)] shadow-[0_20px_50px_rgba(6,24,33,0.08)]"
              data-aos="fade-up"
            />
          ))}
        </div>
      </SiteContainer>
    </section>
  );
}
