window.addEventListener("scroll", () => {
    animations()
});

document.addEventListener("DOMContentLoaded", () => {
    animations()
});

function animations() {
    const scroll = window.scrollY;

    // Normalize red and blue progress
    const redProgress = Math.min(Math.max(scroll / 1275, 0), 1);
    const blueProgress = Math.min(Math.max((scroll - 1275) / 1275, 0), 1);
    const opacity = 1 - Math.min(Math.max((scroll - 2550) / 500, 0), 1);

    const red = Math.round(redProgress * 255);
    const blue = Math.round(blueProgress * 255);

    const hero = document.getElementById("hero");
    const colorElm = document.getElementById("color");

    if (scroll <= 1275) {
        // Red phase
        hero.classList.add("sticky");
        colorElm.style.color = `rgb(${red}, 13, 13)`;
        colorElm.innerText = `rgb(${red}, 13, 13)`;
        colorElm.style.opacity = 1; 
    } else if (scroll > 1275 && scroll <= 2550) {
        // Blue phase
        hero.classList.add("sticky");
        colorElm.style.color = `rgb(${255-blue}, 13, ${blue})`;
        colorElm.innerText = `rgb(${255-blue}, 13, ${blue})`;
        colorElm.style.opacity = 1; 
    } else if (scroll > 2550 && scroll <= 3050) {
        hero.classList.add("sticky");
        colorElm.style.opacity = opacity; 
    } else if (scroll > 3050) {
        hero.classList = "hero";
        colorElm.style.opacity = opacity; 
    }
}