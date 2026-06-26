export const navItems = [
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/process", label: "Process" },
  { href: "/about", label: "About" },
];

export const pipeline = [
  ["discovery", "scope · risk · north star"],
  ["strategy", "architecture · roadmap"],
  ["design", "ux · interface · systems"],
  ["engineering", "ship · iterate · harden"],
  ["launch", "rollout · observability"],
  ["growth", "scale · evolve · own"],
];

export const metrics = [
  { label: "Time to MVP", value: "6–10 wks" },
  { label: "Active engagements", value: "12+" },
  { label: "Industries shipped", value: "8" },
  { label: "Avg. NPS", value: "72" },
];

export const industries = [
  "Healthcare",
  "Insurance SaaS",
  "Real Estate",
  "E-commerce",
  "AI / ML",
  "Sales Intel",
  "Events",
  "Marketing",
];

export const partnerBenefits = [
  {
    title: "Faster than hiring",
    body: "An experienced product team on day one — design, engineering, and PM aligned from the first sprint.",
  },
  {
    title: "Startup-focused",
    body: "We've shipped MVPs, SaaS, and AI products under real founder constraints — speed, cost, and clarity.",
  },
  {
    title: "End-to-end execution",
    body: "Discovery to launch, infra to interface. One partner, fewer handoffs, less risk.",
  },
  {
    title: "Long-term support",
    body: "We don't disappear after launch. We harden, scale, and evolve the product with you.",
  },
  {
    title: "Product-first mindset",
    body: "We optimise for user value and business outcomes — not lines of code.",
  },
  {
    title: "Modern stack, no debt",
    body: "Type-safe, observable, and built to be handed over cleanly when the time comes.",
  },
];

export const serviceGroups = [
  {
    number: "01",
    title: "Startup Development",
    intro:
      "Go from idea to shipped product with a senior team that understands speed, risk, and runway.",
    items: [
      ["MVP Development", "A focused first release that proves the thesis and unlocks the next round of investment or revenue."],
      ["SaaS Platforms", "Multi-tenant, billing-ready, observable platforms built on modern, type-safe stacks."],
      ["AI Products", "RAG, agents, real-time speech, vision — applied where it makes the product genuinely better."],
      ["Mobile Apps", "Cross-platform mobile products with web parity, push, and offline-first experiences."],
    ],
  },
  {
    number: "02",
    title: "Dedicated Product Teams",
    intro:
      "An embedded product engineering pod — designers, engineers, and PMs — that operates as your team.",
    items: [
      ["Team Augmentation", "Plug senior product engineers into your existing team without the months-long hiring cycle."],
      ["Product Development", "Roadmap, design, build, and ship — owned end-to-end with weekly delivery cycles."],
      ["Feature Delivery", "Discrete, well-scoped feature builds against a tight definition of done."],
      ["Scaling Support", "Performance, infrastructure, and reliability work as your product hits its growth phase."],
    ],
  },
  {
    number: "03",
    title: "Business Solutions",
    intro:
      "Custom software that replaces spreadsheets, generic SaaS, and manual work with tailored systems.",
    items: [
      ["E-commerce Systems", "Storefronts, custom checkout, WhatsApp & social commerce — engineered for conversion."],
      ["CRM Platforms", "Sales, support, and ops CRMs built around your real workflow — not a vendor's template."],
      ["Internal Dashboards", "Analytics, ops, and admin tools that give your team superpowers."],
      ["Workflow Automation", "Email, notifications, integrations, and back-office automation that compounds."],
    ],
  },
];

export const processSteps = [
  {
    number: "01",
    title: "Discovery",
    body: "We dig into the problem, the users, and the constraints. We map risk, define the north star, and identify the smallest valuable surface to ship.",
    outputs: ["Goals & success metrics", "Risk map", "MVP scope", "Engagement model"],
  },
  {
    number: "02",
    title: "Strategy",
    body: "Architecture and roadmap come together. We make the boring-but-critical decisions early — stack, infra, data model, integrations — so engineering can move fast later.",
    outputs: ["System architecture", "Tech stack", "Phased roadmap", "Estimates"],
  },
  {
    number: "03",
    title: "Design",
    body: "Interface and UX systems built for clarity and speed — not decoration. We design in production-grade fidelity from day one.",
    outputs: ["UX flows", "Design system", "Hi-fi prototypes", "Component library"],
  },
  {
    number: "04",
    title: "Development",
    body: "Type-safe, observable, well-tested code shipped in weekly cycles. Demos every Friday. No surprises at the end of the quarter.",
    outputs: ["Weekly releases", "Code review & CI", "Test coverage", "Observability baked in"],
  },
  {
    number: "05",
    title: "Launch",
    body: "Rollout, monitoring, and on-call coverage from day zero. We sweat the launch so the team can sleep.",
    outputs: ["Staged rollout", "Monitoring & alerts", "On-call coverage", "Runbooks"],
  },
  {
    number: "06",
    title: "Growth",
    body: "We iterate, scale, and harden as the business evolves. Most clients keep us on as their long-term engineering partner.",
    outputs: ["Performance work", "Scaling infra", "Feature velocity", "Knowledge transfer"],
  },
];

export const principles = [
  ["Startup-first mindset", "We've felt the runway pressure. We optimise for momentum and learning."],
  ["Product thinking", "Every ticket is a hypothesis. Every release sharpens the product."],
  ["Fast execution", "Weekly cycles, demos every Friday, no quarter-long roadmaps in the dark."],
  ["Modern technologies", "Type-safe TS, modern infra, edge-ready stacks — built to last."],
  ["AI expertise", "From RAG and agents to real-time speech — applied where it actually helps."],
  ["Long-term partnerships", "Most clients keep us on as their de-facto engineering team."],
];

export type Project = {
  slug: string;
  year: string;
  industry: string;
  code: string;
  type: string;
  status: string;
  title: string;
  summary: string;
  stack: string[];
  website?: string;
  previewImage?: string;
  videoEmbedUrl?: string;
  overview?: string;
  built?: string[];
  outcomes?: [string, string][];
};

export const projects: Project[] = [
  {
    slug: "kmaxx",
    year: "2024",
    industry: "Healthcare",
    code: "kmaxx",
    type: "Hospital Management Platform",
    status: "Live",
    title: "Kmaxx",
    summary:
      "Hospital management and showcase platform with a fully custom CMS, doctor profiles, appointment automation, and compliance-focused record publishing.",
    stack: ["Next.js", "Sanity", "PostgreSQL", "EmailJS"],
    website: "https://kmaxx.in/",
    previewImage: "/Kmaxx.png",
    videoEmbedUrl: "https://youtu.be/ClMNEjlztMM?si=96OH3_nNnZF8zHs1",
    overview:
      "A hospital management and showcase platform with a fully custom CMS, doctor profiles, appointment booking, service pages, and patient-facing discovery flows. The platform gives the team control over doctors, departments, content, and lead capture while keeping the public experience fast and premium. Appointment notifications are automatically sent to both patients and doctors via email. It also includes medical bio-waste record management where admins upload daily PDF records, which are publicly accessible for transparency and compliance.",
    built: ["Custom CMS for hospital content", "Doctor profiles and department pages", "Appointment and enquiry workflows", "Automated email notifications to both patient and doctor", "Daily medical bio-waste PDF upload and record management in admin panel", "Public-facing bio-waste record access for compliance transparency", "Responsive marketing and showcase pages"],
    outcomes: [["Appointments", "End-to-end with dual notifications"], ["Compliance records", "Daily PDFs publicly accessible"], ["Experience", "Patient-first"]],
  },
  {
    slug: "insurance-lifecycle-platform",
    year: "2025",
    industry: "Enterprise SaaS",
    code: "insurance-lifecycle-platform",
    type: "Insurance SaaS",
    status: "Confidential",
    title: "Insurance Lifecycle Platform",
    summary:
      "An NDA-protected insurance operations platform automating agent onboarding, OCR-based policy ingestion, reconciliation, and lifecycle management.",
    stack: ["Next.js", "FastAPI", "PostgreSQL", "Redis", "Supabase", "Gemini", "Google Sheets", "WhatsApp APIs"],
    overview:
      "A confidential insurance operations SaaS platform built for an Amritsar-based insurance business. I led backend architecture and direct client communication while shipping a multi-panel system: agent panel for OCR/Gemini-based policy extraction, admin panel for child ID and MIS record management synced with Google Sheets, and a super-admin panel for analytics, reconciliation, and operational controls. The platform also includes automated email and WhatsApp notifications across policy workflows.",
    built: ["Automated agent onboarding and management workflows", "OCR + Gemini policy ingestion pipeline", "Admin panel for child ID and MIS record management with Google Sheets sync", "Automated reconciliation engine to verify broker records against carrier lists", "Super-admin analytics dashboards and role-based operational controls", "Multi-channel communication layer with email and WhatsApp integrations", "End-to-end policy lifecycle automation from intake to servicing"],
    outcomes: [["Manual policy entry time", "−90%"], ["Record comparison time", "−95%"], ["Reconciliation throughput", "500+ records in <3 seconds"]],
  },
  {
    slug: "saaz-creations",
    year: "2024",
    industry: "Retail & Commerce",
    code: "saaz-creations",
    type: "E-commerce Platform",
    status: "Live",
    title: "Saaz Creations",
    summary:
      "A high-conversion e-commerce platform with a business-first admin suite for homepage merchandising, catalogue control, sales operations, and automated customer communication.",
    stack: ["Next.js", "FastAPI", "PostgreSQL", "Redis", "Firebase", "Fast2SMS", "AWS Cloudfront", "Razorpay", "Meilisearch"],
    website: "https://saazcreation.com/",
    overview:
      "A production-grade commerce platform designed for daily retail operations, not just storefront presentation. The admin panel gives non-technical teams full control over homepage sections, featured products, promotional banners, coupons, and sale campaigns. It combines catalogue and inventory workflows, order management, Razorpay-powered payments, and cart/checkout journeys with deep analytics across traffic, products, campaigns, and conversions. Redis and AWS CloudFront improve performance at scale, while WhatsApp powers both marketing automation and order-confirmation messaging.",
    built: ["Full storefront with product discovery, cart, and secure Razorpay checkout", "Admin-managed homepage merchandising (sections, featured products, and dynamic banners)", "Catalogue, inventory, and product data management with search-friendly structure", "Order lifecycle management from placement to fulfilment", "Coupon code system and sale campaign controls for promotional pricing", "Analytics across orders, sales performance, product trends, and campaign effectiveness", "Redis + AWS CloudFront caching layer for faster browsing and checkout performance", "WhatsApp marketing workflows and automated WhatsApp order confirmations"],
    outcomes: [["Merchandising control", "Fully admin-managed"], ["Commerce operations", "End-to-end unified"], ["Customer communication", "Marketing + order updates on WhatsApp"]],
  },
  {
    slug: "audio-flow",
    year: "2025",
    industry: "Artificial Intelligence",
    code: "audio-flow",
    type: "AI Audio Platform",
    status: "In Development",
    title: "Audio-Flow",
    summary:
      "An AI-powered transcription and audio workflow tool — accurate, real-time speech-to-text for creators and professionals.",
    stack: ["Next.js", "Python", "Whisper", "FastAPI"],
    overview:
      "An AI-powered audio processing application under development, functioning as an advanced transcription tool similar to Whisper and Typeless. It leverages modern speech recognition models to provide accurate, real-time audio-to-text workflows.",
    built: ["Real-time audio-to-text conversion", "Streaming transcription pipeline", "Speaker diarization and editing tools", "Workflow-friendly export formats"],
    outcomes: [["Latency", "Real-time"], ["Accuracy", "SOTA models"], ["Target users", "Creators & pros"]],
  },
  {
    slug: "gmaps-scraper",
    year: "2025",
    industry: "Sales Intelligence",
    code: "gmaps-scraper",
    type: "Browser Extension",
    status: "In Development",
    title: "Google Maps Scraping Extension",
    summary:
      "A browser extension for extracting and processing business data from Google Maps for lead generation and location intelligence.",
    stack: ["TypeScript", "Chrome Extension APIs", "React", "Node.js"],
    overview:
      "A browser extension currently under active development designed to efficiently extract and process business data from Google Maps, enabling streamlined lead generation and location intelligence gathering.",
    built: ["Structured business data extraction", "One-click CSV / CRM export", "Configurable filters and geographic scoping", "Built for sales and growth teams"],
    outcomes: [["Workflow", "One-click"], ["Output", "Structured data"], ["Use case", "Lead gen at scale"]],
  },
  {
    slug: "gk-realty",
    year: "2024",
    industry: "Real Estate",
    code: "gk-realty",
    type: "Real Estate Platform",
    status: "Live",
    title: "GK Realty",
    summary:
      "A WordPress-powered real estate website with full admin control over listings, pages, media, and lead flows for day-to-day sales operations.",
    stack: ["WordPress", "PHP", "MySQL", "ACF", "Elementor"],
    website: "https://gkrealty.co/",
    previewImage: "/Gk.png",
    videoEmbedUrl: "https://youtu.be/LoohFfXyK6g",
    overview:
      "A conversion-focused WordPress real estate experience designed for fast listing discovery and direct lead capture. The team gets full backend control to add or update listings, edit property sections, publish new pages, manage media, and optimise SEO metadata without developer dependency.",
    built: ["WordPress CMS with full control over property listings and landing pages", "Custom listing structure with search, filtering, and mobile-first browsing", "Lead capture and buyer-seller enquiry workflows", "Editable page sections, banners, and media via admin panel", "SEO-friendly architecture with controllable metadata and content hierarchy"],
    outcomes: [["Content operations", "Fully admin-managed"], ["Enquiries", "Direct to seller"], ["Go-to-market", "No-dev publishing workflow"]],
  },
  {
    slug: "avasa-real-estate",
    year: "2024",
    industry: "Real Estate",
    code: "avasa-real-estate",
    type: "Luxury Real Estate",
    status: "Live",
    title: "Avasa Real Estate",
    summary:
      "A premium WordPress real estate website built for luxury inventory presentation with fast publishing, flexible content control, and conversion-ready pages.",
    stack: ["WordPress", "PHP", "MySQL", "ACF", "Elementor"],
    website: "https://avasadevelopers.com/",
    previewImage: "/Avasa.png",
    videoEmbedUrl: "https://youtu.be/P2B6LWHtsx4",
    overview:
      "A luxury-focused WordPress website for showcasing residential and commercial estates with rich visual storytelling. Marketing teams can manage pages, project sections, CTAs, galleries, and campaign content directly from the CMS while maintaining a polished premium brand experience.",
    built: ["WordPress CMS with modular sections for project storytelling", "Admin-editable banners, galleries, landing pages, and conversion CTAs", "Luxury property showcase templates with responsive visual layouts", "SEO-ready content structure for organic discoverability", "Performance-conscious media handling for high-quality assets"],
    outcomes: [["Brand presentation", "Premium and consistent"], ["Publishing velocity", "Fast CMS-led updates"], ["Team autonomy", "Non-dev editable website"]],
  },
  {
    slug: "dental-excellence-ludhiana",
    year: "2024",
    industry: "Healthcare",
    code: "dental-excellence-ludhiana",
    type: "Multi-page Practice Website",
    status: "Live",
    title: "Dental Excellence Ludhiana",
    summary:
      "A comprehensive WordPress dental website with complete CMS control over services, doctor profiles, treatment pages, and patient communication content.",
    stack: ["WordPress", "PHP", "MySQL", "ACF", "Elementor"],
    website: "https://dentalexcellenceludhiana.sahilchabra.xyz/",
    overview:
      "A multi-page WordPress practice website built to scale clinic content operations. The team can independently manage service pages, treatment details, before/after media, FAQs, testimonials, and on-page SEO while keeping the patient journey clear across mobile and desktop.",
    built: ["WordPress CMS with reusable templates for treatments and services", "Admin-controlled content blocks for doctor info, FAQs, and testimonials", "Structured multi-page IA for patient education and service discovery", "Editable SEO fields and metadata for local search performance", "Responsive UX optimized for patient-first navigation"],
    outcomes: [["CMS control", "Clinic team managed"], ["Content scale", "Multi-page without dev bottlenecks"], ["Patient journey", "Clear and mobile-optimized"]],
  },
  {
    slug: "dhillon-dental-studio",
    year: "2024",
    industry: "Healthcare",
    code: "dhillon-dental-studio",
    type: "Dental Practice Website",
    status: "Live",
    title: "Dhillon Dental Studio",
    summary:
      "A professional showcase website for a dental practice — clean UI/UX, service information, and an elegant digital presence.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS"],
    website: "https://www.dhillondentalstudio.com/",
    previewImage: "/Dhillon-dental.png",
    videoEmbedUrl: "https://www.youtube.com/embed/nIyQwtLPGTQ",
  },
  {
    slug: "mundra-dental-clinic",
    year: "2024",
    industry: "Healthcare",
    code: "mundra-dental-clinic",
    type: "Dental Clinic Website",
    status: "Live",
    title: "Mundra Dental Clinic",
    summary:
      "A dedicated frontend website for a dental clinic showcasing services, specialisations, and clinic information.",
    stack: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "EmailJS"],
    website: "https://www.mundradentalclinic.com/",
  },
  {
    slug: "hesh-media",
    year: "2024",
    industry: "Marketing",
    code: "hesh-media",
    type: "Agency Showcase",
    status: "Live",
    title: "Hesh Media",
    summary:
      "A sleek showcase website for a social media marketing agency — services, portfolio, and conversion-focused design.",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    website: "https://www.heshmedia.in/",
    previewImage: "/hesh.png",
    videoEmbedUrl: "https://youtu.be/BCdTI9NYkL0",
  },
];
