
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
const themeToggle = document.getElementById("themeToggle");
const typedRole = document.getElementById("typedRole");

// Mobile navigation
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Light and dark themes
themeToggle.addEventListener("click", () => {
  const isDark = document.body.classList.toggle("dark-theme");

  themeToggle.textContent = isDark ? "☾" : "☼";
  themeToggle.setAttribute(
    "aria-label",
    isDark ? "Switch to light theme" : "Switch to dark theme"
  );
});

// Animated role text
const roles = [
  "Full Stack Developer",
  "Student",
  "Innovator",
  "Creative Thinker"
];

let roleIndex = 0;
let characterIndex = roles[0].length;
let deleting = false;

function animateRole() {
  const currentRole = roles[roleIndex];

  if (deleting) {
    characterIndex--;
  } else {
    characterIndex++;
  }

  typedRole.textContent = currentRole.slice(0, characterIndex);

  let delay = deleting ? 45 : 85;

  if (!deleting && characterIndex === currentRole.length) {
    deleting = true;
    delay = 1500;
  } else if (deleting && characterIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 350;
  }

  window.setTimeout(animateRole, delay);
}

// Start the role animation after the page loads
window.addEventListener("load", () => {
  window.setTimeout(animateRole, 1800);
});

// Highlight the navigation link for the current section
const sections = document.querySelectorAll("main section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      navigationLinks.forEach((link) => {
        const matches = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("active", matches);
      });
    });
  },
  {
    rootMargin: "-25% 0px -60% 0px"
  }
);

sections.forEach((section) => observer.observe(section));

// Automatically update the footer year
document.getElementById("year").textContent = new Date().getFullYear();
