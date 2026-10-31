# Global Consulting Professionals

A responsive, multipage company website for **Global Consulting Professionals (GCP)**, built with TypeScript, Vite, and CSS. The design uses GCP's supplied logo with a burgundy, warm gray, ivory, and black palette.

The homepage introduces the company through a cinematic **New York → Mumbai → Bangalore** video sequence. Dedicated pages contain the full services, engagement options, advisory profiles, and collective client experience, keeping the content focused across the site.

## Quick start

### Requirements

- Node.js **20.19+** within the 20.x release line, or **22.12+**. Node.js 24 is supported.
- npm (included with Node.js).
- Git, to clone the repository.

```sh
git clone https://github.com/Advaita-expo/globalconsultingprofessionals.com.git
cd globalconsultingprofessionals.com
npm ci
npm run dev
```

Open **[http://localhost:4173/](http://localhost:4173/)**. The server binds to the local machine. No environment variables, API keys, or database are needed.

## Commands

| Command | Purpose |
| --- | --- |
| `npm ci` | Install the exact dependencies in `package-lock.json`. |
| `npm run dev` | Generate page entry files and start the development server at `localhost:4173`. |
| `npm run build` | Generate page entry files, check TypeScript, and build the production site into `dist/`. |
| `npm run preview` | Serve the production build locally at `localhost:4173`. Run the build first. |

Development and preview use the same port. Stop one with **Ctrl+C** before starting the other. To use a different port, run `npm run dev -- --port 4174` or `npm run preview -- --port 4174`.

## Pages

| Route | Content |
| --- | --- |
| `/` | Company introduction, three-city video hero, key figures, and links into the site. |
| `/our-story/` | GCP's background, approach, and international perspective. |
| `/expertise/` | Nine services in three categories, with individual service dialogs. People & Delivery appears first. |
| `/solutions/` | Flexible consulting and staffing engagements, plus an interactive engagement finder. |
| `/why-gcp/` | GCP's differentiators and an original animated brand graphic. |
| `/people/` | Five management advisory profiles, including Tuhin Biswas. |
| `/experience/` | The team's collective experience, with industry filters. |
| `/contact/` | United States and India contacts, office tabs, local times, and an inquiry form. |

Each route has its own HTML entry file and page metadata. Direct navigation and refresh work on hosts that serve directory `index.html` files.

## Features

- Responsive desktop and mobile layouts with mobile navigation.
- Muted, looping video with automatic city transitions, manual city selection, and progress indicators.
- The latest supplied Mumbai skyline clip, served as `mumbai-v2.mp4` to avoid the previous asset's cached URL.
- Four original looping GIF graphics, with still-image alternatives.
- Scroll reveals, page transitions, animated counters, and hover interactions.
- Service tabs, biography dialogs, engagement accordions, and industry filtering.
- System reduced-motion support: videos and GIFs use still imagery when reduced motion is requested.
- A light footer that keeps the original transparent GCP logo clearly visible.
- Fonts and media served locally; no analytics or third-party media embeds.

## Project structure

```text
├── index.html                 # Homepage HTML template and metadata
├── contact/, expertise/, …    # Generated standalone page entries
├── public/
│   └── assets/
│       ├── gcp-logo.png       # Original transparent logo
│       ├── fonts/            # Local fonts, CSS, and font licenses
│       ├── motion/           # GIF artwork and reduced-motion posters
│       └── video/            # Optimized hero clips and posters
├── scripts/
│   ├── prepare-pages.mjs     # Generates the seven nested page entries
│   └── generate-motion.py    # Optional GIF artwork generator
├── src/
│   ├── main.ts               # Application initialization
│   ├── pages.ts              # Page templates, metadata, header, and footer
│   ├── content.ts            # Services, profiles, engagements, and icons
│   ├── components.ts         # Shared content components
│   ├── interactions.ts       # Navigation, tabs, dialogs, and inquiry form
│   ├── motion.ts             # Video sequencing and motion preferences
│   └── *.css                 # Design system and responsive styles
├── package.json
├── package-lock.json
├── tsconfig.json
└── vite.config.ts            # Eight production HTML entry points
```

`node_modules/`, `dist/`, deployment archives, logs, and local hosting state are excluded from version control. Generated page entries are included for clarity and regenerated before development and production builds.

## Editing content and design

| Change | Edit |
| --- | --- |
| Page copy, contact details, shared header/footer | `src/pages.ts` |
| Service descriptions, advisory biographies, engagement details | `src/content.ts` |
| Expertise category order and section components | `src/components.ts` |
| Tab behavior, dialog behavior, inquiry submission | `src/interactions.ts` |
| City video sequence and motion behavior | `src/motion.ts` and the hero template in `src/pages.ts` |
| Brand tokens and common styling | `src/style.css` |
| Page layouts | `src/multipage.css` and `src/editorial.css` |
| Hero video styling | `src/video.css` |
| Footer colors and logo presentation | `src/footer.css` |
| Nested page titles and descriptions | `scripts/prepare-pages.mjs` |

Edit the homepage metadata in `index.html`. Avoid editing generated nested HTML files directly, since the next build replaces them.

### Hero media

| Position | City | Video | Poster |
| --- | --- | --- | --- |
| 1 | New York | `public/assets/video/gcp-hero.mp4` | `hero-poster.jpg` |
| 2 | Mumbai | `public/assets/video/mumbai-v2.mp4` | `mumbai-v2-poster.jpg` |
| 3 | Bangalore | `public/assets/video/bengaluru.mp4` | `bengaluru-poster.jpg` |

The optimized H.264 MP4 files are 1600 × 900, have audio removed, and use fast-start metadata for browser playback. The original large source videos are not required to run or deploy the site. Keep the corresponding poster when replacing a clip. A new filename helps avoid stale browser and CDN caches.

The optional `scripts/generate-motion.py` script requires Python and Pillow only when regenerating the GIF artwork. They are not needed for ordinary development or builds.

### Contact form

The form validates the inquiry and opens a prefilled draft in the visitor's email application using `mailto:`. It **does not send messages through a server**. A copy-to-clipboard fallback is available.

To provide server-side delivery, connect a mail service to the submit handler in `src/interactions.ts` and show a success message only after the service confirms delivery. Keep service secrets on the server.

Current contacts:

- United States: `deepak@globalconsultingprofessionals.com`, `+1 412 455 6125`.
- India: `recruiting@global-pros.com`, `+91 99700 09816`, `+91 88844 43822`.

## Build and deployment

```sh
npm ci
npm run build
npm run preview
```

Deploy the **contents of `dist/`** to a static web host. There is no production Node.js server or database. A typical hosting configuration is:

| Setting | Value |
| --- | --- |
| Install command | `npm ci` |
| Build command | `npm run build` |
| Output directory | `dist` |

The site uses root-relative routes and asset URLs, so host it at the root of a domain or subdomain. A GitHub Pages project URL such as `username.github.io/repository/` requires adapting the route and asset paths; changing only Vite's `base` is insufficient for links written in the page templates. A GitHub Pages custom domain can serve the existing root paths.

Serve `.mp4` files as `video/mp4` and support byte-range requests for efficient playback. Preserve all eight built page directories. No SPA fallback is required.

## Verification

`npm run build` checks TypeScript and produces all eight static pages. Before publishing a content or media change, also check:

- Direct navigation to a nested page and a browser refresh.
- Mobile navigation, expertise tabs and service dialogs, and advisory profile dialogs.
- The hero's New York → Mumbai → Bangalore order and manual city selection.
- The footer logo against its light background.
- Inquiry validation and the email-draft/copy fallback.
- Reduced-motion behavior using the operating system or browser preference.

There is no automated browser test suite in this repository.

## Troubleshooting

- **Port 4173 is occupied:** stop the earlier development/preview process or choose another port with the command shown above. Strict port selection prevents Vite silently moving the site to another address.
- **The local site is unavailable:** keep `npm run dev` running in a terminal and open the exact URL it prints. The development server must remain running while you browse.
- **An older Mumbai video appears:** hard-refresh the page and confirm the deployed files include `mumbai-v2.mp4` and the current JavaScript bundle.
- **Videos show still images:** check the system reduced-motion setting and browser autoplay permissions. The page intentionally uses posters when reduced motion is enabled or playback is blocked.
- **No email application opens:** use the copy fallback or contact one of the listed email addresses directly.

## Content and asset rights

Company content and collective experience were adapted from the original [GCP website](http://globalconsultingprofessionals.com/) and materials supplied by the owner. The logo, portraits, and video footage were supplied for this project. Tuhin Biswas's portrait is framed from the supplied profile screenshot; it can be replaced with an original headshot later.

DM Sans and Instrument Serif are bundled locally under the SIL Open Font License; their license files are included in `public/assets/fonts/`. The motion graphics were created for this site.

No general open-source license is granted for the company's content or brand assets by this repository. Confirm permission before reusing or redistributing those materials.
