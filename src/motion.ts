const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
let paused = reduced.matches;

export function motionArt(name: string, alt: string, showCaption = true) {
  const path = `/assets/motion/${name}`;
  return `<figure class="motion-art"><img src="${path}${paused ? "-poster.png" : ".gif"}" data-gif="${path}.gif" data-poster="${path}-poster.png" alt="${alt}" width="640" height="640" decoding="async"/>${showCaption ? `<figcaption><span><i></i> THE GCP PERSPECTIVE</span></figcaption>` : ""}</figure>`;
}

export function initMotion() {
  const films = Array.from(
    document.querySelectorAll<HTMLVideoElement>("video[data-hero-film]"),
  );
  const locations = Array.from(
    document.querySelectorAll<HTMLButtonElement>("[data-hero-location]"),
  );
  let activeFilm =
    films.find((video) => video.classList.contains("active"))?.dataset
      .heroFilm || "new-york";
  let filmTimer: number | undefined;

  function scheduleFilm() {
    window.clearTimeout(filmTimer);
    const video = films.find((film) => film.dataset.heroFilm === activeFilm);
    if (paused || !video || films.length < 2) return;
    const duration = Number.isFinite(video.duration) ? video.duration : 10;
    filmTimer = window.setTimeout(
      () => {
        const index = films.indexOf(video);
        selectFilm(films[(index + 1) % films.length].dataset.heroFilm!);
      },
      Math.max(1, duration - video.currentTime) * 1000,
    );
  }

  function selectFilm(id: string) {
    const video = films.find((film) => film.dataset.heroFilm === id);
    if (!video || id === activeFilm) return;
    activeFilm = id;
    video.currentTime = 0;
    films.forEach((film) => film.classList.toggle("active", film === video));
    locations.forEach((button) => {
      const active = button.dataset.heroLocation === id;
      button.setAttribute("aria-selected", String(active));
      button.tabIndex = active ? 0 : -1;
    });
    document
      .querySelector("#hero-film-screen")
      ?.setAttribute("aria-labelledby", `hero-location-${id}`);
    applyMotion();
  }

  locations.forEach((button) =>
    button.addEventListener("click", () =>
      selectFilm(button.dataset.heroLocation!),
    ),
  );
  films.forEach((video) => {
    video.addEventListener("loadedmetadata", () => {
      if (video.dataset.heroFilm === activeFilm) scheduleFilm();
    });
    video.addEventListener("timeupdate", () => {
      if (
        video.dataset.heroFilm !== activeFilm ||
        !Number.isFinite(video.duration)
      )
        return;
      const button = locations.find(
        (location) => location.dataset.heroLocation === activeFilm,
      );
      button?.style.setProperty(
        "--film-progress",
        `${(video.currentTime / video.duration) * 100}%`,
      );
    });
  });

  function applyMotion() {
    document.documentElement.classList.toggle("motion-paused", paused);
    document
      .querySelectorAll<HTMLVideoElement>("video[data-motion-video]")
      .forEach((video) => {
        video.muted = true;
        if (
          paused ||
          (video.dataset.heroFilm && video.dataset.heroFilm !== activeFilm)
        ) {
          video.pause();
        } else {
          video.play().catch((error: DOMException) => {
            if (
              error.name === "AbortError" ||
              paused ||
              (video.dataset.heroFilm && video.dataset.heroFilm !== activeFilm)
            )
              return;
            paused = true;
            applyMotion();
          });
        }
      });
    document
      .querySelectorAll<HTMLImageElement>("img[data-gif]")
      .forEach((img) => {
        const src = paused ? img.dataset.poster! : img.dataset.gif!;
        if (img.getAttribute("src") !== src) img.src = src;
      });
    scheduleFilm();
  }
  applyMotion();
  reduced.addEventListener("change", (event) => {
    paused = event.matches;
    applyMotion();
  });

  document.addEventListener("click", (event) => {
    if (
      event.defaultPrevented ||
      event.button !== 0 ||
      event.ctrlKey ||
      event.metaKey ||
      event.shiftKey ||
      event.altKey ||
      paused ||
      reduced.matches
    )
      return;
    const link = (event.target as HTMLElement).closest<HTMLAnchorElement>(
      "a[href]",
    );
    if (!link || link.target || link.hasAttribute("download")) return;
    const url = new URL(link.href, location.href);
    if (
      url.origin !== location.origin ||
      (url.pathname === location.pathname && url.search === location.search)
    )
      return;
    event.preventDefault();
    document.body.classList.add("page-leaving");
    setTimeout(() => location.assign(url.href), 160);
  });

  const progress = document.querySelector<HTMLElement>(".reading-progress");
  let scheduled = false;
  function update() {
    const total = document.documentElement.scrollHeight - innerHeight;
    if (progress)
      progress.style.transform = `scaleX(${total > 0 ? Math.min(1, scrollY / total) : 0})`;
    document
      .querySelector(".site-header")
      ?.classList.toggle("scrolled", scrollY > 40);
    scheduled = false;
  }
  window.addEventListener(
    "scroll",
    () => {
      if (!scheduled) {
        requestAnimationFrame(update);
        scheduled = true;
      }
    },
    { passive: true },
  );
  update();
  if (window.matchMedia("(pointer:fine)").matches) {
    document
      .querySelectorAll<HTMLElement>(
        ".service-card,.path-card,.team-card,.client-tile",
      )
      .forEach((card) => {
        card.addEventListener("pointermove", (event) => {
          if (paused) return;
          const r = card.getBoundingClientRect();
          card.style.setProperty("--pointer-x", `${event.clientX - r.left}px`);
          card.style.setProperty("--pointer-y", `${event.clientY - r.top}px`);
        });
      });
  }
}
