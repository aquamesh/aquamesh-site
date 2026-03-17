import SitePageShell from "../site-page-shell";
import SectionShell from "../ui/section-shell";
import { teamMembers, advisors } from "./team-page-data";
import { imageAssetHref } from "../../lib/site-assets";

export default function TeamPage() {
  return (
    <SitePageShell route="team">
      <SectionShell
        id="about"
        title="About AquaMesh"
        className="bg-aquamesh-50"
        containerClassName="max-w-4xl"
      >
        <div className="space-y-6 text-lg leading-8 text-slate-700">
          <p>
            AquaMesh designs and manufactures cutting-edge water quality monitoring systems
            that revolutionize how we understand and protect our water resources. Our
            innovative technology combines high-precision optical sensing with advanced mesh
            networking to provide comprehensive, real-time water quality data.
          </p>
          <p>
            Our mission is to make water quality monitoring more efficient, accurate, and
            accessible than ever before. Through our advanced sensor technology and seamless
            connectivity solutions, we empower researchers, environmental agencies, and
            industries to make data-driven decisions for water resource management.
          </p>
        </div>
      </SectionShell>

      <SectionShell eyebrow="Our Team" title="Meet the Team">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {teamMembers.map((member, i) => (
            <div key={i} className="text-center">
              {member.image ? (
                <img
                  src={imageAssetHref(member.image)}
                  alt={member.name}
                  className="mx-auto mb-4 h-40 w-40 rounded-full object-cover"
                />
              ) : (
                <div className="mx-auto mb-4 h-40 w-40 rounded-full bg-slate-200" />
              )}
              <h3 className="text-xl font-semibold text-aquamesh-700">{member.name}</h3>
              <p className="text-sm font-semibold text-aquamesh-500">{member.role}</p>
              <p className="text-sm italic text-slate-500">{member.credentials}</p>
              <p className="mt-2 text-sm text-slate-600">{member.bio}</p>
            </div>
          ))}
        </div>
      </SectionShell>

      <SectionShell eyebrow="Advisors" title="Our Advisors">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {advisors.map((advisor, i) => (
            <div key={i} className="text-center">
              <div className="mx-auto mb-4 h-28 w-28 overflow-hidden rounded-full bg-[#dddddd]">
                <img
                  src={imageAssetHref("team/placeholder.png")}
                  alt={advisor.name}
                  className="h-full w-full scale-75 object-cover"
                />
              </div>
              <h3 className="text-lg font-semibold text-aquamesh-700">{advisor.name}</h3>
              <p className="text-sm text-slate-600">{advisor.caption}</p>
            </div>
          ))}
        </div>
      </SectionShell>
    </SitePageShell>
  );
}
