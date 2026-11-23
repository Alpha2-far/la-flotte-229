/* JavaScript natif : navigation, filtres, brouillon WhatsApp et apparitions. */
(() => {
  "use strict";

  let motion = null;

  const mobileMenu = document.querySelector(".mobile-menu");
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => { mobileMenu.open = false; });
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && mobileMenu.open) {
      mobileMenu.open = false;
      mobileMenu.querySelector("summary").focus();
    }
  });

  const filters = document.querySelector(".fleet-filters");
  const cards = [...document.querySelectorAll(".vehicle-card")];
  const count = document.getElementById("vehicle-count");
  const status = document.getElementById("filter-status");
  filters.hidden = false;
  filters.querySelectorAll("button").forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.filter;
      let visible = 0;
      cards.forEach((card) => {
        card.hidden = category !== "all" && card.dataset.category !== category;
        if (!card.hidden) visible += 1;
      });
      filters.querySelectorAll("button").forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      count.textContent = String(visible);
      status.textContent = `${visible} véhicules affichés.`;
      motion?.refresh();
    });
  });

  const form = document.getElementById("rental-form");
  const vehicle = document.getElementById("vehicle");
  const departure = document.getElementById("departure");
  const returnDate = document.getElementById("return");
  const error = document.getElementById("form-error");
  form.hidden = false;

  document.querySelectorAll("[data-vehicle]").forEach((link) => {
    link.addEventListener("click", () => {
      vehicle.value = link.dataset.vehicle;
    });
  });

  const localDateTime = (date) => {
    const shifted = new Date(date.getTime() - date.getTimezoneOffset() * 60000);
    return shifted.toISOString().slice(0, 16);
  };
  departure.min = localDateTime(new Date());
  returnDate.min = departure.min;

  function validateDates() {
    returnDate.min = departure.value || departure.min;
    const invalid = departure.value && returnDate.value &&
      new Date(returnDate.value) <= new Date(departure.value);
    returnDate.setCustomValidity(invalid ? "Le retour doit être après le départ." : "");
  }
  departure.addEventListener("input", validateDates);
  returnDate.addEventListener("input", validateDates);
  form.addEventListener("input", () => { error.hidden = true; });

  const formatDate = (value) => new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit"
  }).format(new Date(value));

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    validateDates();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const name = String(data.get("fullName")).trim();
    const phone = String(data.get("phone")).trim();
    if (!name || !phone) {
      error.textContent = "Indiquez votre nom et votre numéro de téléphone.";
      error.hidden = false;
      document.getElementById(!name ? "full-name" : "phone").focus();
      return;
    }
    const message = [
      "Bonjour La Flotte 229, je souhaite préparer une location.",
      "",
      `Nom : ${name}`,
      `Téléphone : ${phone}`,
      `Véhicule : ${data.get("vehicle")}`,
      `Départ : ${formatDate(String(data.get("departure")))}`,
      `Retour : ${formatDate(String(data.get("return")))}`,
      `Formule : ${data.get("formula")}`,
      ...(String(data.get("programme")).trim() ? [`Programme : ${String(data.get("programme")).trim()}`] : []),
      "",
      "Pouvez-vous me préciser la disponibilité, le tarif et les conditions ?"
    ].join("\n");

    const url = new URL("https://wa.me/22997816133");
    url.searchParams.set("text", message);
    const popup = window.open(url.href, "_blank");
    if (popup) popup.opener = null;
    else window.location.assign(url.href);
  });

  // Le contenu et le SEO restent dans l’HTML d’origine. Les annotations
  // d’animation sont ajoutées seulement lorsque le navigateur les prend en charge.
  function initMotion() {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reducedMotion.matches || !("IntersectionObserver" in window) ||
        !window.CSS?.supports("translate", "0 1px")) return null;

    const smallScreen = window.matchMedia("(max-width: 639px)");
    const configurations = new Map();
    const waiting = new Set();
    const completed = new Set();
    const running = new Set();
    let observer = null;
    let observerMobile = null;
    let scheduled = false;
    let enabled = true;

    const timings = {
      text: { duration: 600, mobileDuration: 400, distance: 24, mobileDistance: 12 },
      image: { duration: 650, mobileDuration: 450, distance: 28, mobileDistance: 16 },
      collage: { duration: 650, mobileDuration: 450, distance: 20, mobileDistance: 12 },
      panel: { duration: 550, mobileDuration: 400, distance: 16, mobileDistance: 8 },
      hero: { duration: 550, mobileDuration: 400, distance: 24, mobileDistance: 12 }
    };

    function add(selector, options = {}) {
      document.querySelectorAll(selector).forEach((element) => {
        configurations.set(element, { kind: "text", delay: 0, ...options });
      });
    }

    add(".hero-copy .eyebrow", { kind: "hero" });
    add(".hero-copy h1", { kind: "hero", delay: 80, mobileDelay: 40 });
    add(".hero-description", { kind: "hero", delay: 160, mobileDelay: 80 });
    add(".hero-copy .button", { kind: "hero", delay: 240, mobileDelay: 120 });
    add(".destination-card", { kind: "image", delay: 120, mobileDelay: 0 });
    add(".about .eyebrow, .about h2");
    add(".photo-collage", { kind: "collage", delay: 100, mobileDelay: 60 });
    add(".about .narrow-copy, .about .button-group");

    // Les enfants bougent ; le conteneur sticky des services reste en place.
    add(".section-intro > .eyebrow, .section-intro > h2");
    add(".section-intro > p:not(.eyebrow)", { delay: 80, mobileDelay: 0 });
    add(".section-intro > .button", { delay: 160, mobileDelay: 0 });
    add(".service-row > img", { kind: "image" });
    add(".service-copy", { delay: 100, mobileDelay: 60 });
    add(".commitment-intro");
    add(".commitment-panel", { kind: "panel", delay: 100, mobileDelay: 0 });

    add(".fleet-heading > div");
    add(".fleet-heading > p, .fleet-toolbar", { delay: 80, mobileDelay: 0 });
    add(".vehicle-card, .fleet-help", { kind: "image", group: ".fleet-grid" });
    add(".booking-process > .container > .eyebrow, .booking-process h2");
    add(".process-grid > li", { group: ".process-grid" });
    add(".booking-process > .container > .button");
    add(".faq-layout > div:first-child, .faq-list > details");
    add(".contact-intro");
    add(".request-panel", { kind: "panel", delay: 100, mobileDelay: 0 });
    add(".footer-statement, .footer-bottom");
    add(".footer-grid > div", { group: ".footer-grid" });

    function finish(element) {
      completed.add(element);
      waiting.delete(element);
      running.delete(element);
      element.classList.remove("motion-pending", "motion-revealing");
      observer?.unobserve(element);
    }

    function stop() {
      enabled = false;
      observer?.disconnect();
      configurations.forEach((_, element) => finish(element));
    }

    function reveal(element) {
      if (!enabled || completed.has(element) || element.hidden) return;
      completed.add(element);
      waiting.delete(element);
      observer.unobserve(element);
      running.add(element);
      element.classList.add("motion-revealing");
      element.classList.remove("motion-pending");
    }

    function updateTimings() {
      const mobile = smallScreen.matches;
      waiting.forEach((element) => {
        const config = configurations.get(element);
        const timing = timings[config.kind];
        let delay = mobile ? (config.mobileDelay ?? 0) : config.delay;
        if (config.group) {
          const group = element.closest(config.group);
          const columns = getComputedStyle(group).gridTemplateColumns.split(/\s+/).length;
          const visible = [...group.children].filter((child) => !child.hidden);
          delay = mobile ? 0 : (visible.indexOf(element) % columns) * 80;
        }
        element.style.setProperty("--motion-delay", `${delay}ms`);
        element.style.setProperty("--motion-duration", `${mobile ? timing.mobileDuration : timing.duration}ms`);
        element.style.setProperty("--motion-distance", `${mobile ? timing.mobileDistance : timing.distance}px`);
      });
    }

    function updateObserver() {
      if (observer && observerMobile === smallScreen.matches) return;
      observer?.disconnect();
      observerMobile = smallScreen.matches;
      observer = new IntersectionObserver((entries) => {
        try {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.1) reveal(entry.target);
          });
        } catch { stop(); }
      }, { threshold: 0.1, rootMargin: `0px 0px -${observerMobile ? 32 : 64}px 0px` });
      waiting.forEach((element) => { if (!element.hidden) observer.observe(element); });
    }

    function revealVisible() {
      const headerHeight = document.querySelector(".site-header").getBoundingClientRect().height;
      const bottom = window.innerHeight - (smallScreen.matches ? 32 : 64);
      waiting.forEach((element) => {
        if (element.hidden) {
          observer.unobserve(element);
          return;
        }
        const rect = element.getBoundingClientRect();
        const visibleHeight = Math.min(rect.bottom, bottom) - Math.max(rect.top, headerHeight);
        if (rect.height > 0 && visibleHeight >= rect.height * 0.1) reveal(element);
        else observer.observe(element);
      });
    }

    function refresh() {
      running.forEach((element) => { if (element.hidden) finish(element); });
      if (!enabled || scheduled) return;
      scheduled = true;
      requestAnimationFrame(() => {
        scheduled = false;
        if (!enabled) return;
        try {
          updateTimings();
          updateObserver();
          revealVisible();
        } catch { stop(); }
      });
    }

    function revealWithin(target) {
      if (!target) return;
      configurations.forEach((_, element) => {
        if (target.contains(element) || element.contains(target)) finish(element);
      });
    }

    function revealAnchor(hash) {
      try { revealWithin(document.getElementById(decodeURIComponent(hash.slice(1)))); }
      catch { /* Une ancre invalide conserve le comportement natif du navigateur. */ }
    }

    try {
      updateObserver(); // Rien n’est masqué avant la création réussie de l’observateur.
      configurations.forEach((config, element) => {
        element.dataset.motion = config.kind;
        element.classList.add("motion-item", "motion-pending");
        waiting.add(element);
      });
      updateTimings();
      waiting.forEach((element) => observer.observe(element));
      if (window.location.hash) revealAnchor(window.location.hash);

      ["animationend", "animationcancel"].forEach((type) => {
        document.addEventListener(type, (event) => {
          if (event.animationName === "flotte-reveal" && running.has(event.target)) finish(event.target);
        });
      });
      document.addEventListener("focusin", (event) => revealWithin(event.target));
      document.addEventListener("click", (event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        const link = event.target.closest('a[href^="#"]');
        if (link) revealAnchor(link.getAttribute("href"));
      });
      window.addEventListener("hashchange", () => {
        revealAnchor(window.location.hash);
        refresh();
      });
      window.addEventListener("resize", refresh, { passive: true });
      window.addEventListener("pageshow", (event) => { if (event.persisted) stop(); });
      reducedMotion.addEventListener("change", (event) => { if (event.matches) stop(); });
      refresh();
      return { refresh };
    } catch {
      stop();
      return null;
    }
  }

  motion = initMotion();
})();
