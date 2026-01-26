window.addEventListener("scroll", () => {
    animations()
});

document.addEventListener("DOMContentLoaded", () => {
    animations()
    console.log(window.innerHeight)
});


let scroll = 0;
const title = document.querySelectorAll("p.titleText");
const container = document.getElementById("hero");
const projects = document.getElementById("projects");
const projectSection = document.getElementById("projectSection");
const projectsTitle = document.getElementById("projectsTitle");
const projectsContainer = document.getElementById("projectsContainer2");

let maxFont = window.innerHeight * 0.5;

window.addEventListener('resize', () => {
    maxFont = window.innerHeight * 0.5;
});
const viewHeight = window.innerHeight;
const scroll1 = 1200;
const fadeDistance = 500;
const progressMultiplier = 2;
const scroll2 = scroll1 + fadeDistance;
let TitleFontSize = 0;

const handoffSpacer = document.createElement("div");
handoffSpacer.id = "handoffSpacer";
handoffSpacer.style.height = `${scroll2 - (viewHeight/2) - projects.clientHeight + 0.16*maxFont}px`;
container.after(handoffSpacer);

function animations() {
    scroll = window.scrollY;

    if (scroll <= scroll1) {
        anim1(scroll);
    } else if (scroll > scroll1 && scroll <= scroll2) {
        anim2(scroll);
    } else {
        anim3();
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
    projects.style.opacity = 0;
    handoffComplete = false;
    title.forEach(el => el.classList.remove("hidden"));
    container.classList.remove("hidden");
    projects.classList.remove("hidden");
    projectSection.classList.add("hidden");
    projectsTitle.classList.add("hidden");
    projectsContainer.style.opacity = 0;
    document.body.style.overflowX = "visible";
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
    const spacerMax = 110;
    const spacerSpeedMultiplier = 1.4;
    const clampedProgress = Math.max(0, Math.min(progress * (progressMultiplier / spacerSpeedMultiplier), fadeDistance));
    const newOpacity = 1 - (clampedProgress / fadeDistance);
    projects.style.opacity = 1 - newOpacity;
    nonImps.forEach(el => {
        el.classList.remove("hidden");
        el.style.opacity = newOpacity;
        if (newOpacity <= 0) {el.classList.add("hidden")};
    });
    const spacerWidth = (clampedProgress / fadeDistance) * spacerMax;
    spacer.style.width = `${spacerWidth}vw`;
    title.forEach(el => el.classList.remove("hidden"));
    container.classList.remove("hidden");
    projects.classList.remove("hidden");
    projectSection.classList.add("hidden");
    projectsTitle.classList.add("hidden");
    projectsContainer.style.opacity = 0;
    document.body.style.overflowX = "visible";
}

function anim3() {
    container.classList.remove("sticky");
    title.forEach(el => el.classList.add("hidden"));
    projects.classList.add("hidden");
    projectSection.classList.remove("hidden");
    projectsTitle.classList.remove("hidden");
    projectsContainer.style.opacity = 1;
    document.body.style.overflowX = "hidden";
}