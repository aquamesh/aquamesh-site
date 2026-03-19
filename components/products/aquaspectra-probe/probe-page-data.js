export const subnavItems = [
  { href: "#overview", label: "Overview" },
  { href: "#inside", label: "Inside the Probe" },
  { href: "#case-study", label: "Case Study" },
  { href: "#specs", label: "Specifications" },
  { href: "#faq", label: "FAQ" }
];

export const heroStats = [
  { value: "20+", label: "optical parameters", icon: "fa-solid fa-eye" },
  { value: "190-850 nm", label: "optical range", icon: "fa-solid fa-wave-square" },
  { value: "100 m", label: "depth rated", icon: "fa-solid fa-water" },
  { value: "RS485", label: "wired telemetry", icon: "fa-solid fa-plug" }
];

export const storyPanels = [
  {
    index: "01 / Multi-Parameter Sensing",
    title: "Replace sensor stacks with one clearer picture of the water.",
    copy:
      "Most monitoring setups force teams to mix separate sensors or keep returning for manual sampling. AquaSpectra reduces that sprawl by pulling more of the chemistry signal into one deployable instrument.",
    points: [
      {
        text: "See multiple water-quality changes from one deployment instead of stitching together separate single-parameter sensors.",
        icon: "fa-solid fa-wave-square"
      },
      {
        text: "Catch nutrient, organic, and biological shifts earlier without waiting on repeated grab samples.",
        icon: "fa-solid fa-flask"
      },
      {
        text: "Reduce hardware in the water, simplify installs, and get a faster read on what is actually changing.",
        icon: "fa-solid fa-droplet"
      }
    ],
    mediaClassName: "probe-story-media",
    imageSrc: "full_probe_shot.png",
    imageAlt: "AquaSpectra probe",
    badgeTitle: "One deployment, wider chemistry coverage",
    badgeCopy: "Measure more with fewer devices in the water."
  },
  {
    index: "02 / Easy Scalability",
    reverse: true,
    title: "Scale programs without rebuilding the monitoring stack each time.",
    copy:
      "A lot of water monitoring breaks down after the first pilot because every new site becomes a custom integration and service problem. AquaSpectra is designed to make expansion look repeatable instead of one-off.",
    points: [
      {
        text: "Use the same core sensor and telemetry approach whether you are deploying at one site or across a distributed network.",
        icon: "fa-solid fa-tower-broadcast"
      },
      {
        text: "Expand into freshwater, coastal, or industrial locations without changing the operating model each time.",
        icon: "fa-solid fa-diagram-project"
      },
      {
        text: "Turn new deployments into extensions of the same workflow instead of fresh hardware and data silos.",
        icon: "fa-solid fa-clipboard-check"
      }
    ],
    mediaClassName: "probe-story-media probe-story-media--terrain",
    imageSrc: "full_probe_shot.png",
    imageAlt: "AquaSpectra probe",
    badgeTitle: "Probe-to-platform continuity",
    badgeCopy:
      "Designed as part of a deployable water intelligence system, not an isolated sensor."
  },
  {
    index: "03 / Low Maintenance",
    title: "Spend less time reacting to fouling and unnecessary field visits.",
    copy:
      "Existing sensors often lose trust when fouling builds up and nobody knows until the next site visit. AquaSpectra is built to keep the sensing surfaces cleaner and give operators more visibility before a bad reading becomes a field problem.",
    points: [
      {
        text: "Remote camera visibility helps teams confirm fouling and site conditions before rolling a truck.",
        icon: "fa-solid fa-camera"
      },
      {
        text: "UV-C LEDs, anti-biofouling protection, and the wiper work together to protect data quality between service visits.",
        icon: "fa-solid fa-rotate"
      },
      {
        text: "Fewer manual cleanings and fewer surprise maintenance trips make continuous monitoring more practical.",
        icon: "fa-solid fa-clock"
      }
    ],
    mediaClassName: "probe-story-media",
    imageSrc: "full_probe_shot.png",
    imageAlt: "AquaSpectra probe",
    badgeTitle: "Reduce field visits",
    badgeCopy:
      "Active cleaning systems keep the optical path clear so you spend less time on-site."
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
    value: "RS485 half-duplex serial interface (115200 baud), 4-wire cable (A, B, PWR, GND)."
  },
  {
    label: "Battery",
    value: "Internal 3,200 mAh 3S 11.1V Li-Ion battery pack."
  },
  {
    label: "Power",
    value: "9V to 28V @ 500 mA DC input."
  },
  {
    label: "Form Factor",
    value: "129 mm width x 148 mm height."
  },
  {
    label: "Enclosure",
    value: "Stainless Steel or Titanium (customizable), sapphire lenses. Waterproof and corrosion-resistant for field monitoring conditions."
  },
  {
    label: "Instruments",
    value: "Digital temperature sensor (\u00b10.5\u00b0C), 6x 275nm UV anti-fouling LEDs, built-in servo wiper, ultrawide camera sensor."
  }
];

export const specHighlights = [
  {
    title: "Deployment readout",
    body:
      "AquaSpectra is strongest when current monitoring feels fragmented, maintenance-heavy, or hard to scale and the job needs one sensor that simplifies deployment while improving visibility."
  },
  {
    title: "Best paired with",
    items: [
      "AquaLink for remote telemetry and site-to-site communications.",
      "AquaLog for field-side spot checks and service workflows.",
      "AquaView for live monitoring, alerts, and analysis."
    ]
  }
];

export const faqs = [
  {
    id: "faqOne",
    question: "What does AquaSpectra measure?",
    answer:
      "AquaSpectra is positioned around optical water quality monitoring, including absorbance, fluorescence, and turbidity-driven parameters such as nitrate, TOC, chlorophyll, fDOM, UV254, and related indicators.",
    expanded: true
  },
  {
    id: "faqTwo",
    question: "Is it meant for autonomous field deployment?",
    answer:
      "Yes. AquaSpectra is framed around field-ready deployment with depth rating to 100 m, configurable sampling, rechargeable power, and RS485 connectivity to the AquaLink hub for remote or distributed monitoring workflows."
  },
  {
    id: "faqThree",
    question: "How do operators access the data?",
    answer:
      "Data flows from the probe via RS485 to the AquaLink hub, which handles local MicroSD logging and upstream telemetry. The broader AquaMesh stack positions AquaSpectra alongside AquaLink, AquaLog, and AquaView for remote monitoring and operational visibility."
  },
  {
    id: "faqFour",
    question: "What does it pair with in the AquaMesh platform?",
    answer:
      "AquaSpectra is designed to work as a sensing node within the wider AquaMesh stack, pairing with AquaLink for telemetry, AquaLog for field workflows, and AquaView for live monitoring, alerts, and analytics."
  }
];
