import CompetitionPage from "../../components/competition/competition-page";
import { createPageMetadata } from "../../lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Parameter Comparison | Water Quality Monitoring Coverage | AquaMesh",
  description:
    "Compare AquaMesh parameter coverage across optical water-quality monitoring needs, including fluorescence, absorbance, turbidity, and related indicators.",
  path: "/competition/"
});

export default function CompetitionRoute() {
  return <CompetitionPage />;
}
