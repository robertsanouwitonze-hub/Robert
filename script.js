(() => {
  const intro = document.getElementById("intro");
  const site = document.getElementById("site");
  const stages = [
    document.getElementById("stageBoot"),
    document.getElementById("stageGlitch"),
    document.getElementById("stageAccess")
  ];
  const progressFill = document.getElementById("progressFill");
  const progressNumber = document.getElementById("progressNumber");
  const bootStatus = document.getElementById("bootStatus");
  const skip = document.getElementById("skipIntro");
  const canvas = document.getElementById("matrixCanvas");
  const ctx = canvas.getContext("2d");
  let introFinished = false;
  let animationFrame = 0;
  let columns = [];
  let fontSize = 15;

  // Decorative falling-code canvas, created locally; no external image dependency.
  function resizeCanvas() {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.floor(window.innerWidth * ratio);
    canvas.height = Math.floor(window.innerHeight * ratio);
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    fontSize = window.innerWidth < 600 ? 12 : 15;
    columns = Array.from({ length: Math.ceil(window.innerWidth / fontSize) }, () => Math.random() * -80);
  }
  function drawMatrix() {
    if (introFinished) return;
    ctx.fillStyle = "rgba(0, 0, 0, 0.11)";
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    ctx.font = `${fontSize}px "Share Tech Mono", monospace`;
    for (let i = 0; i < columns.length; i++) {
      const glyph = Math.random() > .5 ? "01" : "><";
      ctx.fillStyle = Math.random() > .93 ? "#ff4054" : "#a30d23";
      ctx.fillText(glyph, i * fontSize, columns[i] * fontSize);
      if (columns[i] * fontSize > window.innerHeight && Math.random() > .975) columns[i] = 0;
      columns[i] += .55 + Math.random() * .65;
    }
    animationFrame = requestAnimationFrame(drawMatrix);
  }
  resizeCanvas();
  drawMatrix();
  window.addEventListener("resize", resizeCanvas);

  function showStage(index) {
    stages.forEach((stage, i) => stage.classList.toggle("active", i === index));
    document.getElementById("buildVersion").textContent =
      ["BOOT SEQUENCE / 01", "SIGNAL INTERRUPTION / 02", "AUTHORIZATION / 03"][index];
  }
  function finishIntro() {
    if (introFinished) return;
    introFinished = true;
    cancelAnimationFrame(animationFrame);
    intro.classList.add("finished");
    site.classList.add("ready");
    site.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "";
    startTyping();
    setTimeout(() => { intro.style.display = "none"; }, 900);
  }
  skip.addEventListener("click", finishIntro);

  // Short cinematic sequence: loading -> simulated glitch -> green access granted.
  document.body.style.overflow = "hidden";
  const start = performance.now();
  const bootDuration = 3100;
  const progressTimer = setInterval(() => {
    if (introFinished) { clearInterval(progressTimer); return; }
    const elapsed = performance.now() - start;
    const pct = Math.min(100, Math.round((elapsed / bootDuration) * 100));
    progressFill.style.width = pct + "%";
    progressNumber.textContent = String(pct).padStart(2, "0") + "%";
    if (pct > 24) bootStatus.textContent = "CHECKING SYSTEM MODULES...";
    if (pct > 62) bootStatus.textContent = "PREPARING USER ENVIRONMENT...";
    if (pct >= 100) clearInterval(progressTimer);
  }, 35);
  setTimeout(() => { if (!introFinished) showStage(1); }, 3300);
  setTimeout(() => { if (!introFinished) showStage(2); }, 5000);
  setTimeout(finishIntro, 7200);

  // Infinite type/delete role animation.
  const typedRole = document.getElementById("typedRole");
  const roles = ["I'm a Student", "I'm a Full Stack Developer", "I'm an Innovator", "I'm a Designer"];
  let roleIndex = 0, charIndex = roles[0].length, deleting = true, typingStarted = false;
  function startTyping() {
    if (typingStarted) return;
    typingStarted = true;
    charIndex = roles[0].length;
    typedRole.textContent = roles[0];
    setTimeout(typeTick, 1500);
  }
  function typeTick() {
    if (!typedRole) return;
    const current = roles[roleIndex];
    if (deleting) {
      charIndex--;
      typedRole.textContent = current.slice(0, Math.max(0, charIndex));
      if (charIndex <= 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        setTimeout(typeTick, 260);
        return;
      }
      setTimeout(typeTick, 34);
    } else {
      const next = roles[roleIndex];
      charIndex++;
      typedRole.textContent = next.slice(0, charIndex);
      if (charIndex >= next.length) {
        deleting = true;
        setTimeout(typeTick, 1750);
        return;
      }
      setTimeout(typeTick, 70);
    }
  }

  // Mobile navigation.
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  menuToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(open));
  });
  nav.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  }));

  // Pages are intentionally future placeholders; keep the homepage usable now.
  const toast = document.getElementById("toast");
  let toastTimer;
  document.querySelectorAll("[data-coming-soon]").forEach(link => {
    link.addEventListener("click", event => {
      event.preventDefault();
      const section = link.dataset.comingSoon;
      toast.textContent = `${section} page is planned next. For now, the Home page is ready.`;
      toast.classList.add("show");
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
    });
  });
  document.getElementById("year").textContent = new Date().getFullYear();
})();
