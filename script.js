
// ===================================
// PAGE LOADER
// ===================================

const pageLoader = document.getElementById("pageLoader");

window.addEventListener("load", () => {
  setTimeout(() => {
    pageLoader.classList.add("hide");
  }, 900);
});


// ===================================
// MOBILE NAVIGATION
// ===================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});


// ===================================
// TYPEWRITER ANIMATION
// ===================================

const typedText = document.getElementById("typedText");

const words = [
  "Developer",
  "Student",
  "Innovator",
  "Creative Thinker",
  "Problem Solver"
];

let wordIndex = 0;
let letterIndex = 0;
let deleting = false;

function typeEffect() {
  const currentWord = words[wordIndex];

  if (deleting) {
    letterIndex--;
  } else {
    letterIndex++;
  }

  typedText.textContent = currentWord.substring(0, letterIndex);

  let speed = deleting ? 45 : 95;

  if (!deleting && letterIndex === currentWord.length) {
    deleting = true;
    speed = 1700;
  }

  if (deleting && letterIndex === 0) {
    deleting = false;
    wordIndex = (wordIndex + 1) % words.length;
    speed = 350;
  }

  setTimeout(typeEffect, speed);
}

// Start typing after the opening animation
setTimeout(typeEffect, 1500);


// ===================================
// IMAGE FALLBACK
// ===================================

const profileImage = document.querySelector(".photo-frame img");
const photoPlaceholder = document.querySelector(".photo-placeholder");

function showFallback() {
  profileImage.style.display = "none";
  photoPlaceholder.style.display = "block";
}

profileImage.addEventListener("error", showFallback);

if (profileImage.complete && profileImage.naturalWidth === 0) {
  showFallback();
}


// ===================================
// SCROLL REVEAL FOR FEATURE CARDS
// ===================================

const cards = document.querySelectorAll(".feature-card");

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("card-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.15
  }
);

cards.forEach(card => {
  card.style.opacity = "0";
  card.style.transform = "translateY(25px)";
  card.style.transition = "opacity 0.7s ease, transform 0.7s ease";

  revealObserver.observe(card);
});


// Add visible card styling
const cardStyle = document.createElement("style");

cardStyle.textContent = `
  .feature-card.card-visible {
    opacity: 1 !important;
    transform: translateY(0) !important;
  }
`;

document.head.appendChild(cardStyle);


// ===================================
// FOOTER YEAR
// ===================================

document.getElementById("year").textContent =
  new Date().getFullYear();


// ===================================
// ACTIVE PAGE NAVIGATION
// ===================================

document.querySelectorAll(".nav-links a").forEach(link => {
  const currentPage = window.location.pathname.split("/").pop();
  const linkPage = link.getAttribute("href");

  if (linkPage === currentPage ||
      (currentPage === "" && linkPage === "index.html")) {
    link.classList.add("active");
  }
});
