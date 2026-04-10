import PrivacyPage from "../../components/privacy/privacy-page";
import { createPageMetadata } from "../../lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Privacy Policy | AquaMesh",
  description:
    "Read the AquaMesh privacy policy covering data collection, cookies, communications, and customer information handling.",
  path: "/privacy/"
});

export default function PrivacyRoute() {
  return <PrivacyPage />;
}
