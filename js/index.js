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
    coderAnimation();
})


function coderAnimation() {
    const hero = document.getElementById("hero");
    const output = document.querySelector(".output-html");
    const lines = document.querySelectorAll(".code-js p");

    if (!hero || !output) return;

    const heroInitialRect = hero.getBoundingClientRect();
    const heroInitialCenterY =
        heroInitialRect.top + heroInitialRect.height / 2;

    hero.style.transformOrigin = "center center";
    hero.style.transition = "none";

    output.style.opacity = 0;
    output.style.pointerEvents = "none";
    output.style.transition = "opacity 0.6s ease";

    let pinned = false;

    window.addEventListener("scroll", () => {
        const vh = window.innerHeight;

        const scrollY = window.scrollY;
        const triggerStart = heroInitialRect.top + scrollY - vh * 0.8;
        const triggerEnd   = heroInitialRect.top + scrollY - vh * 0.2;

        let progress =
            (scrollY - triggerStart) / (triggerEnd - triggerStart);
        progress = Math.min(Math.max(progress, 0), 1);

        /* -------- PHASE 1: 0 → 0.3 -------- */
        const phase1 = Math.min(progress / 0.3, 1);

        if (phase1 > 0 && !pinned) {
            hero.style.position = "fixed";
            hero.style.top = `${heroInitialRect.top}px`;
            hero.style.left = `${heroInitialRect.left}px`;
            hero.style.width = `${heroInitialRect.width}px`;
            pinned = true;
        }

        if (phase1 === 0 && pinned) {
            hero.style.position = "relative";
            hero.style.top = "";
            hero.style.left = "";
            hero.style.width = "";
            pinned = false;
        }

        const translateY =
            (vh / 2 - heroInitialCenterY) * phase1;

        const scale = 1 + phase1 * 1.2;

        hero.style.transform = `
            translateY(${translateY}px)
            scale(${scale})
        `;

        lines.forEach(line => {
            if (line !== hero) {
                line.style.opacity = 1 - phase1 * 0.6;
            }
        });

        /* -------- PHASE 2 -------- */
        const expanded =
            heroInitialRect.height * scale - heroInitialRect.height;

        if (expanded >= 100) {
            hero.style.opacity = 0;
            lines.forEach(line => line.style.opacity = 0);

            output.style.opacity = 1;
            output.style.pointerEvents = "auto";
        } else {
            hero.style.opacity = 1;
            output.style.opacity = 0;
        }
    });
}