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
        // Centrar el contenedor solo si se estÃƒÂ¡ expandiendo
        if (content.style.display === "block") {
          container.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    });
  });

  /**
   * Add expand/collapse functionality for each section.  Each
   * section header includes two buttons (``.expand-all`` and
   * ``.collapse-all``) with a data attribute (``data-section-id``)
   * specifying which section they control.  Clicking "Expand All"
   * will open every collapsible entry in that section and scroll
   * the section into view.  Clicking "Collapse All" will close all
   * entries and also bring the section header into view.
   */
  const expandButtons = document.querySelectorAll('.expand-all');
  const collapseButtons = document.querySelectorAll('.collapse-all');

  expandButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const sectionId = btn.dataset.sectionId;
      const section = document.getElementById(sectionId);
      if (!section) return;
      // Expand every collapsible within the section
      section.querySelectorAll('.collapsible').forEach(collBtn => {
        const container = collBtn.closest('.collapsible-container');
        const content = container ? container.nextElementSibling : null;
        collBtn.classList.add('active');
        if (content && content.classList.contains('content')) {
          content.style.display = 'block';
        }
      });
      // Scroll the section header into view (just below the fixed nav bar)
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 0;
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: sectionTop - headerHeight - 10, behavior: 'smooth' });
    });
  });

  collapseButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const sectionId = btn.dataset.sectionId;
      const section = document.getElementById(sectionId);
      if (!section) return;
      // Collapse every collapsible within the section
      section.querySelectorAll('.collapsible').forEach(collBtn => {
        const container = collBtn.closest('.collapsible-container');
        const content = container ? container.nextElementSibling : null;
        collBtn.classList.remove('active');
        if (content && content.classList.contains('content')) {
          content.style.display = 'none';
        }
      });
      // Scroll the section header into view (below fixed nav bar)
      const header = document.querySelector('header');
      const headerHeight = header ? header.offsetHeight : 0;
      const sectionTop = section.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({ top: sectionTop - headerHeight - 10, behavior: 'smooth' });
    });
  });

  // Scroll suave para los enlaces de la navbar, compensando la altura del header fijo
  document.querySelectorAll('.nav-links a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href').slice(1);
      const targetSection = document.getElementById(targetId);
      if (targetSection) {
        e.preventDefault();
        const header = document.querySelector('header');
        const headerHeight = header ? header.offsetHeight : 0;
        const sectionTop = targetSection.getBoundingClientRect().top + window.pageYOffset;
        window.scrollTo({
          top: sectionTop - headerHeight - 10, // el -10 es un pequeÃƒÂ±o margen opcional
          behavior: 'smooth'
        });
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
  // display the modal. Allow closing via the Ãƒâ€” button or clicking
  // outside the modal content.
  const contactLinks = document.querySelectorAll(".contact-link");
  const contactModal = document.getElementById("contact-modal");
  const closeBtn = contactModal ? contactModal.querySelector(".close-button") : null;
  if (contactLinks.length && contactModal && closeBtn) {
    contactLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        contactModal.style.display = "flex";
      });
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

  // Handle meeting modal open/close. When the schedule link is clicked,
  // display the Calendly modal. Allow closing via the Ãƒâ€” button or clicking
  // outside the modal content.
  const scheduleLinks = document.querySelectorAll(".schedule-link");
  const meetingModal = document.getElementById("meeting-modal");
  const closeMeetingBtn = meetingModal ? meetingModal.querySelector(".close-button") : null;
  if (scheduleLinks.length && meetingModal && closeMeetingBtn) {
    scheduleLinks.forEach(link => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        meetingModal.style.display = "flex";
      });
    });
    closeMeetingBtn.addEventListener("click", () => {
      meetingModal.style.display = "none";
    });
    window.addEventListener("click", (e) => {
      if (e.target === meetingModal) {
        meetingModal.style.display = "none";
      }
    });
  }

  // After all handlers have been attached, apply dynamic numbering to
  // all collapsible entries across projects, experience, education and
  // certifications.  This ensures numbers update automatically when
  // entries are added or removed.  Without this call the old arrow
  // symbols may still appear in some browsers.
  applyNumbering();
});

/**
 * Dynamically number all collapsible entries in the specified sections.
 * The function scans each section (projects, experience, education and
 * certifications) for buttons with class ``collapsible`` and prepends
 * a ``<span>`` with the number (e.g., "1. ") to the title.  If a
 * previous numbering span exists (identified by the class ``entry-number``),
 * it is removed to avoid duplication.  This numbering runs once when
 * the DOM loads but can be invoked again if entries are dynamically
 * inserted later.
 */
function applyNumbering() {
  const sectionIds = ['projects', 'experience', 'education', 'certifications'];
  sectionIds.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (!section) return;
    // Remove existing numbering spans
    section.querySelectorAll('.entry-number').forEach(span => span.remove());
    // Enumerate collapsible buttons in the section
    const buttons = section.querySelectorAll('.collapsible');
    buttons.forEach((btn, idx) => {
      const titleSpan = btn.querySelector('.title');
      if (!titleSpan) return;
      // Create a new number span
      const numberSpan = document.createElement('span');
      numberSpan.className = 'entry-number';
      numberSpan.textContent = (idx + 1) + '. ';
      numberSpan.style.fontWeight = 'bold';
      // Prepend number before the existing title content
      titleSpan.insertBefore(numberSpan, titleSpan.firstChild);
    });
  });
}

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

/**
 * Dynamically number all collapsible entries in the specified sections.
 * This function scans each section (projects, experience, education
 * and certifications) for collapsible buttons and prepends a number
 * (e.g. "1. ") to the title.  If a number already exists from a
 * previous run, it is removed before inserting the new numbering.
 */
function applyNumbering() {
  const sectionIds = ['projects', 'experience', 'education', 'certifications'];
  sectionIds.forEach(sectionId => {
    const section = document.getElementById(sectionId);
    if (!section) return;
    // Remove existing numbering spans to avoid duplication
    section.querySelectorAll('.entry-number').forEach(span => span.remove());
    const buttons = section.querySelectorAll('.collapsible');
    buttons.forEach((btn, idx) => {
      const titleSpan = btn.querySelector('.title');
      if (titleSpan) {
        const numberSpan = document.createElement('span');
        numberSpan.className = 'entry-number';
        numberSpan.textContent = (idx + 1) + '. ';
        numberSpan.style.fontWeight = 'bold';
        // Prepend number before all other nodes in title
        titleSpan.insertBefore(numberSpan, titleSpan.firstChild);
      }
    });
  });
}

// Apply numbering after the DOM and language have been set.  This
// ensures that numbering appears for the visible titles in either
// language.  Numbering is called once at load time but can be
// reÃ¢â‚¬â€˜executed if new entries are dynamically inserted in the future.
document.addEventListener('DOMContentLoaded', () => {
  applyNumbering();
});

// Configure the particle animation in the background. See
// https://github.com/VincentGarreau/particles.js for more options.
particlesJS("particles-js", {
  particles: {
    number: {
      value: 60,
      density: { enable: true, value_area: 700 },
    },
    // Cambia el color a blanco para mayor contraste
    color: { value: "#ffffff" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#ffffff" },
      polygon: { nb_sides: 5 },
    },
    // Aumenta la opacidad
    opacity: { value: 0.7, random: true },
    // Aumenta el tamaÃƒÂ±o
    size: { value: 3.5, random: true },
    line_linked: {
      enable: true,
      distance: 130,
      color: "#ffffff",
      opacity: 0.5,
      width: 1.2,
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