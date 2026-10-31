import { arrow, northeast, icon, services, team } from "./content";
import { motionArt } from "./motion";
import { pagePath } from "./paths";
import {
  expertiseSection,
  engagementSection,
  teamSection,
  contactSection,
} from "./components";
export type PageId =
  | "home"
  | "story"
  | "expertise"
  | "solutions"
  | "why"
  | "people"
  | "experience"
  | "contact";
export const pageMeta = {
  home: {
    path: "/",
    label: "Home",
    title: "Global Consulting Professionals",
    description:
      "Experienced people. Connected expertise. Real progress. Discover consulting, project delivery, and talent solutions from GCP.",
  },
  story: {
    path: "/our-story/",
    label: "Our story",
    title: "Our Story",
    description:
      "Meet a consulting partnership built on global experience, personal attention, and a practical understanding of your business.",
  },
  expertise: {
    path: "/expertise/",
    label: "Expertise",
    title: "Domain Expertise",
    description:
      "Explore nine GCP expertise areas across business, finance, technology, transformation, project delivery, and people.",
  },
  solutions: {
    path: "/solutions/",
    label: "Solutions",
    title: "Flexible Consulting & Staffing Solutions",
    description:
      "Find your fit with project management, interim staffing, project contracts, contract-to-hire, and permanent hiring.",
  },
  why: {
    path: "/why-gcp/",
    label: "Why GCP",
    title: "The GCP Difference",
    description:
      "Discover GCP’s approach: transparent engagements, experienced professionals, thoughtful screening, and personal commitment.",
  },
  people: {
    path: "/people/",
    label: "Our people",
    title: "Our Management Advisory Team",
    description:
      "Meet Srinivas Pannala, CA Rajiv Soni, Chitra Hiremath, Deepak Dewan, and Tuhin Biswas.",
  },
  experience: {
    path: "/experience/",
    label: "Client experience",
    title: "Collective Client Experience",
    description:
      "Explore the GCP team’s collective experience across leading technology, healthcare, financial, consumer, and industrial organizations.",
  },
  contact: {
    path: "/contact/",
    label: "Contact",
    title: "Start a Conversation",
    description:
      "Contact GCP in the United States or Bangalore, India. Tell us about your business goals, project, or hiring needs.",
  },
};
export function currentPage(): PageId {
  const e =
    pagePath(location.pathname).replace(/index\.html$/, "").replace(/\/$/, "") || "/";
  return (Object.entries(pageMeta).find(
    ([, t]) => t.path.replace(/\/$/, "") === e,
  )?.[0] || "home") as PageId;
}
const primary: PageId[] = ["story", "expertise", "solutions", "why", "people"];
function navLink(e: PageId, t: PageId) {
  const r = pageMeta[e];
  return `<a href="${r.path}" ${e === t ? 'aria-current="page" class="current"' : ""}>${r.label}</a>`;
}
export function header(e: PageId) {
  return `
  <div class="reading-progress" aria-hidden="true"></div>

  <header class="site-header" id="header"><div class="container nav-wrap">
    <a class="brand" href="/" aria-label="GCP, Global Consulting Professionals home"><img src="/assets/gcp-logo.png" width="80" height="70" alt="GCP"/><span>Global Consulting<br/>Professionals<span class="brand-caption">NEW YORK - MUMBAI - BANGALORE</span></span></a>
    <nav class="desktop-nav" aria-label="Main navigation">${primary.map((t) => navLink(t, e)).join("")}</nav>
    <a class="button button-small header-cta" href="/contact/">Let’s talk ${northeast}</a>
    <button class="menu-toggle" aria-label="Open navigation" aria-expanded="false" aria-controls="mobile-nav"><span></span><span></span></button>
  </div><nav class="mobile-nav" id="mobile-nav" aria-label="Mobile navigation" hidden>${(Object.keys(pageMeta) as PageId[]).map((t) => navLink(t, e)).join("")}</nav></header>`;
}
export function footer() {
  return `<footer class="footer footer-v2"><div class="container"><div class="footer-top"><div><a class="brand footer-brand" href="/" aria-label="GCP home"><span class="footer-logo"><img src="/assets/gcp-logo.png" width="75" height="66" alt="GCP"/></span><span>Global Consulting<br/>Professionals</span></a><p>Experienced minds.<br/>A shared commitment to your success.</p></div><div class="footer-nav"><div><span>DISCOVER GCP</span><a href="/our-story/">Our story</a><a href="/why-gcp/">Why GCP</a><a href="/people/">Our people</a><a href="/experience/">Client experience</a></div><div><span>MOVE FORWARD</span><a href="/expertise/">Domain expertise</a><a href="/solutions/">Our solutions</a><a href="/contact/">Start a conversation</a><a href="mailto:deepak@globalconsultingprofessionals.com">Email our team ${northeast}</a></div></div></div><a class="footer-statement" href="/contact/">Let’s move <em>forward.</em><span>${northeast}</span></a><div class="footer-bottom"><span>© ${new Date().getFullYear()} Global Consulting Professionals.</span><div><button data-action="privacy">Privacy</button><span class="footer-location">United States <i></i> India</span></div></div></div></footer>`;
}
export function dialogShell() {
  return '<dialog class="detail-dialog" id="detail-dialog" aria-labelledby="dialog-title"><button class="dialog-close" aria-label="Close dialog"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" stroke-width="1.5"/></svg></button><div id="dialog-content"></div></dialog>';
}
function pageHero(
  label: string,
  title: string,
  description: string,
  art: string,
  tag: string,
) {
  return `<section class="page-hero"><div class="container"><div class="breadcrumbs"><a href="/">Home</a><span>/</span><span>${label}</span></div><div class="page-hero-grid ${art ? "" : "page-hero-grid-plain"}"><div class="page-hero-copy"><p class="eyebrow"><span class="status-dot"></span> ${tag}</p><h1 class="animated-title">${title}</h1><p>${description}</p></div>${art ? `<div class="page-hero-art">${motionArt(art, `GCP animated ${art} motion graphic`)}</div>` : ""}</div></div></section>`;
}
function nextPage(
  title: string,
  description: string,
  path: string,
  label: string,
) {
  return `<section class="next-page"><div class="container"><div><p class="eyebrow">CONTINUE EXPLORING</p><h2>${title}</h2><p>${description}</p></div><a class="text-link" href="${path}">${label} ${northeast}</a></div></section>`;
}

function home() {
  return `<section class="hero-video-banner" id="home"><div class="hero-film" id="hero-film-screen" role="tabpanel" aria-labelledby="hero-location-new-york"><video class="active" data-hero-film="new-york" data-motion-video autoplay loop muted playsinline preload="metadata" poster="/assets/video/hero-poster.jpg" aria-hidden="true"><source src="/assets/video/gcp-hero.mp4" type="video/mp4"/></video><video data-hero-film="mumbai" data-motion-video loop muted playsinline preload="metadata" poster="/assets/video/mumbai-v2-poster.jpg" aria-hidden="true"><source src="/assets/video/mumbai-v2.mp4" type="video/mp4"/></video><video data-hero-film="bangalore" data-motion-video loop muted playsinline preload="metadata" poster="/assets/video/bengaluru-poster.jpg" aria-hidden="true"><source src="/assets/video/bengaluru.mp4" type="video/mp4"/></video></div><div class="hero-film-shade" aria-hidden="true"></div><div class="container hero-video-content"><div class="hero-video-copy"><p class="eyebrow"><span class="status-dot"></span> EXPERIENCE THAT MOVES BUSINESS FORWARD</p><h1 class="animated-title"><span>The right expertise.</span><span>The right people.</span><span><em>Real progress.</em></span></h1><p>Extraordinary things happen when experience meets ambition. We connect your business with the expertise and people to make what’s next possible.</p><div class="hero-actions"><a class="button" href="/expertise/">Discover our expertise ${arrow}</a><a class="text-link" href="/our-story/">The GCP story ${northeast}</a></div></div><div class="hero-video-footer"><div class="hero-locations" role="tablist" aria-label="Hero film location"><button id="hero-location-new-york" data-hero-location="new-york" role="tab" aria-selected="true" aria-controls="hero-film-screen" tabindex="0"><span>01</span> New York</button><button id="hero-location-mumbai" data-hero-location="mumbai" role="tab" aria-selected="false" aria-controls="hero-film-screen" tabindex="-1"><span>02</span> Mumbai</button><button id="hero-location-bangalore" data-hero-location="bangalore" role="tab" aria-selected="false" aria-controls="hero-film-screen" tabindex="-1"><span>03</span> Bangalore</button></div></div></div></section><section class="home-statistics" aria-label="GCP in perspective"><div class="container"><div class="hero-stats"><div><strong data-count="20">20<span>+</span></strong><p>Years of average<br/>professional experience</p></div><div><strong>09</strong><p>Connected areas<br/>of domain expertise</p></div><div><strong>04</strong><p>Regions of collective<br/>international experience</p></div><a href="/solutions/"><span>One partnership.<br/><strong>Designed around you.</strong></span><span class="circle-arrow">${arrow}</span></a></div></div></section>
 <section class="section home-overview"><div class="container"><div class="section-heading reveal"><div><p class="eyebrow">MAKE YOUR NEXT MOVE</p><h2>A clearer view.<br/><em>A way forward.</em></h2></div><p>Explore GCP at your own pace. Start with the expertise you need, the way you want to work, or the principles behind our partnership.</p></div><div class="home-page-links">
 <a class="home-page-link reveal" href="/expertise/"><span>01 / CAPABILITIES</span><h3>Find your expertise.</h3><p>Explore our specialist disciplines.</p>${northeast}</a>
 <a class="home-page-link reveal" href="/solutions/"><span>02 / ENGAGEMENTS</span><h3>Choose your support.</h3><p>Find an arrangement that fits.</p>${northeast}</a>
 <a class="home-page-link reveal" href="/why-gcp/"><span>03 / OUR APPROACH</span><h3>See the difference.</h3><p>Understand how we partner with you.</p>${northeast}</a>
 </div></div></section>`;
}

function story() {
  return `${pageHero("Our story", "Global experience.<br/><em>Human connection.</em>", "A diverse group of consulting professionals, brought together by a belief in the value of a thoughtful partnership.", "", "THE STORY BEHIND GCP")}
 <section class="section story-introduction"><div class="container intro-grid"><div class="reveal"><p class="eyebrow">WHO WE ARE</p><h2>An experienced team.<br/><em>By design.</em></h2></div><div class="reveal"><p class="lead">Different backgrounds. Complementary disciplines. A practical understanding of business.</p><p>Global Consulting Professionals brings together consulting, project management, and talent expertise. Our professionals have built their understanding through hands-on assignments across organizations, industries, and international markets.</p><p>We take time to understand the context behind a requirement: the organization, the people, and the ambition that connects them. That understanding shapes the partnerships we build.</p></div></div></section>
 <section class="section region-section"><div class="container"><div class="section-heading reveal"><div><p class="eyebrow">PERSPECTIVE WITHOUT BORDERS</p><h2>Experience across<br/><em>different markets.</em></h2></div><p>Our team's collective professional experience spans these regions. Our current contact points are in the United States and Bangalore, India.</p></div><div class="region-grid">${[
   ["01", "United States", "Client relationships & project experience"],
   ["02", "Canada", "International professional experience"],
   ["03", "Latin America", "Cross-market understanding"],
   ["04", "India", "Consulting & talent expertise"],
 ]
   .map(
     (r) =>
       `<article class="region-item reveal"><span>${r[0]}</span>${icon("globe")}<h3>${r[1]}</h3><p>${r[2]}</p></article>`,
   )
   .join("")}</div></div></section>
 ${nextPage("The principles behind the partnership.", "See how our experience shapes the way we work.", "/why-gcp/", "Discover why GCP")}`;
}

function expertise() {
  return `${pageHero("Expertise", "Depth in every domain.<br/><em>Strength in connection.</em>", "Nine areas of specialist knowledge, connected around your goals. Explore each category to find the disciplines relevant to your challenge.", "expertise", "BUSINESS / TECHNOLOGY / PEOPLE")}${expertiseSection()}${nextPage("From expertise to an engagement.", "Explore the ways we can bring the right capabilities into your business.", "/solutions/", "Explore our solutions")}`;
}

export const fitData = [
  {
    id: "project",
    label: "Deliver a project",
    title: "Project management",
    text: "A clear scope, experienced leadership, and support through the full delivery lifecycle. Start with an end-to-end project engagement.",
  },
  {
    id: "expertise",
    label: "Add expertise quickly",
    title: "Interim staffing",
    text: "A flexible way to bring experienced professionals into your team for a fixed or open-ended assignment. Project contracts are another option for a defined duration.",
  },
  {
    id: "team",
    label: "Build a lasting team",
    title: "Permanent hiring",
    text: "A dedicated search shaped around your role and organization. If you want to evaluate the fit first, we can also discuss contract-to-hire.",
  },
];
function solutions() {
  return `${pageHero("Solutions", "Your needs evolve.<br/><em>So should your support.</em>", "Choose the expertise, people, and engagement model that fit your business today and the ambitions ahead.", "momentum", "FLEXIBLE BY DESIGN")}
<section class="section fit-section" id="fit-finder"><div class="container"><div class="section-heading reveal"><div><p class="eyebrow">FIND YOUR STARTING POINT</p><h2>What’s your<br/><em>priority right now?</em></h2></div><p>Explore a starting point for our conversation. We’ll work with you to shape the details.</p></div><div class="fit-options">${fitData.map((e, t) => `<button data-fit="${e.id}" aria-pressed="${t === 0}" class="fit-option"><span>0${t + 1}</span>${e.label}${arrow}</button>`).join("")}</div><div class="fit-result" id="fit-result" aria-live="polite"><div><span class="mini-label">A POSSIBLE STARTING POINT</span><h3>${fitData[0].title}</h3><p>${fitData[0].text}</p></div><button class="button" data-interest="${fitData[0].title}">Explore this with us ${northeast}</button></div></div></section>
${engagementSection()}<section class="section engagement-notes"><div class="container intro-grid"><div><p class="eyebrow">GOOD FIT STARTS WITH GOOD QUESTIONS</p><h2>First, we listen.<br/><em>Then, we align.</em></h2></div><div><p>We’ll discuss your objectives, timeline, budget, and existing capabilities. Together, we can identify the scope and arrangement that make sense.</p><ul class="simple-list"><li>What does a successful outcome look like?</li><li>Which capabilities do you need to add?</li><li>How long will you need the support?</li><li>What’s important to your team and culture?</li></ul></div></div></section>${nextPage("Have a project or role in mind?", "Let’s discuss the scope, timeline, and arrangement.", "/contact/", "Discuss your requirement")}`;
}
function why() {
  return `${pageHero("Why GCP", "A relationship built<br/><em>on the right principles.</em>", "Straightforward expectations, accessible expertise, and personal attention. These are the commitments behind our approach to partnership.", "connections", "THE GCP DIFFERENCE")}
 <section class="section strengths-section"><div class="container"><div class="section-heading reveal"><div><p class="eyebrow">WHAT YOU CAN EXPECT</p><h2>Considered carefully.<br/><em>Delivered personally.</em></h2></div><p>Four principles guide the way we work with you, from the first conversation through the engagement.</p></div><div class="strength-rows">${[
   [
     "Transparent and practical",
     "Clear engagement terms and an open approach to costs help you understand the arrangement. We work with you to align the support with your budget.",
   ],
   [
     "An extension of your team",
     "A relationship with GCP gives you access to experienced consultants and a collaborative perspective when you need to work through an issue.",
   ],
   [
     "Attention at every scale",
     "We bring the same urgency and personal commitment to every client relationship, irrespective of portfolio size. Your goals deserve our attention.",
   ],
   [
     "Experience that informs judgment",
     "Senior practitioners bring the perspective developed through practical work in consulting, recruitment, talent management, and project delivery.",
   ],
 ]
   .map(
     (s, i) =>
       `<article class="strength-row reveal"><span>0${i + 1}</span><h3>${s[0]}</h3><p>${s[1]}</p></article>`,
   )
   .join("")}</div></div></section>
 ${nextPage("Meet the people behind that commitment.", "Explore our advisors and their complementary experience.", "/people/", "Meet our people")}`;
}

function people() {
  return `${pageHero("Our people", "Different perspectives.<br/><em>A shared purpose.</em>", "Meet our management advisory team. Select a profile to explore each professional’s background and areas of experience.", "people", "THE MANAGEMENT ADVISORY TEAM")}${teamSection()}${nextPage("Put a perspective to work.", "Tell us about your challenge and the experience you need.", "/contact/", "Connect with the team")}`;
}

export const clients = [
  { name: "GE", sector: "Industrial & energy", style: "ge" },
  { name: "Oracle", sector: "Technology", style: "oracle" },
  { name: "Microsoft", sector: "Technology", style: "microsoft" },
  { name: "Unilever", sector: "Consumer & retail", style: "unilever" },
  { name: "Diageo", sector: "Consumer & retail", style: "diageo" },
  { name: "American Express", sector: "Financial services", style: "amex" },
  { name: "Novartis", sector: "Healthcare", style: "novartis" },
  { name: "Johnson & Johnson", sector: "Healthcare", style: "jnj" },
  { name: "Macquarie", sector: "Financial services", style: "macquarie" },
  { name: "Alcon", sector: "Healthcare", style: "alcon" },
  { name: "Mondelēz", sector: "Consumer & retail", style: "mondelez" },
  { name: "Pfizer", sector: "Healthcare", style: "pfizer" },
  { name: "Nomura", sector: "Financial services", style: "nomura" },
  { name: "United Spirits", sector: "Consumer & retail", style: "spirits" },
  { name: "Shell", sector: "Industrial & energy", style: "shell" },
  { name: "Tesco", sector: "Consumer & retail", style: "tesco" },
];
export function clientTiles(e = "All sectors") {
  return clients
    .filter((t) => e === "All sectors" || t.sector === e)
    .map(
      (t) =>
        `<article class="client-tile"><span class="client-wordmark wordmark-${t.style}">${t.name}</span><span>${t.sector}</span></article>`,
    )
    .join("");
}
function experience() {
  return `${pageHero("Client experience", "A broader perspective.<br/><em>Built in the real world.</em>", "Our team’s collective professional experience includes work with leading organizations across industries. Explore the breadth behind our thinking.", "", "GLOBAL EXPERIENCE / INDUSTRY UNDERSTANDING")}<section class="section experience-section"><div class="container"><div class="experience-toolbar"><span class="eyebrow">OUR TEAM’S COLLECTIVE EXPERIENCE</span><span id="client-count">16 organizations</span></div><div class="client-filters" role="group" aria-label="Filter client experience by sector">${["All sectors", "Technology", "Financial services", "Healthcare", "Consumer & retail", "Industrial & energy"].map((e, t) => `<button data-client-filter="${e}" aria-pressed="${t === 0}">${e}</button>`).join("")}</div><div class="client-grid" id="client-grid">${clientTiles()}</div><p class="experience-footnote">Names reflect team members’ collective professional experience as listed on GCP’s existing website. They do not imply a current engagement or endorsement.</p></div></section>${nextPage("A perspective for your industry.", "Explore the capabilities behind our experience.", "/expertise/", "View domain expertise")}`;
}
function contact() {
  return `<div class="container"><div class="breadcrumbs"><a href="/">Home</a><span>/</span><span>Contact</span></div></div>${contactSection().replace("<h2>What’s your<br/><em>next chapter?</em></h2>", '<h1 class="animated-title">What’s your<br/><em>next chapter?</em></h1>')}<section class="contact-bottom"><div class="container"><span>${icon("globe")} Global experience. Local understanding.</span><span>${icon("handshake")} A conversation shaped around you.</span><span>${icon("shield")} Clear expectations from the start.</span></div></section>`;
}
const renderers: Record<PageId, () => string> = {
  home: home,
  story: story,
  expertise: expertise,
  solutions: solutions,
  why: why,
  people: people,
  experience: experience,
  contact: contact,
};
export function renderPage(e: PageId) {
  return (
    header(e) +
    `<main id="main" class="page page-${e}">${renderers[e]()}</main>` +
    footer() +
    dialogShell()
  );
}
