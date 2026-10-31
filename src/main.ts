import "./style.css";
import "./multipage.css";
import "./video.css";
import "./editorial.css";
import "./footer.css";
import { northeast } from "./content";
import {
  currentPage,
  renderPage,
  pageMeta,
  fitData,
  clients,
  clientTiles,
} from "./pages";
import { initInteractions } from "./interactions";
import { initMotion } from "./motion";

const page = currentPage();
document.querySelector<HTMLDivElement>("#app")!.innerHTML = renderPage(page);
document.title = `${pageMeta[page].title} — GCP`;
document
  .querySelector('meta[name="description"]')
  ?.setAttribute("content", pageMeta[page].description);
initInteractions();
initMotion();

document.addEventListener("click", (event) => {
  const button = (event.target as HTMLElement).closest<HTMLButtonElement>(
    "button",
  );
  if (!button) return;
  if (button.dataset.fit) {
    const fit = fitData.find((f) => f.id === button.dataset.fit);
    if (!fit) return;
    document
      .querySelectorAll<HTMLButtonElement>("[data-fit]")
      .forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
    document.querySelector("#fit-result")!.innerHTML =
      `<div><span class="mini-label">A POSSIBLE STARTING POINT</span><h3>${fit.title}</h3><p>${fit.text}</p></div><button class="button" data-interest="${fit.title}">Explore this with us ${northeast}</button>`;
  }
  if (button.dataset.clientFilter) {
    const sector = button.dataset.clientFilter;
    document
      .querySelectorAll<HTMLButtonElement>("[data-client-filter]")
      .forEach((b) => b.setAttribute("aria-pressed", String(b === button)));
    document.querySelector("#client-grid")!.innerHTML = clientTiles(sector);
    const count = clients.filter(
      (c) => sector === "All sectors" || c.sector === sector,
    ).length;
    document.querySelector("#client-count")!.textContent =
      `${count} organizations`;
  }
});

const counter = document.querySelector<HTMLElement>("[data-count]");
if (
  counter &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches &&
  !document.documentElement.classList.contains("motion-paused")
) {
  const observer = new IntersectionObserver(
    (entries) => {
      if (!entries[0].isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const finish = Number(counter.dataset.count);
      function frame(now: number) {
        const progress = document.documentElement.classList.contains(
          "motion-paused",
        )
          ? 1
          : Math.min(1, (now - start) / 1100);
        const value = Math.round(finish * (1 - Math.pow(1 - progress, 3)));
        counter!.innerHTML = `${value}<span>+</span>`;
        if (progress < 1) requestAnimationFrame(frame);
      }
      requestAnimationFrame(frame);
    },
    { threshold: 0.5 },
  );
  observer.observe(counter);
}
