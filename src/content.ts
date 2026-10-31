export const arrow =
  '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
export const northeast =
  '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
export const check =
  '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m5 12 4 4L19 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const icons: Record<string, string> = {
  chart: '<path d="M4 20V4m0 16h16M8 15l4-5 4 2 4-7"/><path d="M15 5h5v5"/>',
  boxes:
    '<path d="m12 3 8 4.5v9L12 21l-8-4.5v-9L12 3Zm0 9 8-4.5M12 12 4 7.5m8 4.5v9M8 5.3l8 4.5"/>',
  process:
    '<rect x="3" y="3" width="6" height="6" rx="1"/><rect x="15" y="15" width="6" height="6" rx="1"/><path d="M15 6h3v6M9 18H6v-6m6-9 3 3-3 3M12 15l-3 3 3 3"/>',
  tech: '<rect x="4" y="4" width="16" height="12" rx="2"/><path d="M8 21h8m-4-5v5M9 8l-2 2 2 2m6-4 2 2-2 2"/>',
  change:
    '<path d="M20 7a9 9 0 0 0-15-2L2 8m0-5v5h5m-3 9a9 9 0 0 0 15 2l3-3m0 5v-5h-5"/>',
  data: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/>',
  project:
    '<rect x="5" y="5" width="15" height="16" rx="2"/><path d="M9 5V3h7v2m-7 6 2 2 4-4m-6 8h7"/>',
  people:
    '<circle cx="9" cy="7" r="3"/><path d="M3 21v-3a6 6 0 0 1 12 0v3m2-17a3 3 0 0 1 0 6m4 11v-3a6 6 0 0 0-4-5"/>',
  training: '<path d="m2 8 10-5 10 5-10 5L2 8Zm4 2v7c4 3 8 3 12 0v-7m4-2v8"/>',
  globe:
    '<circle cx="12" cy="12" r="9"/><ellipse cx="12" cy="12" rx="4" ry="9"/><path d="M3 12h18M5 6h14M5 18h14"/>',
  shield:
    '<path d="m12 3 8 3v6c0 5-8 9-8 9s-8-4-8-9V6l8-3Z"/><path d="m8 12 3 3 5-6"/>',
  handshake:
    '<path d="m3 8 5-4 4 2 4-2 5 4-3 9-6 4-6-4-3-9Z"/><path d="m8 4 4 2-4 5 3 2 5-5 5 4M8 15l5 4m-2-6 5 4"/>',
};
export function icon(name: string) {
  return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name] || icons.chart}</svg>`;
}

export type Service = {
  name: string;
  group: string;
  icon: string;
  text: string;
  intro: string;
  items: string[];
};
export const services: Service[] = [
  {
    name: "Project & Program Management",
    group: "people",
    icon: "project",
    text: "Move from ambition to delivery with experienced leadership at every stage of your project.",
    intro:
      "Hands-on ownership from initiation and planning through execution, monitoring, and closure, focused on your goals, timelines, and budget.",
    items: [
      "Project planning & execution",
      "Program governance & PMO support",
      "Risk & stakeholder management",
      "Monitoring, control & project closure",
    ],
  },
  {
    name: "HR & Recruitment",
    group: "people",
    icon: "people",
    text: "Find the people who fit your business, your culture, and the challenges ahead.",
    intro:
      "A consultative approach to understanding your requirements, screening candidates, and connecting you with the right professionals.",
    items: [
      "Executive search & permanent hiring",
      "Interim staffing & project contracts",
      "Contract-to-hire engagements",
      "Candidate screening & assessment",
    ],
  },
  {
    name: "Training & Development",
    group: "people",
    icon: "training",
    text: "Help your people build the capabilities and confidence to take the next step.",
    intro:
      "Support for professional growth, communication, and career development, shaped by experienced practitioners.",
    items: [
      "Professional & soft skills development",
      "Leadership development",
      "Career & placement counseling",
      "Workshops & training support",
    ],
  },
  {
    name: "Finance & Audit",
    group: "business",
    icon: "chart",
    text: "Bring clarity to the numbers, strengthen controls, and make better-informed business decisions.",
    intro:
      "Experienced finance professionals to help you navigate financial planning, strengthen financial processes, and manage risk with confidence.",
    items: [
      "Financial planning, budgeting & forecasting",
      "Financial process improvement",
      "Audit planning & internal controls",
      "Finance talent & specialist support",
    ],
  },
  {
    name: "Supply Chain",
    group: "business",
    icon: "boxes",
    text: "Connect people, processes, and resources across your supply chain to unlock greater efficiency.",
    intro:
      "Practical expertise across supply chain management and finance, connecting your operations from supplier to customer.",
    items: [
      "Supply chain management (SCM)",
      "Supply chain finance (SCF)",
      "Supplier & stakeholder coordination",
      "Operational process improvement",
    ],
  },
  {
    name: "Solutions & Process Improvement",
    group: "business",
    icon: "process",
    text: "Turn complex operating challenges into simpler processes and meaningful improvements.",
    intro:
      "An outside perspective and hands-on experience to understand how work gets done, identify friction, and help your teams operate more effectively.",
    items: [
      "Business process assessment",
      "Process redesign & implementation",
      "Continuous improvement support",
      "Cross-functional stakeholder alignment",
    ],
  },
  {
    name: "IT & Information Management",
    group: "technology",
    icon: "tech",
    text: "Put technology and information to work with the expertise to support your business priorities.",
    intro:
      "Connect business needs with technology expertise, from information management and business analysis to delivery support.",
    items: [
      "IT & information management expertise",
      "Business analysis & systems alignment",
      "Technology project support",
      "Specialist IT recruitment",
    ],
  },
  {
    name: "Transition & Transformation",
    group: "technology",
    icon: "change",
    text: "Navigate change with a thoughtful transition and the right professionals alongside you.",
    intro:
      "Move between providers, platforms, and operating models, or rethink existing processes and systems with experienced support.",
    items: [
      "Vendor & service transitions",
      "Business transformation support",
      "Process & systems redesign",
      "Change coordination & implementation",
    ],
  },
  {
    name: "Data Management & Analytics",
    group: "technology",
    icon: "data",
    text: "Make information more useful, accessible, and actionable across your organization.",
    intro:
      "Bring experienced data professionals into your organization to support information quality, analytical thinking, and better business decisions.",
    items: [
      "Data management expertise",
      "Reporting & analytics support",
      "Information process improvement",
      "Specialist data talent",
    ],
  },
];
export const team = [
  {
    name: "Srinivas Pannala",
    specialty: "Strategy & Program Leadership",
    image: "srinivas.jpg",
    bio: "An alumnus of IIM Bangalore and IIT Kharagpur, Srinivas brings expertise in strategy, portfolio and program management, governance, compliance, and business analysis.",
    points: [
      "MBA in International Business Strategy, IIM Bangalore",
      "B.Tech (Honors), Computer Science & Engineering, IIT Kharagpur",
      "Experience across PMO, corporate planning, product roadmaps, and systems alignment",
    ],
  },
  {
    name: "CA Rajiv Soni",
    specialty: "Finance & Professional Development",
    image: "rajiv.jpg",
    bio: "A Chartered Accountant, educator, author, and career counselor, Rajiv brings extensive experience in professional development and training.",
    points: [
      "Chartered Accountant; University of Delhi graduate",
      "Experience in professional workshops, soft skills, and career counseling",
      "Founder of Edmatrix Services and active in educational and alumni initiatives",
    ],
  },
  {
    name: "Chitra Hiremath",
    specialty: "Executive Search & Talent",
    image: "chitra.jpg",
    bio: "Chitra brings over 25 years of experience in executive search, computer training, and communication strategy, with a background in senior recruitment mandates across industries.",
    points: [
      "St. Xavier’s College, Mumbai University",
      "Postgraduate studies in Advertising & Mass Communication, Xavier Institute of Management",
      "Experience with Perfect Placement and Globesearch",
    ],
  },
  {
    name: "Deepak Dewan",
    specialty: "Global Staffing & Human Capital",
    image: "deepak.jpg",
    bio: "Deepak brings over 25 years of recruiting experience across permanent, interim, and contractual staffing, with a focus on IT, program management, and finance.",
    points: [
      "Experience across the United States, Canada, Latin America, and Asia Pacific",
      "Hands-on background in process improvement and stakeholder management",
      "Expertise in recruitment, assessment, and vendor and contract management",
    ],
  },
  {
    name: "Tuhin Biswas",
    specialty: "HR Strategy & Transformation",
    image: "tuhin-reference.png",
    bio: "A Global CHRO, board advisor, HR strategy architect, and author, Tuhin brings 25+ years of experience in human-centric organizational strategies.",
    points: [
      "Enterprise transformation & M&A integration",
      "HR digitization & leadership development",
      "Global HR leadership and board advisory experience",
    ],
  },
];
export const engagements = [
  {
    title: "Project management",
    tag: "End-to-end ownership",
    text: "From initiation and planning to execution, monitoring, and closure, we take responsibility for your project or a defined part of it, working toward the agreed goals, timeline, and budget.",
  },
  {
    title: "Interim staffing",
    tag: "Flexible duration",
    text: "Experienced professionals for fixed or open-ended assignments. Our cost-plus model gives you a clear view of payroll and the agreed engagement overhead.",
  },
  {
    title: "Project-based contracts",
    tag: "Defined scope. Clear terms.",
    text: "Bring in specialist expertise for a fixed-duration project with an agreed monthly fee, while GCP handles the staffing arrangement.",
  },
  {
    title: "Contract-to-hire",
    tag: "Build confidence before committing",
    text: "Work with a professional during a contract period to assess the fit for your team and the requirements of the role before making a long-term hiring decision.",
  },
  {
    title: "Permanent hiring",
    tag: "The right long-term fit",
    text: "A dedicated search shaped around your requirements, with in-depth screening and candidate assessment to identify professionals suited to your organization.",
  },
];
