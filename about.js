
const aboutRows = document.querySelectorAll(".interest-row");

aboutRows.forEach((row, index) => {
  row.style.opacity = "0";
  row.style.transform = "translateY(18px)";
  row.style.transition = `opacity .6s ease ${index * 100}ms, transform .6s ease ${index * 100}ms`;
});

const aboutObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      aboutObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

aboutRows.forEach(row => aboutObserver.observe(row));
