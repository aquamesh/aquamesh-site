export const subnavItems = [
  { href: "#overview", label: "Overview" },
  { href: "#inside", label: "Inside the Benchtop" },
  { href: "#specs", label: "Specifications" },
  { href: "#faq", label: "FAQ" }
];

export const heroStats = [
  { value: "20+", label: "optical parameters", icon: "fa-solid fa-eye" },
  { value: "190-850 nm", label: "optical range", icon: "fa-solid fa-wave-square" },
  { value: "USB-C", label: "direct connection", icon: "fa-solid fa-plug" },
  { value: "Benchtop", label: "lab form factor", icon: "fa-solid fa-flask-vial" }
];

export const storyPanels = [
  {
    index: "01 / Lab-Grade Sensing",
    title: "Bring field-proven optical sensing to the lab bench.",
    copy:
      "Most lab water analysis still relies on reagent kits, single-parameter instruments, or expensive bench spectrometers. AquaLab consolidates multi-parameter optical sensing into one compact benchtop unit that runs the same sensing stack as the field-deployed AquaSpectra probe.",
    points: [
      {
        text: "Measure absorbance, fluorescence, and turbidity parameters from a single sample without switching instruments.",
        icon: "fa-solid fa-wave-square"
      },
      {
        text: "Cross-validate field probe readings with lab-side measurements using the same optical engine.",
        icon: "fa-solid fa-flask"
      },
      {
        text: "Reduce reagent waste and turnaround time compared to traditional wet-chemistry methods.",
        icon: "fa-solid fa-droplet"
      }
    ],
    mediaClassName: "bench-story-media",
    imageSrc: "bench_front_trans.png",
    imageAlt: "AquaLab benchtop front view",
    badgeTitle: "Same optics, lab-ready form factor",
    badgeCopy: "Field-proven sensing technology adapted for the tabletop."
  },
  {
    index: "02 / Seamless Data Continuity",
    reverse: true,
    title: "Bridge the gap between field and lab with one data format.",
    copy:
      "When field probes and lab instruments speak different data languages, reconciliation becomes a manual chore. AquaLab produces results in the same format as the AquaSpectra probe, making field-to-lab comparison straightforward.",
    points: [
      {
        text: "Compare grab-sample results directly against in-situ probe data without format conversion.",
        icon: "fa-solid fa-tower-broadcast"
      },
      {
        text: "Feed lab results into AquaView alongside field telemetry for unified monitoring dashboards.",
        icon: "fa-solid fa-diagram-project"
      },
      {
        text: "Use consistent calibration references across field and lab to maintain data confidence.",
        icon: "fa-solid fa-clipboard-check"
      }
    ],
    mediaClassName: "bench-story-media bench-story-media--terrain",
    imageSrc: "bench_top_angle_trans.png",
    imageAlt: "AquaLab benchtop top angle view",
    badgeTitle: "Field-to-lab continuity",
    badgeCopy:
      "Designed as part of the AquaMesh ecosystem, not a standalone lab instrument."
  },
  {
    index: "03 / Simple Operation",
    title: "Plug in, drop a sample, and read results in seconds.",
    copy:
      "Complex lab spectrometers require training, warm-up routines, and careful sample preparation. AquaLab is designed for direct operation — connect via USB-C, place a sample in the cuvette holder, and get multi-parameter results immediately.",
    points: [
      {
        text: "USB-C connectivity means no external power supplies, serial adapters, or driver installs.",
        icon: "fa-solid fa-plug"
      },
      {
        text: "Open cuvette design accepts standard sample containers for quick measurements.",
        icon: "fa-solid fa-vial"
      },
      {
        text: "Results stream directly to AquaView or export as CSV for existing lab workflows.",
        icon: "fa-solid fa-clock"
      }
    ],
    mediaClassName: "bench-story-media",
    imageSrc: "bench_back_trans.png",
    imageAlt: "AquaLab benchtop back panel",
    badgeTitle: "Minimal training required",
    badgeCopy:
      "Simple enough for field technicians to run lab-side QA checks between deployments."
  }
];

export const specs = [
  {
    label: "Sensing Modes",
    value: "UV/VIS spectrometer with 12-parameter LED excitation array, fluorometer, and nephelometric turbidity."
  },
  {
    label: "Detection Range",
    value: "190-440 nm absorbance and 340-850 nm fluorescence."
  },
  {
    label: "Parameters",
    value:
      "Nitrate, TOC, fDOM, chlorophyll, turbidity, UV254, SAC254, TLF, RWT, CDOM, HLF, phycocyanin, phycoerythrin, FI, temperature, and additional optical indicators."
  },
  {
    label: "Sampling",
    value: "Configurable sampling rate with serial sampling trigger."
  },
  {
    label: "Connectivity",
    value: "USB-C direct connection for data and power."
  },
  {
    label: "Power",
    value: "USB-C powered — no external supply required."
  },
  {
    label: "Form Factor",
    value: "Compact benchtop enclosure with open cuvette holder for lab tabletop use."
  },
  {
    label: "Enclosure",
    value: "Anodized aluminum housing. Designed for indoor laboratory environments."
  },
  {
    label: "Sample Interface",
    value: "Open-top cuvette holder with absorbance and fluorescence measurement channels."
  },
  {
    label: "Instruments",
    value: "Digital temperature sensor (\u00b10.5\u00b0C), UV/VIS spectrometer, 12-parameter LED array, fluorometer, nephelometer."
  }
];

export const specHighlights = [
  {
    title: "Best for",
    body:
      "AquaLab is ideal when teams need lab-side verification of field data, quick grab-sample analysis, or a compact multi-parameter instrument that doesn't require wet-chemistry reagents."
  },
  {
    title: "Best paired with",
    items: [
      "AquaSpectra for cross-referencing field and lab measurements.",
      "AquaLink for pulling field data into the same workflow.",
      "AquaView for unified dashboards across field and lab data."
    ]
  }
];

export const faqs = [
  {
    id: "benchFaqOne",
    question: "What does AquaLab measure?",
    answer:
      "AquaLab uses the same optical sensing engine as the AquaSpectra probe, covering absorbance, fluorescence, and turbidity-driven parameters including nitrate, TOC, chlorophyll, fDOM, UV254, and related indicators — all from a benchtop form factor.",
    expanded: true
  },
  {
    id: "benchFaqTwo",
    question: "How does it connect?",
    answer:
      "AquaLab connects via USB-C for both power and data. No external power supply or serial adapter is needed. Results stream directly to a connected computer running AquaView or can be exported as CSV."
  },
  {
    id: "benchFaqThree",
    question: "Can I compare lab results with field probe data?",
    answer:
      "Yes. AquaLab produces data in the same format and uses the same optical engine as the AquaSpectra probe, making field-to-lab cross-validation straightforward within the AquaView platform."
  },
  {
    id: "benchFaqFour",
    question: "Where does it fit in the AquaMesh platform?",
    answer:
      "AquaLab serves as the lab-side complement to the field-deployed AquaSpectra probe. It pairs with AquaView for data visualization and analysis, and works alongside AquaLink and AquaSpectra for programs that need both continuous field monitoring and lab-side verification."
  }
];
