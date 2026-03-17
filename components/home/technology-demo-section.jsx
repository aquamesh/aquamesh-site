import SectionShell from "../ui/section-shell";

const steps = [
  {
    step: 1,
    icon: "fas fa-microscope",
    title: "Multi-Parameter Sensing",
    description:
      "Fluorescence, absorbance, and turbidity measurements in a single compact device."
  },
  {
    step: 2,
    icon: "fas fa-network-wired",
    title: "Mesh Networking",
    description:
      "LoRa-based communication between distributed field sensors with self-healing topology."
  },
  {
    step: 3,
    icon: "fas fa-mobile-alt",
    title: "Cloud Platform",
    description:
      "Real-time monitoring, alerting, and deployment management through an intuitive web application."
  },
  {
    step: 4,
    icon: "fas fa-brain",
    title: "AI-Powered Analytics",
    description:
      "Predictive analysis for trend detection and intervention planning."
  }
];

export default function TechnologyDemoSection() {
  return (
    <SectionShell
      id="tech-combined"
      eyebrow="Technology"
      title="How It Works"
      description="A connected hardware and software stack — from sensor to insight."
    >
      {/* Step cards grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
        {steps.map((step) => (
          <div
            key={step.step}
            className="relative rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm"
          >
            {/* Icon with step number badge */}
            <div className="flex justify-center">
              <span className="relative inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-aquamesh-500 text-2xl text-white">
                <i className={step.icon} />
                <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-aquamesh-700 text-xs font-bold text-white ring-2 ring-white">
                  {step.step}
                </span>
              </span>
            </div>
            {/* Title + description */}
            <h3 className="mt-4 text-lg font-semibold text-aquamesh-700">
              {step.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              {step.description}
            </p>
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
