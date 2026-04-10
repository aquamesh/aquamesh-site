import ContactPage from "../../components/contact/contact-page";
import { createPageMetadata } from "../../lib/page-metadata";

export const metadata = createPageMetadata({
  title: "Contact AquaMesh | Water Monitoring Deployments and Partnerships",
  description:
    "Talk with AquaMesh about water-quality monitoring deployments, product questions, pilots, partnerships, and procurement.",
  path: "/contact/"
});

export default function ContactRoute() {
  return <ContactPage />;
}
