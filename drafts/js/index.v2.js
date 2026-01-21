window.addEventListener("scroll", () => {
    animations()
});

document.addEventListener("DOMContentLoaded", () => {
    animations()
});

let fontSize = 0;

function animations() {
    const scroll = window.scrollY;
    const heroH1 = document.getElementById("titleH1");
    const container = document.getElementById("hero");
    const maxFont = 500;
    const scroll1 = 5*maxFont - 250;
    if (scroll <= scroll1) {
        container.classList.add("sticky");
        fontSize = Math.min(0.2*scroll+50,maxFont)
        heroH1.style.fontSize = `${fontSize}px`;
    } else {
        container.classList.add("sticky");
        fontSize = Math.min(0.2*scroll+50,maxFont)
        heroH1.style.fontSize = `${fontSize}px`;
    }
}