import CancelPage from "../../components/cancel/cancel-page";
import { createPageMetadata } from "../../lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Payment Cancelled | AquaMesh",
  description: "Your AquaMesh checkout was cancelled before payment completed.",
  path: "/cancel/",
  noIndex: true
});

export default function CancelRoute() {
  return <CancelPage />;
}
