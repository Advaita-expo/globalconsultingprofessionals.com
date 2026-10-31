import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const template = readFileSync(resolve(root, "index.html"), "utf8");
const pages = [
  [
    "our-story",
    "Our Story",
    "A consulting partnership built on global experience, personal attention, and a practical understanding of your business.",
  ],
  [
    "expertise",
    "Domain Expertise",
    "Explore nine GCP expertise areas across business, finance, technology, transformation, project delivery, and people.",
  ],
  [
    "solutions",
    "Consulting & Staffing Solutions",
    "Explore project management, interim staffing, project contracts, contract-to-hire, and permanent hiring.",
  ],
  [
    "why-gcp",
    "The GCP Difference",
    "Transparent engagements, experienced professionals, thoughtful screening, and personal commitment.",
  ],
  [
    "people",
    "Our Management Advisory Team",
    "Meet Srinivas Pannala, CA Rajiv Soni, Chitra Hiremath, Deepak Dewan, and Tuhin Biswas.",
  ],
  [
    "experience",
    "Collective Client Experience",
    "Explore the GCP team’s collective experience across leading organizations and industries.",
  ],
  [
    "contact",
    "Start a Conversation",
    "Contact Global Consulting Professionals in the United States or Bangalore, India.",
  ],
];
for (const [slug, title, description] of pages) {
  const html = template
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${title} — GCP</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=")[^"]+/,
      `$1${description}`,
    )
    .replace(
      /(<meta\s+property="og:title"\s+content=")[^"]+/,
      `$1${title} — GCP`,
    )
    .replace(
      /(<meta\s+property="og:description"\s+content=")[^"]+/,
      `$1${description}`,
    );
  mkdirSync(resolve(root, slug), { recursive: true });
  writeFileSync(resolve(root, slug, "index.html"), html);
}
console.log("Prepared 8 standalone HTML pages.");
