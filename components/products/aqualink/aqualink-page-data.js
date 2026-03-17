export const aqualinkHeroStats = [
  {
    value: "5 Radios",
    label: "Multi-network ready",
    icon: "fa-solid fa-tower-broadcast"
  },
  {
    value: "4x RS485",
    label: "Any-sensor interface",
    icon: "fa-solid fa-plug"
  },
  {
    value: "27 dBm Mesh",
    label: "Up to 4 km range",
    icon: "fa-solid fa-signal"
  },
  {
    value: "Minutes",
    label: "Zero-config deploy",
    icon: "fa-solid fa-clock"
  }
]

export const aqualinkSubnavItems = [
  { href: "#overview", label: "Overview" },
  { href: "#deployment", label: "Deployment" },
  { href: "#specs", label: "Specs" }
]

export const aqualinkOverviewChecklist = [
  "Starlink Direct to Cell provides affordable connectivity backhaul virtually anywhere.",
  "Nearby nodes create their own 2.4 GHz mesh network for enhanced security and easy scaling.",
  "Works with AquaSpectra plus third-party pH, TSS, DO, and flow sensors via 4x RS485.",
  "Configurable in the factory or remotely — deploy in minutes, not weeks."
]

export const aqualinkPills = [
  "Starlink ready",
  "Solar powered",
  "Auto-mesh",
  "Any sensor"
]

export const aqualinkSellingPoints = [
  {
    title: "Connectivity anywhere",
    copy: "Starlink Direct to Cell, LoRaMESH (27 dBm, up to 4 km), LTE, WiFi, and Ethernet — pick the backhaul that fits or let the hub failover automatically.",
    icon: "fa-solid fa-satellite-dish",
    delay: 0
  },
  {
    title: "Works with any sensor",
    copy: "Four RS485 ports and four 4-wire connections let you combine AquaSpectra with third-party pH, TSS, DO, flow, and other instruments on one hub.",
    icon: "fa-solid fa-plug",
    delay: 90
  },
  {
    title: "Deploy in minutes",
    copy: "No technical knowledge needed. Power on, connect sensors, and nearby nodes auto-mesh into a secure 2.4 GHz network. Configure in the factory or remotely.",
    icon: "fa-solid fa-bolt",
    delay: 180
  }
]

export const aqualinkDeploymentFlow = [
  { icon: "fa-solid fa-microchip", label: "AquaSpectra sensors" },
  { icon: "fa-solid fa-tower-broadcast", label: "AquaLink mesh hub" },
  { icon: "fa-solid fa-satellite-dish", label: "Starlink / LoRa / LTE / WiFi" },
  { icon: "fa-solid fa-chart-line", label: "AquaView platform" }
]

export const aqualinkDeploymentCards = [
  {
    step: "Mount anywhere",
    icon: "fa-solid fa-location-dot",
    detail: "Buoys, poles, or tripods — the hub adapts to any site layout."
  },
  {
    step: "Auto-mesh",
    icon: "fa-solid fa-circle-nodes",
    detail: "Nearby nodes discover each other and form a secure 2.4 GHz mesh automatically."
  },
  {
    step: "Multi-uplink",
    icon: "fa-solid fa-arrows-up-to-line",
    detail: "Starlink, LoRa, LTE, WiFi, or Ethernet — pick the backhaul that fits or let it failover."
  },
  {
    step: "Stay running",
    icon: "fa-solid fa-solar-panel",
    detail: "Solar-compatible power and low-touch operation for long-duration field programs."
  }
]

export const aqualinkSpecItems = [
  {
    label: "Dimensions",
    value: "Sealed metal or plastic enclosure, 200 x 200 x 50 mm"
  },
  {
    label: "Connectivity",
    value: "Starlink Direct to Cell, Ethernet (10/100), LTE CAT-1, Wi-Fi 2.4 GHz, LoRaMESH 27 dBm (up to 4 km), GNSS"
  },
  {
    label: "Sensor Interface",
    value: "4x RS485 half-duplex, 4x 4-wire cable connections"
  },
  {
    label: "Battery",
    value: "4S 12.8V LiFePO4 external battery input (optional)"
  },
  {
    label: "Power",
    value: "9V to 28V @ 1A DC input, solar compatible"
  },
  {
    label: "Data",
    value: "Onboard MicroSD logging"
  },
  {
    label: "Ports",
    value: "2-terminal DC input, 2-terminal battery input, RJ45 Ethernet, LTE antenna SMA"
  }
]

export const aqualinkSpecHighlights = [
  {
    title: "Deployment readout",
    body:
      "AquaLink is strongest when a monitoring program needs one field hub that can extend coverage, manage autonomous power, and keep remote sensor traffic moving into an operator-facing system."
  },
  {
    title: "Best paired with",
    items: [
      "AquaSpectra for in-water sensing across distributed sites.",
      "AquaView for live telemetry visibility and monitoring workflows.",
      "Buoy, pole, or tripod mounting based on site conditions."
    ]
  }
]
