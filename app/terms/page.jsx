import TermsPage from "../../components/terms/terms-page";
import { createPageMetadata } from "../../lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Terms and Conditions | AquaMesh",
  description:
    "Read the AquaMesh terms and conditions for purchases, website use, warranties, and related policies.",
  path: "/terms/"
});

export default function TermsRoute() {
  return <TermsPage />;
}
