window.addEventListener("scroll", () => {
    animations()
});

document.addEventListener("DOMContentLoaded", () => {
    animations()
});


let scroll = 0;
const title = document.querySelectorAll("p.titleText");
const container = document.getElementById("hero");
const maxFont = 500;
const anim1Distance = 1200;
const scroll1 = anim1Distance;
const fadeDistance = 500; // define the fade distance globally
const progressMultiplier = 2; // speed multiplier for progress
const scroll2 = scroll1 + fadeDistance; // dynamically calculate scroll2
let TitleFontSize = 0;

function animations() {
    scroll = window.scrollY;

    if (scroll <= scroll1) {
        anim1(scroll);
    } else if (scroll > scroll1 && scroll <= scroll2) {
        anim2(scroll);
    }
}

function anim1(scroll) {
    container.classList.add("sticky");
    const progress = Math.min(scroll, scroll1);
    TitleFontSize = 100 + (maxFont - 100) * (progress / scroll1);
    title.forEach(el => {
    el.style.fontSize = `${TitleFontSize}px`;
    el.style.opacity = 1;
    });
    const spacer = document.getElementById("titleSpacer");
    spacer.style.width = "0px";
}

function anim2(scroll) {
    anim1(scroll);
    const nonImps = document.querySelectorAll("p.nImportant");
    const spacer = document.getElementById("titleSpacer");
    spacer.style.display = "inline-block";
    spacer.style.transition = "width 0.1s linear";
    const a = document.getElementById("aImp");
    const n = document.getElementById("nImp");
    const progress = Math.min(scroll, scroll2) - scroll1;
    const spacerMax = 103;
    const clampedProgress = Math.max(0, Math.min(progress * progressMultiplier, fadeDistance));
    const newOpacity = 1 - (clampedProgress / fadeDistance);
    nonImps.forEach(el => {
        el.classList.remove("hidden");
        el.style.opacity = newOpacity;
        if (newOpacity <= 0) {el.classList.add("hidden")};
    });
    const spacerWidth = (clampedProgress / fadeDistance) * spacerMax;
    spacer.style.width = `${spacerWidth}vw`;
}