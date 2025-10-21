const currentTimeUTC = document.getElementById("currentTimeUTC");
const currentDay = document.getElementById("currentDay");

setInterval(() => {
  const now = new Date();
  const utcTime = now.toUTCString();
  const day = now.toLocaleDateString("en-US", { weekday: "long" });
  currentTimeUTC.textContent = utcTime;
  currentDay.textContent = day;
}, 1000);

// Mobile Menu Functionality
function initMobileMenu() {
  const mobileMenuToggle = document.querySelector(".mobile-menu-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const body = document.body;

  if (!mobileMenuToggle || !mobileNav) return;

  function toggleMenu() {
    const isActive = mobileNav.classList.contains("active");

    if (isActive) {
      // Close menu
      mobileNav.classList.remove("active");
      mobileMenuToggle.classList.remove("active");
      body.classList.remove("menu-open");
      mobileMenuToggle.setAttribute("aria-expanded", "false");
    } else {
      // Open menu
      mobileNav.classList.add("active");
      mobileMenuToggle.classList.add("active");
      body.classList.add("menu-open");
      mobileMenuToggle.setAttribute("aria-expanded", "true");
    }
  }

  function closeMenu() {
    mobileNav.classList.remove("active");
    mobileMenuToggle.classList.remove("active");
    body.classList.remove("menu-open");
    mobileMenuToggle.setAttribute("aria-expanded", "false");
  }

  mobileMenuToggle.addEventListener("click", toggleMenu);

  mobileNav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      closeMenu();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && mobileNav.classList.contains("active")) {
      closeMenu();
    }
  });

  document.addEventListener("click", (e) => {
    if (
      mobileNav.classList.contains("active") &&
      !mobileNav.contains(e.target) &&
      !mobileMenuToggle.contains(e.target)
    ) {
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 768 && mobileNav.classList.contains("active")) {
      closeMenu();
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  initMobileMenu();
});
