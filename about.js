
document.addEventListener("DOMContentLoaded", () => {

    // Reveal sections as they enter the screen
    const revealItems = document.querySelectorAll("[data-reveal]");

    revealItems.forEach((item, index) => {
        item.style.opacity = "0";
        item.style.transform = "translateY(25px)";
        item.style.transition =
            `opacity 0.8s ease ${index % 4 * 0.12}s,
             transform 0.8s ease ${index % 4 * 0.12}s`;
    });

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    revealItems.forEach(item => revealObserver.observe(item));

    // Smooth movement for interest rows
    document.querySelectorAll(".interest-item").forEach(item => {
        item.addEventListener("mouseenter", () => {
            item.style.borderColor = "#a9c9dc";
        });

        item.addEventListener("mouseleave", () => {
            item.style.borderColor = "#e9eef0";
        });
    });

});
