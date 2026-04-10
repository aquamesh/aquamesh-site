import SuccessPage from "../../components/success/success-page";
import { createPageMetadata } from "../../lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Payment Successful | AquaMesh",
  description: "Your AquaMesh payment was completed successfully.",
  path: "/success/",
  noIndex: true
});

export default function SuccessRoute() {
  return <SuccessPage />;
}
