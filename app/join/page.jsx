import JoinPage from "../../components/join/join-page";
import { createPageMetadata } from "../../lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Join AquaMesh | Careers",
  description:
    "Explore opportunities to join AquaMesh and help build water-quality monitoring hardware, embedded systems, and analytics software.",
  path: "/join/"
});

export default function JoinRoute() {
  return <JoinPage />;
}
