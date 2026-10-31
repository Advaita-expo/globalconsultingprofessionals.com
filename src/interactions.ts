import { arrow, northeast, check, icon, services, team } from "./content";

export function initInteractions() {
  function renderServices(group: string) {
    const panel = document.querySelector<HTMLDivElement>("#expertise-panel");
    if (!panel) return;
    panel.setAttribute("aria-labelledby", `tab-${group}`);
    panel.innerHTML = services
      .filter((s) => s.group === group)
      .map((s) => {
        const i = services.indexOf(s);
        return `<button class="service-card" data-service="${i}" aria-label="Explore ${s.name}"><span class="service-card-top"><span class="service-icon">${icon(s.icon)}</span><span class="service-index">0${i + 1}</span></span><h3>${s.name}</h3><p>${s.text}</p><span class="service-card-bottom">Explore this expertise <span>${northeast}</span></span></button>`;
      })
      .join("");
  }
  renderServices("people");

  let selectedOffice = "us";
  const offices: Record<
    string,
    {
      name: string;
      email: string;
      phones: { label: string; number: string }[];
      zone: string;
    }
  > = {
    us: {
      name: "United States",
      email: "deepak@globalconsultingprofessionals.com",
      phones: [{ label: "+1 412 455 6125", number: "+14124556125" }],
      zone: "America/New_York",
    },
    india: {
      name: "Bangalore, India",
      email: "recruiting@global-pros.com",
      phones: [
        { label: "+91 99700 09816", number: "+919970009816" },
        { label: "+91 88844 43822", number: "+918884443822" },
      ],
      zone: "Asia/Kolkata",
    },
  };
  function renderOffice() {
    const office = offices[selectedOffice];
    const time = new Intl.DateTimeFormat("en", {
      hour: "numeric",
      minute: "2-digit",
      timeZone: office.zone,
    }).format(new Date());
    const el = document.querySelector<HTMLDivElement>("#office-details");
    if (!el) return;
    el.setAttribute("aria-labelledby", `office-${selectedOffice}`);
    el.innerHTML = `<div class="office-meta"><span>${office.name}</span><span><i></i> ${time} local time</span></div><a class="office-email" href="mailto:${office.email}">${office.email} ${northeast}</a><div class="office-phones">${office.phones.map((p) => `<a href="tel:${p.number}">${p.label}</a>`).join("<span>/</span>")}</div>`;
  }
  renderOffice();
  setInterval(renderOffice, 60000);

  const dialog = document.querySelector<HTMLDialogElement>("#detail-dialog")!;
  const dialogContent =
    document.querySelector<HTMLDivElement>("#dialog-content")!;
  function openDialog(html: string) {
    dialogContent.innerHTML = html;
    dialog.showModal();
    document.body.classList.add("dialog-open");
  }
  function closeDialog() {
    dialog.close();
  }
  dialog.addEventListener("close", () =>
    document.body.classList.remove("dialog-open"),
  );
  dialog.querySelector(".dialog-close")!.addEventListener("click", closeDialog);
  dialog.addEventListener("click", (e) => {
    if (e.target === dialog) {
      const r = dialog.getBoundingClientRect();
      const m = e as MouseEvent;
      if (
        m.clientX < r.left ||
        m.clientX > r.right ||
        m.clientY < r.top ||
        m.clientY > r.bottom
      )
        closeDialog();
    }
  });

  function setInterest(value: string) {
    if (!document.querySelector("#contact-interest")) {
      window.location.href = "/contact/?interest=" + encodeURIComponent(value);
      return;
    }
    if (dialog.open) closeDialog();
    document.querySelector<HTMLSelectElement>("#contact-interest")!.value =
      value;
    document.querySelector("#contact")!.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
    setTimeout(
      () =>
        document
          .querySelector<HTMLTextAreaElement>('[name="message"]')!
          .focus({ preventScroll: true }),
      400,
    );
  }

  document.addEventListener("click", (e) => {
    const target = (e.target as HTMLElement).closest<HTMLElement>("button");
    if (!target) return;
    if (target.dataset.category) {
      document
        .querySelectorAll<HTMLButtonElement>(".expertise-tab")
        .forEach((b) => {
          const active = b === target;
          b.classList.toggle("active", active);
          b.setAttribute("aria-selected", String(active));
          b.tabIndex = active ? 0 : -1;
        });
      renderServices(target.dataset.category);
    }
    if (target.dataset.office) {
      selectedOffice = target.dataset.office;
      document
        .querySelectorAll<HTMLButtonElement>("[data-office]")
        .forEach((b) => {
          const active = b === target;
          b.setAttribute("aria-selected", String(active));
          b.tabIndex = active ? 0 : -1;
        });
      renderOffice();
    }
    if (target.dataset.service !== undefined) {
      const service = services[Number(target.dataset.service)];
      openDialog(
        `<p class="eyebrow">DOMAIN EXPERTISE / GCP</p><span class="dialog-icon">${icon(service.icon)}</span><h2 id="dialog-title">${service.name}</h2><p class="dialog-intro">${service.intro}</p><h3>Where we can help</h3><ul class="check-list">${service.items.map((t) => `<li>${check}<span>${t}</span></li>`).join("")}</ul><button class="button" data-interest="${service.name}">Discuss your needs ${arrow}</button>`,
      );
    }
    if (target.dataset.person !== undefined) {
      const i = Number(target.dataset.person);
      const p = team[i];
      openDialog(
        `<p class="eyebrow">OUR MANAGEMENT ADVISORY TEAM</p><div class="profile-header"><span class="team-portrait ${i === 4 ? "portrait-tuhin" : ""}"><img src="/assets/${p.image}" alt="${p.name}"/></span><div><h2 id="dialog-title">${p.name}</h2><span class="profile-specialty">${p.specialty}</span></div></div><p class="dialog-intro">${p.bio}</p><h3>Experience & perspective</h3><ul class="check-list">${p.points.map((t) => `<li>${check}<span>${t}</span></li>`).join("")}</ul><button class="button" data-interest="General inquiry">Connect with our team ${arrow}</button>`,
      );
    }
    if (target.dataset.interest) setInterest(target.dataset.interest);
    if (target.dataset.action === "clients")
      openDialog(
        `<p class="eyebrow">GLOBAL PERSPECTIVE / REAL EXPERIENCE</p><h2 id="dialog-title">Experience across<br/><em>leading organizations.</em></h2><p class="dialog-intro">Our team’s collective professional experience includes work with organizations across technology, finance, healthcare, consumer goods, energy, and retail.</p><div class="client-name-grid">${["GE", "Oracle", "Microsoft", "Unilever", "Diageo", "American Express", "Novartis", "Johnson & Johnson", "Macquarie", "Alcon", "Mondelēz", "Pfizer", "Nomura", "United Spirits", "Shell", "Tesco"].map((n) => `<span>${n}</span>`).join("")}</div><p class="dialog-footnote">Reflects team members’ collective professional experience, as listed on GCP’s existing website.</p>`,
      );
    if (target.dataset.action === "privacy")
      openDialog(
        `<p class="eyebrow">YOUR INFORMATION</p><h2 id="dialog-title">Privacy, kept simple.</h2><p class="dialog-intro">This website’s inquiry form prepares an email in your own email app. Your message reaches GCP only when you choose to send it.</p><h3>What this website does</h3><ul class="check-list"><li>${check}<span>Form entries stay in your current browser session until you open or copy your email draft. This website does not store inquiries on a server.</span></li><li>${check}<span>No advertising cookies, tracking analytics, or third-party embeds are included.</span></li><li>${check}<span>Fonts, GIFs, and imagery are served with this website.</span></li></ul><p>For questions about information you send to GCP, contact <a href="mailto:deepak@globalconsultingprofessionals.com">deepak@globalconsultingprofessionals.com</a>.</p>`,
      );
  });

  document.querySelectorAll<HTMLElement>('[role="tablist"]').forEach((list) =>
    list.addEventListener("keydown", (e) => {
      if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) return;
      const tabs = Array.from(
        list.querySelectorAll<HTMLButtonElement>('[role="tab"]'),
      );
      const current = tabs.indexOf(document.activeElement as HTMLButtonElement);
      const next =
        e.key === "Home"
          ? 0
          : e.key === "End"
            ? tabs.length - 1
            : (current + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) %
              tabs.length;
      e.preventDefault();
      tabs[next].focus();
      tabs[next].click();
    }),
  );

  const menuButton = document.querySelector<HTMLButtonElement>(".menu-toggle")!;
  const mobileNav = document.querySelector<HTMLElement>(".mobile-nav")!;
  function closeMenu() {
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Open navigation");
    mobileNav.hidden = true;
  }
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") !== "true";
    menuButton.setAttribute("aria-expanded", String(open));
    menuButton.setAttribute(
      "aria-label",
      open ? "Close navigation" : "Open navigation",
    );
    mobileNav.hidden = !open;
  });
  mobileNav
    .querySelectorAll("a")
    .forEach((a) => a.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
  window.matchMedia("(min-width: 901px)").addEventListener("change", (e) => {
    if (e.matches) closeMenu();
  });

  const form = document.querySelector<HTMLFormElement>("#contact-form");
  if (form) {
    const requestedInterest = new URLSearchParams(location.search).get(
      "interest",
    );
    const select =
      document.querySelector<HTMLSelectElement>("#contact-interest")!;
    if (
      requestedInterest &&
      Array.from(select.options).some((o) => o.value === requestedInterest)
    )
      select.value = requestedInterest;
    let preparedInquiry = "";
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.reportValidity()) return;
      const data = new FormData(form);
      const name = String(data.get("name")).trim();
      const email = String(data.get("email")).trim();
      const company = String(data.get("company") || "").trim();
      const interest = String(data.get("interest"));
      const message = String(data.get("message")).trim();
      if (!name || !message) {
        const field = form.querySelector<
          HTMLInputElement | HTMLTextAreaElement
        >(!name ? '[name="name"]' : '[name="message"]')!;
        field.setCustomValidity("Please enter more than spaces.");
        field.reportValidity();
        field.addEventListener("input", () => field.setCustomValidity(""), {
          once: true,
        });
        return;
      }
      preparedInquiry = `Hello GCP team,\n\n${message}\n\nArea of interest: ${interest}\nName: ${name}\nEmail: ${email}${company ? `\nCompany: ${company}` : ""}\nPreferred office: ${offices[selectedOffice].name}`;
      const mailto = `mailto:${offices[selectedOffice].email}?subject=${encodeURIComponent(`GCP inquiry: ${interest} — ${name}`)}&body=${encodeURIComponent(preparedInquiry)}`;
      const anchor = document.createElement("a");
      anchor.href = mailto;
      anchor.click();
      const status =
        document.querySelector<HTMLParagraphElement>("#form-status")!;
      status.hidden = false;
      status.textContent =
        "Your email draft is ready. Review and send it in your email app. If it did not open, copy your inquiry below and email our team.";
      document.querySelector<HTMLButtonElement>("#copy-inquiry")!.hidden =
        false;
    });
    document
      .querySelector("#copy-inquiry")!
      .addEventListener("click", async () => {
        try {
          await navigator.clipboard.writeText(preparedInquiry);
          document.querySelector("#form-status")!.textContent =
            `Inquiry copied. Paste it into an email to ${offices[selectedOffice].email}.`;
        } catch {
          openDialog(
            '<p class="eyebrow">YOUR INQUIRY</p><h2 id="dialog-title">Copy your message.</h2><p>Select and copy the text below into your email app.</p><textarea class="inquiry-fallback" readonly aria-label="Prepared inquiry"></textarea>',
          );
          const text = dialog.querySelector<HTMLTextAreaElement>("textarea")!;
          text.value = preparedInquiry;
          text.focus();
          text.select();
        }
      });
  }

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;
  if ("IntersectionObserver" in window && !reducedMotion) {
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            observer.unobserve(e.target);
          }
        }),
      { threshold: 0.08 },
    );
    document.querySelectorAll(".reveal").forEach((el) => {
      el.classList.add("reveal-ready");
      observer.observe(el);
    });
  }
}
