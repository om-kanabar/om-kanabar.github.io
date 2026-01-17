window.addEventListener("scroll", () => {
    const scroll = window.scrollY;
    const spread = Math.min(scroll * 0.2, 60);
    document.documentElement.style.setProperty("--spread", `${spread}px`);
});

window.addEventListener("scroll", () => {
    const scroll = window.scrollY;
    const spread = Math.min(scroll * 0.2, 100);
    document.documentElement.style.setProperty("--spreadp", `${spread}%`);
});

document.addEventListener("DOMContentLoaded", () => {
    const photographerH1 = document.querySelector(".photographer h1");
    const code = document.getElementById("coder");
    const GreenIris = document.getElementById("GreenIris");

    photographerH1.style.opacity = 0;
    GreenIris.style.opacity = 0;
    photographerH1.style.transition = "opacity 1.5s ease";
    GreenIris.style.transition = "opacity 1.5s ease";

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Scroll to the photographer section smoothly
                entry.target.scrollIntoView({ behavior: "smooth", block: "start" });

                // Set opacity to 100%
                entry.target.style.opacity = 1;

                if (entry.target == photographerH1) {
                    GreenIris.style.opacity = 1;
                }
                
                if (entry.target == code) {
                    codeAnimation();
                }

            } else {
                // Reset opacity when leaving view
                entry.target.style.opacity = 0;
                if (entry.target == photographerH1) {
                    GreenIris.style.opacity = 0;
                }
            }
        });
    }, { threshold: 0.5 });

    observer.observe(photographerH1);

    const heroLine = document.getElementById("hero");
    const output = document.querySelector(".output-html");
    const allCodeLines = document.querySelectorAll(".code-js p");

    if (heroLine && output) {
        heroLine.style.transformOrigin = "center center";
        heroLine.style.display = "inline-block";

        output.style.opacity = 0;
        output.style.transform = "translateY(20px)";

        window.addEventListener("scroll", () => {
            const rect = heroLine.getBoundingClientRect();
            const vh = window.innerHeight;
            const start = vh * 0.75;
            const end = vh * 0.25;
            let progress = (start - rect.top) / (start - end);
            progress = Math.min(Math.max(progress, 0), 1);

            const scale = 1 + progress * 1.5;
            heroLine.style.transform = `scale(${scale})`;

            // Trigger output when hero grows ~100px
            if ((heroLine.offsetHeight * scale - heroLine.offsetHeight) >= 100) {
                allCodeLines.forEach(line => line.style.opacity = 0);
                heroLine.style.opacity = 0;

                output.style.opacity = 1;
                output.style.transform = "translateY(0)";
            } else {
                allCodeLines.forEach(line => {
                    if (line !== heroLine) {
                        line.style.opacity = 1 - 0.7 * progress;
                    }
                });
                heroLine.style.opacity = 1;
                output.style.opacity = 0;
                output.style.transform = "translateY(20px)";
            }
        });
    }
});