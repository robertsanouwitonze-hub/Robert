
const loader = document.getElementById("loader");

window.addEventListener("load", () => {
  setTimeout(() => loader?.classList.add("hidden"), 500);
});

const menuToggle = document.getElementById("menuToggle");
const navigation = document.getElementById("navigation");

menuToggle?.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

navigation?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

// Animated role text
const typedRole = document.getElementById("typedRole");
const roles = ["Developer", "Student", "Innovator", "Problem Solver"];
let roleIndex = 0;
let letterIndex = roles[0].length;
let deleting = true;

function typeEffect() {
  if (!typedRole) return;

  const current = roles[roleIndex];

  if (deleting) {
    letterIndex--;
    typedRole.textContent = current.substring(0, letterIndex);
  } else {
    letterIndex++;
    typedRole.textContent = current.substring(0, letterIndex);
  }

  let delay = deleting ? 55 : 100;

  if (!deleting && letterIndex === current.length) {
    deleting = true;
    delay = 1300;
  } else if (deleting && letterIndex === 0) {
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 350;
  }

  setTimeout(typeEffect, delay);
}

if (typedRole) setTimeout(typeEffect, 1400);

// Portrait fallback
const profileImage = document.getElementById("profileImage");
const portraitPlaceholder = document.getElementById("portraitPlaceholder");

if (profileImage) {
  profileImage.addEventListener("load", () => {
    portraitPlaceholder.style.display = "none";
  });

  profileImage.addEventListener("error", () => {
    profileImage.style.display = "none";
    portraitPlaceholder.style.display = "flex";
  });
}

// Footer year
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
