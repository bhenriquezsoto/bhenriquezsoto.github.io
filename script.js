/*
 * Custom JavaScript for Benjamin's portfolio.
 *
 * This script enables collapsible sections for project, experience and
 * education entries. When a user clicks on a collapsible button, the
 * corresponding details section toggles between visible and hidden states.
 * It also initializes a particle animation in the background using
 * particles.js and provides a simple language switcher that toggles
 * between English and Spanish translations.
 */

// Wait for the DOM to be fully loaded before attaching event handlers.
document.addEventListener("DOMContentLoaded", () => {
  /**
   * Attach click event listeners to every element with the class
   * ``collapsible``. When clicked, the element toggles an ``active``
   * class and shows or hides the adjacent ``content`` element.
   */
  const collapsibles = document.querySelectorAll(".collapsible");
  collapsibles.forEach((button) => {
    button.addEventListener("click", function () {
      this.classList.toggle("active");
      const container = this.closest(".collapsible-container");
      const content = container ? container.nextElementSibling : null;
      if (content && content.classList.contains("content")) {
        content.style.display = content.style.display === "block" ? "none" : "block";
      }
    });
  });

  /**
   * Load the previously selected language from localStorage (if any) or
   * default to Spanish.  Then apply the language settings to the page.
   */
  const savedLanguage = localStorage.getItem("selectedLanguage") || "es";
  setLanguage(savedLanguage);

  // Attach click handlers to the language buttons.  When a button is clicked
  // the chosen language is stored in localStorage and the UI is updated.
  const langButtons = document.querySelectorAll(".lang-button");
  langButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const lang = btn.getAttribute("data-lang");
      localStorage.setItem("selectedLanguage", lang);
      setLanguage(lang);
    });
  });

  // Handle contact modal open/close. When the contact link is clicked,
  // display the modal. Allow closing via the × button or clicking
  // outside the modal content.
  const contactLink = document.getElementById("contact-link");
  const contactModal = document.getElementById("contact-modal");
  const closeBtn = contactModal ? contactModal.querySelector(".close-button") : null;
  if (contactLink && contactModal && closeBtn) {
    contactLink.addEventListener("click", (e) => {
      e.preventDefault();
      contactModal.style.display = "flex";
    });
    closeBtn.addEventListener("click", () => {
      contactModal.style.display = "none";
    });
    window.addEventListener("click", (e) => {
      if (e.target === contactModal) {
        contactModal.style.display = "none";
      }
    });
  }
});

/**
 * Toggle the visibility of elements based on the selected language.
 *
 * Elements marked with ``.lang-en`` will only be shown when ``lang`` is
 * ``'en'`` and hidden otherwise.  Conversely, elements marked with
 * ``.lang-es`` will only be shown when ``lang`` is ``'es'``.  The
 * ``lang`` attribute of the ``html`` element is also updated for
 * accessibility and search engines.
 *
 * @param {string} lang - Two-letter language code ('en' or 'es').
 */
function setLanguage(lang) {
  // Update the html ``lang`` attribute.
  document.documentElement.setAttribute("lang", lang);
  // Toggle English elements.
  document.querySelectorAll(".lang-en").forEach((el) => {
    el.style.display = lang === "en" ? "" : "none";
  });
  // Toggle Spanish elements.
  document.querySelectorAll(".lang-es").forEach((el) => {
    el.style.display = lang === "es" ? "" : "none";
  });

  // Optionally highlight the active language button.
  document.querySelectorAll(".lang-button").forEach((btn) => {
    if (btn.getAttribute("data-lang") === lang) {
      btn.classList.add("active-lang");
    } else {
      btn.classList.remove("active-lang");
    }
  });
}

// Configure the particle animation in the background. See
// https://github.com/VincentGarreau/particles.js for more options.
particlesJS("particles-js", {
  particles: {
    number: {
      value: 60,
      density: { enable: true, value_area: 700 },
    },
    // Use a soft purple palette distinct from the original theme
    color: { value: "#b6a7d8" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#ffffff" },
      polygon: { nb_sides: 5 },
    },
    opacity: { value: 0.4, random: true },
    size: { value: 2.5, random: true },
    line_linked: {
      enable: true,
      distance: 130,
      color: "#7f57c1",
      opacity: 0.3,
      width: 1,
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: true, mode: "grab" },
      onclick: { enable: false },
      resize: true,
    },
    modes: {
      grab: { distance: 140, line_linked: { opacity: 1 } },
    },
  },
  retina_detect: true,
});