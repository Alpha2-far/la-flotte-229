/* JavaScript natif uniquement : filtres et préparation d’un message WhatsApp. */
(() => {
  "use strict";

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
})();
