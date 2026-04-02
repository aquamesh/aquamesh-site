import { imageAssetHref } from "../../lib/site-assets";
import ProductFeature from "../ui/product-feature";
import SectionShell from "../ui/section-shell";

const products = [
  {
    eyebrow: "Sensor",
    title: "AquaSpectra™ Sensor",
    description:
      "Our flagship multi-parameter sensor featuring fluorescence, absorbance, and turbidity measurements in a single compact device.",
    features: ["High precision", "Low power consumption", "Extended battery life"],
    imageSrc: "full_probe_shot.png",
    imageAlt: "AquaSpectra Sensor",
    imageAos: "fade-left",
    ctas: [
      {
        href: "/products/aquaspectra-probe/",
        label: "Explore Probe",
        variant: "primary"
      },
      {
        href: "/preorder/",
        label: "Preorder Now",
        variant: "outline"
      }
    ],
    reverse: false,
    imageHasBlob: true,
    ctaContainerAos: "zoom-in",
    ctaContainerAosDelay: 200
  },
  {
    eyebrow: "Benchtop",
    title: "AquaLab™ Benchtop",
    description:
      "The same multi-parameter optical engine as the AquaSpectra probe, repackaged in a compact benchtop unit for lab-side verification and grab-sample analysis.",
    features: ["USB-C powered", "Field-to-lab continuity", "Same optical engine"],
    imageSrc: "bench_top_angle_trans.png",
    imageAlt: "AquaLab Benchtop",
    imageAos: "fade-right",
    ctas: [
      {
        href: "/products/aqualab-benchtop/",
        label: "Learn More",
        variant: "primary",
        dataAos: "zoom-in",
        dataAosDelay: 300
      }
    ],
    reverse: true,
    textAos: "fade-left",
    imageHasBlob: true
  },
  {
    eyebrow: "Gateway",
    title: "AquaLink™ Hub",
    description:
      "The central gateway for our mesh network, facilitating long-range communication between sensors and seamless data transmission to the cloud.",
    features: ["LoRa connectivity", "Solar powered", "Extensive range"],
    imageSrc: "transparent_hub.png",
    imageAlt: "AquaLink Hub",
    imageAos: "fade-left",
    ctas: [
      {
        href: "/products/aqualink-hub/",
        label: "Learn More",
        variant: "primary",
        dataAos: "zoom-in",
        dataAosDelay: 300
      }
    ],
    reverse: false,
    textAos: "fade-right"
  },
  {
    eyebrow: "Platform",
    title: "AquaView™ Platform",
    description:
      "Comprehensive web application for monitoring, visualizing, and analyzing water quality data from all connected sensors.",
    features: ["Real-time alerts", "Data visualization", "Custom reporting"],
    imageSrc: "platform_home_screenshot.png",
    imageAlt: "AquaView Platform",
    imageFullBleed: true,
    imageAos: "fade-right",
    ctas: [
      {
        href: "/products/aquaview-platform/",
        label: "See Platform",
        variant: "primary",
        dataAos: "zoom-in",
        dataAosDelay: 300
      }
    ],
    reverse: true,
    textAos: "fade-left"
  }
];

function BackgroundBlob({ className }) {
  return (
    <div
      aria-hidden="true"
      className={`absolute h-80 w-80 rounded-full bg-aquamesh-300/30 blur-3xl ${className}`}
    />
  );
}

export default function ProductsSection() {
  return (
    <SectionShell
      id="products"
      eyebrow="Products"
      title="Our Solutions"
      description="A connected hardware and software stack designed to capture better water data from field deployment through analysis."
      className="relative"
      containerClassName="max-w-5xl"
    >
      <BackgroundBlob className="-left-20 top-12" />
      <BackgroundBlob className="-right-24 top-1/2 h-96 w-96" />
      <div className="relative space-y-8 lg:space-y-10">
        {products.map((product) => (
          <ProductFeature
            key={product.title}
            product={{ ...product, imageSrc: imageAssetHref(product.imageSrc) }}
          />
        ))}
      </div>
    </SectionShell>
  );
}
