document.addEventListener("DOMContentLoaded", function () {
  // ========== MOBILE MENU ==========
  const menuToggle = document.getElementById("menuToggle");
  const mobileMenu = document.getElementById("mobileMenu");

  const closeMobileMenu = () => {
    mobileMenu?.classList.add("hidden");
    menuToggle?.setAttribute("aria-expanded", "false");
  };

  if (menuToggle && mobileMenu) {
    menuToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      const isOpen = !mobileMenu.classList.contains("hidden");
      mobileMenu.classList.toggle("hidden");
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
    });

    document.addEventListener("click", function (e) {
      if (
        !mobileMenu.classList.contains("hidden") &&
        !mobileMenu.contains(e.target) &&
        !menuToggle.contains(e.target)
      ) {
        closeMobileMenu();
      }
    });
  }

  // Close menu when a nav link is clicked
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", closeMobileMenu);
  });

  // ========== PROJECT FILTERING ==========
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projectCards = document.querySelectorAll(".project-card");

  const activeClasses = ["border-brand-500", "bg-brand-500", "text-white"];
  const inactiveClasses = ["border-ink-200", "bg-white", "text-ink-700"];

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter");

      filterBtns.forEach((b) => {
        b.classList.remove(...activeClasses);
        b.classList.add(...inactiveClasses);
      });
      this.classList.remove(...inactiveClasses);
      this.classList.add(...activeClasses);

      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category");
        const show = filter === "tous" || category === filter;

        if (show) {
          card.classList.remove("hidden");
          requestAnimationFrame(() => {
            card.classList.remove("opacity-0", "scale-95");
          });
        } else {
          card.classList.add("opacity-0", "scale-95");
          setTimeout(() => card.classList.add("hidden"), 250);
        }
      });
    });
  });

  // ========== SCROLL REVEAL ==========
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  // ========== CONTACT FORM ==========
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Merci pour votre message ! Je vous répondrai bientôt.");
      contactForm.reset();
    });
  }
});
