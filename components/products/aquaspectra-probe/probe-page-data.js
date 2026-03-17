export const subnavItems = [
  { href: "#overview", label: "Overview" },
  { href: "#technology", label: "Technology" },
  { href: "#selling-points", label: "Key Advantages" },
  { href: "#inside", label: "Inside the Probe" },
  { href: "#applications", label: "Applications" },
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

export const proofCards = [
  {
    label: "Materials",
    value: "Stainless Steel",
    copy: "A more premium, corrosion-resistant look and feel for long deployments."
  },
  {
    label: "Coverage",
    value: "Fluorescence + Absorbance",
    copy: "Broad optical coverage without switching between separate instruments."
  },
  {
    label: "Deployment",
    value: "Autonomous",
    copy: "Scheduled or triggered sampling for changing field conditions."
  },
  {
    label: "System Fit",
    value: "AquaMesh Ready",
    copy: "Built to pair with telemetry, logging, and downstream dashboards."
  }
];

export const sellingPoints = [
  {
    icon: "fa-solid fa-shield-halved",
    title: "Stainless steel build",
    copy:
      "The metal body gives the probe a cleaner premium finish while supporting corrosion-resistant field deployment."
  },
  {
    icon: "fa-solid fa-wave-square",
    title: "Broad optical coverage",
    copy:
      "A miniaturized spectrometer captures full spectral curves across UV and visible wavelengths — not just single-point readings — so you can resolve overlapping analytes and correct for interferences in real time. Built-in compensation for temperature, ambient light, turbidity, and inner filter effects keeps readings accurate across changing conditions.",
    delay: 60
  },
  {
    icon: "fa-solid fa-droplet",
    title: "Multi-parameter sensing",
    copy:
      "One probe replaces multiple single-parameter sensors: nitrate, UV254, TOC, chlorophyll, fDOM, turbidity, RWT, CDOM, and more from a single deployment point — fewer devices in the water, lower total cost of ownership.",
    delay: 120
  },
  {
    icon: "fa-solid fa-tower-broadcast",
    title: "Hub-ready telemetry",
    copy:
      "RS485 connectivity feeds readings to the AquaLink hub, which handles LoRa, LTE, and WiFi uplinks into the broader AquaMesh system.",
    delay: 180
  },
  {
    icon: "fa-solid fa-bolt-lightning",
    title: "Event-aware sampling",
    copy:
      "Trigger high-frequency measurements around storm pulses, discharge events, and tidal shifts — then drop back to interval logging when conditions stabilize.",
    delay: 240
  },
  {
    icon: "fa-solid fa-broom",
    title: "Active anti-fouling system",
    copy:
      "A built-in servo wiper clears the optical window on schedule, while UV-C LEDs inhibit biological growth between readings. The onboard ultrawide camera enables remote site monitoring so you can verify conditions without a field visit.",
    delay: 300
  },
  {
    icon: "fa-solid fa-rotate",
    title: "Over-the-air updates",
    copy:
      "The first spectral sensor probe to support OTA firmware updates. New parameters, AI/ML features, and algorithm improvements deploy to existing hardware — so your investment gets better over time, not obsolete.",
    delay: 360
  }
];

export const storyPanels = [
  {
    index: "01 / Stainless Field Body",
    title: "A housing that looks serious because it is serious.",
    copy:
      "Stainless steel changes the page immediately: the hardware reads as durable, premium, and deployment-ready before the viewer even gets into the spec table.",
    points: [
      "Corrosion-resistant exterior designed for long-duration monitoring environments.",
      "Depth rated to 100 m for submerged or splash-prone field conditions.",
      "Compact cylindrical profile (129 mm W x 148 mm H) that stays easy to mount, move, and service."
    ],
    mediaClassName: "probe-story-media probe-story-media--splash",
    imageSrc: "full_probe_shot.png",
    imageAlt: "AquaSpectra full probe body",
    badgeTitle: "Premium hardware language",
    badgeCopy:
      "Cleaner industrial design for a product that lives in tough water environments."
  },
  {
    index: "02 / Optical Stack",
    title: "See more of the water column without instrument sprawl.",
    copy:
      "The dual-mode optical architecture is designed to follow chemistry shifts with one deployed probe instead of asking operators to combine separate fluorescence, absorbance, and turbidity tools.",
    points: [
      "Absorbance coverage for nitrate, TOC, UV254, RWT, and related optical signatures.",
      "Fluorescence support for chlorophyll, fDOM, TLF, CDOM, and biologically relevant changes.",
      "Turbidity and multi-parameter readings from the same compact deployment footprint."
    ],
    mediaClassName: "probe-story-media",
    imageSrc: "probe_head_transparent.png",
    imageAlt: "AquaSpectra optical module render",
    badgeTitle: "One deployment, wider chemistry coverage",
    badgeCopy: "Measure more with fewer devices in the water."
  },
  {
    index: "03 / AquaMesh System Fit",
    title: "More valuable when it plugs into the rest of AquaMesh.",
    copy:
      "The probe creates the signal, AquaLink moves it, and the rest of the AquaMesh stack turns that signal into alerts, historical context, and day-to-day operational visibility.",
    points: [
      "Connect to AquaLink via RS485 for hub-based LoRa, LTE, and WiFi telemetry across distributed sites.",
      "Use AquaLog for field-side verification and spot checks during service visits.",
      "Push readings into AquaView for live monitoring, alerts, and analysis workflows."
    ],
    mediaClassName: "probe-story-media probe-story-media--terrain",
    imageSrc: "probelanding_fully_clean.png",
    imageAlt: "AquaSpectra deployment ecosystem",
    badgeTitle: "Probe-to-platform continuity",
    badgeCopy:
      "Designed as part of a deployable water intelligence system, not an isolated sensor."
  },
  {
    index: "04 / Deployment Longevity",
    title: "Stay deployed longer with less field maintenance.",
    copy:
      "The biggest cost in continuous monitoring isn't the hardware — it's the truck rolls. AquaSpectra's active anti-fouling system is designed to reduce how often you need to be on-site.",
    points: [
      "Servo wiper clears the optical window on a configurable schedule to maintain measurement integrity.",
      "UV-C LEDs inhibit biofilm and algal growth on sensing surfaces between wiper cycles.",
      "Combined with the stainless housing, the probe is built for weeks-long autonomous deployments in fouling-prone environments."
    ],
    mediaClassName: "probe-story-media",
    imageSrc: "full_probe_shot.png",
    imageAlt: "AquaSpectra anti-fouling system",
    badgeTitle: "Reduce field visits",
    badgeCopy:
      "Active cleaning systems keep the optical path clear so you spend less time on-site."
  }
];

export const useCases = [
  {
    icon: "fa-solid fa-water",
    title: "Watershed Research",
    copy:
      "Capture high-frequency chemistry shifts across runoff, nutrient loading, and seasonal biological changes without repeated manual sampling trips."
  },
  {
    icon: "fa-solid fa-cloud-rain",
    title: "Stormwater Networks",
    copy:
      "Trigger measurements around rainfall and discharge events to see the signal when pollution dynamics are actually changing.",
    delay: 100
  },
  {
    icon: "fa-solid fa-industry",
    title: "Infrastructure Monitoring",
    copy:
      "Deploy at assets where remote awareness matters, then push the readings into a system operators can review without standing onsite.",
    delay: 200
  },
  {
    icon: "fa-solid fa-fish-fins",
    title: "Aquaculture And Coastal Work",
    copy:
      "Track optical indicators tied to biological activity, water clarity, and changing environmental conditions across exposed or distributed sites.",
    delay: 300
  }
];

export const applicationSlides = [
  {
    title: "Freshwater",
    copy: "Monitor rivers, lakes, and reservoirs for nutrient loading, turbidity shifts, and seasonal chemistry changes with continuous autonomous sampling.",
    image: "https://placehold.co/600x400",
    imageAlt: "Freshwater monitoring environment"
  },
  {
    title: "Oceanwater",
    copy: "Track coastal and open-water optical indicators tied to salinity, chlorophyll, dissolved organics, and biological activity across exposed marine sites.",
    image: "https://placehold.co/600x400",
    imageAlt: "Ocean monitoring environment"
  },
  {
    title: "Industrial",
    copy: "Deploy at discharge points, treatment facilities, and process water systems where real-time optical readings replace manual grab-sampling programs.",
    image: "https://placehold.co/600x400",
    imageAlt: "Industrial monitoring environment"
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
      "AquaSpectra is strongest when the job requires one probe that can stay deployed, span multiple optical modes, and feed a remote monitoring workflow without extra field hardware."
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

export const comparisonPoints = {
  spectrometer: [
    "Full spectral scan across UV/VIS — resolve overlapping analytes and correct for interferences in real time.",
    "One optical engine covers 16+ parameters — fewer devices in the water, less maintenance.",
    "Spectral correction for turbidity, matrix effects, and organic matter interference built into the measurement.",
    "Future parameters via firmware — new analytes from existing hardware as algorithms improve."
  ],
  photodiodes: [
    "Fixed wavelengths — each diode sees one narrow band, can't distinguish overlapping absorbers.",
    "Need separate sensors per parameter — more hardware, more fouling surfaces, more cost.",
    "No spectral context — can't compensate for matrix interference without adding more sensors.",
    "Locked to installed wavelengths — new parameters require new hardware."
  ]
};
