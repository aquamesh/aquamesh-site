import TeamPage from "../../components/team/team-page";
import { createPageMetadata } from "../../lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Team | AquaMesh",
  description:
    "Meet the AquaMesh team building optical water-quality sensors, telemetry hardware, and analytics software.",
  path: "/team/"
});

export default function TeamRoute() {
  return <TeamPage />;
}
