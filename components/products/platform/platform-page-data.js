export const platformHeroStats = [
  {
    value: "Predictive AI",
    label: "Early anomaly detection",
    icon: "fa-solid fa-brain"
  },
  {
    value: "99.99% Uptime",
    label: "Cloud-hosted reliability",
    icon: "fa-solid fa-server"
  },
  {
    value: "SCADA Ready",
    label: "Unified protocol view",
    icon: "fa-solid fa-gauge-high"
  },
  {
    value: "Web / API / Mobile",
    label: "Access anywhere",
    icon: "fa-solid fa-mobile-screen-button"
  }
];

export const platformSubnavItems = [
  { href: "#overview", label: "Overview" },
  { href: "#capabilities", label: "Capabilities" },
  { href: "#product-tour", label: "Product Tour" }
];

export const platformSellingPoints = [
  {
    title: "Predictive, not reactive",
    copy:
      "AI models detect parameter shifts before they affect process stability.",
    icon: "fa-solid fa-brain",
    delay: 0
  },
  {
    title: "Connects to everything",
    copy:
      "RS-485, Modbus, SCADA, and AWS IoT in one unified view.",
    icon: "fa-solid fa-plug-circle-check",
    delay: 80
  },
  {
    title: "Compliance built in",
    copy:
      "Automated reports, audit trails, and maintenance triggers.",
    icon: "fa-solid fa-clipboard-check",
    delay: 160
  }
];

export const platformOverviewChecklist = [
  "Identify trends, quantify cause-and-effect, and get recommended adjustments",
  "Connect RS-485/Modbus instruments and SCADA systems into one operational view",
  "Generate automated compliance reports and maintenance triggers",
  "Monitor all connected sensors from web, API, or mobile — anywhere, any device"
];

export const platformCapabilities = [
  {
    title: "Predictive analytics",
    description:
      "Surface anomalies and forecast trends before they reach compliance thresholds.",
    icon: "fa-solid fa-brain"
  },
  {
    title: "Live dashboards",
    description:
      "Real-time sensor status, alarm thresholds, and multi-site views in one place.",
    icon: "fa-solid fa-chart-line"
  },
  {
    title: "Easy integration",
    description:
      "RS-485, Modbus, SCADA, and AWS IoT — one platform, no custom middleware.",
    icon: "fa-solid fa-plug-circle-check"
  },
  {
    title: "Scalable & secure",
    description:
      "Multi-site management and encrypted storage on AWS with 99.99% uptime.",
    icon: "fa-solid fa-shield-halved"
  }
];

export const platformPills = [
  "Interactive map",
  "Predictive analytics",
  "Custom reporting",
  "Live dashboards",
  "Compliance tracking"
];

export const platformTourCards = [
  {
    index: "01 / AI Insights",
    title: "AI automatically surfaces trends and anomalies across parameters.",
    copy: "AquaView's AI engine continuously analyzes incoming telemetry to identify parameter shifts, correlations, and anomalies — delivering actionable insights without manual data review.",
    reverse: false,
    imageSrc: "platform/ai_insights.png",
    imageAlt: "AI Insights panel showing Nitrate, COD, and CDOM parameter analysis",
    points: [
      { text: "Automated trend detection across all connected parameters", icon: "fa-solid fa-chart-line" },
      { text: "Severity-ranked alerts for critical, warning, and informational anomalies", icon: "fa-solid fa-triangle-exclamation" },
      { text: "Plain-language explanations of what changed and why it matters", icon: "fa-solid fa-comment-dots" }
    ]
  },
  {
    index: "02 / Predictive Analytics",
    title: "Forecast parameter trends before they reach compliance thresholds.",
    copy: "AI models trained on your site's historical telemetry project parameter values hours and days ahead — giving operators early warning of turbidity spikes, dissolved-oxygen drops, or pH drift.",
    reverse: true,
    imageSrc: "platform/data_predictions.png",
    imageAlt: "Chlorophyll time series chart with measured data and future predictions overlay",
    points: [
      { text: "Time series forecasting with confidence intervals for key parameters", icon: "fa-solid fa-wave-square" },
      { text: "Early warning of threshold exceedances before they happen", icon: "fa-solid fa-bell" },
      { text: "Models improve continuously as more site data is collected", icon: "fa-solid fa-brain" }
    ]
  },
  {
    index: "03 / Natural Language Queries",
    title: "Ask your data questions in plain English.",
    copy: "AquaView Analytics lets operators query their monitoring data using natural language — no SQL, no report builders. Ask a question and get an answer with supporting context.",
    reverse: false,
    imageSrc: "platform/ask_questions.png",
    imageAlt: "Chat interface where users ask natural language questions to AquaView Analytics",
    points: [
      { text: "Natural language interface — no technical query syntax required", icon: "fa-solid fa-message" },
      { text: "Instant answers with auto-generated charts and data summaries", icon: "fa-solid fa-chart-bar" },
      { text: "Context-aware responses grounded in your site's actual telemetry", icon: "fa-solid fa-database" }
    ]
  },
  {
    index: "04 / Automated Reports",
    title: "Generate compliance reports and anomaly alerts automatically.",
    copy: "Scheduled water quality reports with executive summaries, parameter statistics, and anomaly flags — ready for stakeholders and regulatory review without manual assembly.",
    reverse: true,
    imageSrc: "platform/reports_summary.png",
    imageAlt: "Water Quality Report with executive summary and parameter statistics table",
    points: [
      { text: "Scheduled report generation with executive summaries and parameter breakdowns", icon: "fa-solid fa-file-lines" },
      { text: "Anomaly flags with severity levels and recommended follow-up actions", icon: "fa-solid fa-flag" },
      { text: "Export as PDF or share directly with compliance teams and stakeholders", icon: "fa-solid fa-share-from-square" }
    ]
  }
];
