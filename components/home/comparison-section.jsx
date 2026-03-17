import { routeHref } from "../../lib/site-paths";
import ButtonLink from "../ui/button-link";
import SectionShell from "../ui/section-shell";

const competitors = [
  {
    title: "AquaSpectra™",
    href: routeHref("/products/aquaspectra-probe/"),
    technologyTitle: "Full-spectrum Optical",
    technologyDetail: "UV-VIS, Fluorescence, Absorbance, Turbidity",
    parameters: "20+",
    keyParameters: ["Nitrate", "TOC", "fDOM", "TLF", "Chlorophyll", "RWT", "CDOM", "Phycocyanin", "Phycoerythrin"],
    meshNetworking: true,
    price: "Please Enquire",
    featured: true
  },
  {
    title: "EXO2",
    href: "https://www.ysi.com/exo2",
    technologyTitle: "Optical + Electrochemical",
    parameters: "10",
    keyParameters: ["DO", "pH", "Chlorophyll", "fDOM", "Nitrate"],
    meshNetworking: false,
    price: "$20,000"
  },
  {
    title: "spectro::lyser V3",
    href: "https://www.s-can.at/products/spectrolyser/",
    technologyTitle: "Optical (UV-VIS Absorbance)",
    parameters: "8",
    keyParameters: ["TOC", "Nitrate", "UV254", "COD"],
    meshNetworking: false,
    price: "$25,000"
  },
  {
    title: "Hach SL1000",
    href: "https://www.hach.com/sl1000",
    technologyTitle: "Optical + ISE",
    parameters: "9",
    keyParameters: ["Turbidity", "fDOM", "Nitrate", "DO"],
    meshNetworking: false,
    price: "$20,000"
  },
  {
    title: "Hydrolab HL7",
    href: "https://www.ott.com/products/water-quality/hydrolab-hl7-multiparameter-sonde/",
    technologyTitle: "Optical + ISE",
    parameters: "9",
    keyParameters: ["DO", "pH", "Chlorophyll"],
    meshNetworking: false,
    price: "$18,000"
  }
];

function KeyParameter({ children }) {
  return (
    <span className="rounded-full bg-aquamesh-50 px-3 py-1 text-xs font-medium text-aquamesh-700">
      {children}
    </span>
  );
}

function HighlightedValue({ featured, children }) {
  return (
    <span className={featured ? "font-semibold text-aquamesh-500" : "text-slate-700"}>
      {children}
    </span>
  );
}

export default function ComparisonSection() {
  return (
    <SectionShell
      id="competitive-matrix"
      eyebrow="Comparison"
      title="Why We&apos;re Better"
      description="AquaMesh combines broader optical coverage with connected deployment infrastructure that typical sondes do not include."
      className="bg-slate-50"
    >
      <div className="overflow-x-auto rounded-[28px] border border-slate-200 bg-white shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 text-left">
          <thead>
            <tr className="bg-slate-900 text-sm uppercase tracking-[0.18em] text-white">
              <th className="px-6 py-4 font-medium">Product</th>
              <th className="px-6 py-4 font-medium">Sensor Technology</th>
              <th className="px-6 py-4 font-medium"># Parameters</th>
              <th className="px-6 py-4 font-medium">Key Parameters</th>
              <th className="px-6 py-4 font-medium">Mesh Networking</th>
              <th className="px-6 py-4 font-medium">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {competitors.map((competitor) => (
              <tr key={competitor.title} className="align-top hover:bg-slate-50">
                <td className="px-6 py-5">
                  <a
                    href={competitor.href}
                    className="font-semibold text-aquamesh-700 transition-colors hover:text-aquamesh-500"
                  >
                    {competitor.title}
                  </a>
                </td>
                <td className="px-6 py-5 text-sm leading-6 text-slate-600">
                  <HighlightedValue featured={competitor.featured}>
                    {competitor.technologyTitle}
                  </HighlightedValue>
                  {competitor.technologyDetail ? (
                    <div className="text-xs text-slate-500">{competitor.technologyDetail}</div>
                  ) : null}
                </td>
                <td className="px-6 py-5 text-sm">
                  <HighlightedValue featured={competitor.featured}>
                    {competitor.parameters}
                  </HighlightedValue>
                </td>
                <td className="px-6 py-5">
                  <div className="flex min-w-[220px] flex-wrap gap-2">
                    {competitor.keyParameters.map((parameter) => (
                      <KeyParameter key={parameter}>{parameter}</KeyParameter>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-5 text-sm font-semibold">
                  <span className={competitor.meshNetworking ? "text-emerald-600" : "text-slate-400"}>
                    {competitor.meshNetworking ? "Yes" : "No"}
                  </span>
                </td>
                <td className="px-6 py-5 text-sm">
                  <HighlightedValue featured={competitor.featured}>
                    {competitor.price}
                  </HighlightedValue>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8 text-center">
        <ButtonLink href="/competition/" data-aos="zoom-in" data-aos-delay="300">
          Learn more about our competitive edge
        </ButtonLink>
      </div>
    </SectionShell>
  );
}
