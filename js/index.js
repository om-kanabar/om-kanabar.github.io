let triangleData;
let scroll = 0;
const title = document.querySelectorAll("p.titleText");
const container = document.getElementById("hero");
const projects = document.getElementById("projects");
const projectSection = document.getElementById("projectSection");
const projectsTitle = document.getElementById("projectsTitle");
const projectsContainer = document.getElementById("projectsContainer2");
const triangleSection = document.getElementById("triangles");
const hero = document.getElementById("hero");
let projectsScrollHeight;

let maxFont = window.innerHeight * 0.5;

window.addEventListener('resize', () => {
    maxFont = window.innerHeight * 0.5;
});
const viewHeight = window.innerHeight;
const scroll1 = 1200;
const fadeDistance = 500;
const progressMultiplier = 2;
const scroll2 = scroll1 + fadeDistance;
let scroll3;
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
    } else if (scroll > scroll2 && scroll <= scroll3) {
        anim3();
    } else {
        anim4();
        projects.classList.add("hidden");
        title.forEach(el => el.classList.add("hidden"));
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
    title.forEach(el => el.classList.remove("hidden"));
    container.classList.remove("hidden");
    projects.classList.remove("hidden");
    projectSection.classList.add("hidden");
    projectsContainer.style.opacity = 0;
    document.body.style.overflowX = "visible";
    triangleSection.style.pointerEvents = "none";
    triangleSection.classList.add("hidden");
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
    projectsContainer.style.opacity = 0;
    document.body.style.overflowX = "visible";
    triangleSection.style.pointerEvents = "none";
    triangleSection.classList.add("hidden");
}

function anim3() {
    container.classList.remove("sticky");
    title.forEach(el => el.classList.add("hidden"));
    projects.classList.add("hidden");
    projectSection.classList.remove("hidden");
    projectsTitle.classList.remove("hidden");
    projectsContainer.style.opacity = 1;
    document.body.style.overflowX = "hidden";
    triangleSection.style.pointerEvents = "none";
    triangleSection.classList.add("hidden");
    triangleSection.style.display = "none";
    projects.classList.add("hidden");
}
function generateTriangles() {
    const widths = [5, 10];
    const colors = ["#191919", "#233c4a", "#ffb300"];
    const orientations = [0, 90, 180, 270];

    let rows = [];
    let orientationIndex = 0;
    let currentHeightPx = 0;
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    while (currentHeightPx < viewportHeight) {
        let remainingWidth = 100; // in vw
        let row = [];
        let rowMaxHeightPx = 0;
        let positionIndex = 0;

        while (remainingWidth > 0) {
            const allowedWidths = widths.filter(w => w <= remainingWidth);
            const w = allowedWidths[Math.floor(Math.random() * allowedWidths.length)];
            const color = colors[Math.floor(Math.random() * colors.length)];
            const orientation = orientations[orientationIndex];
            orientationIndex = (orientationIndex + 1) % orientations.length;

            row.push({ color, width: w, orientation, row: rows.length, index: positionIndex });
            positionIndex++;

            rowMaxHeightPx = Math.max(rowMaxHeightPx, (w / 100) * viewportWidth);
            remainingWidth -= w;
        }

        rows.push(row);
        currentHeightPx += rowMaxHeightPx;
    }

    return JSON.stringify(rows);
}

function renderTriangles() {
    const triangles = JSON.parse(triangleData);
    const length = triangles.length;
    const lastRow = triangles[triangles.length - 1];
    const lastElement = lastRow[lastRow.length - 1];
    const container = document.getElementById("triangles");
    for (let i = 0; i <= lastElement.row; i++) {
        const subContainer = document.createElement("div");
        subContainer.classList.add("d-flex","subheading");
        subContainer.style.zIndex = -25;
        const subList = triangles[i];
        for (let j = 0; j < subList.length; j++) {
            const obj = subList[j];
            const elem = document.createElement("div");
            const group = Math.floor(Math.random() * (3)) + 1;
            elem.id = `triangles-${i}-${j}`;
            elem.style.width = `${obj.width}vw`;
            elem.style.height = `${obj.width}vw`;
            elem.style.background = `${obj.color}`;
            elem.style.clipPath = "polygon(0% 100%, 100% 100%, 100% 0%)";
            elem.style.transform = `rotate(${obj.orientation}deg)`;
            elem.style.transformOrigin = "center";
            elem.style.display = "inline-block";
            elem.style.overflow = "hidden";
            elem.style.zIndex = -25;
            elem.classList.add(`group${group}`, "triangle");
            elem.dataset.row = obj.row;
            elem.dataset.index = obj.index;
            subContainer.appendChild(elem);
        };
        container.appendChild(subContainer);
    }
}

function anim4() {
    title.forEach(el => el.classList.add("hidden"));
    projects.classList.add("hidden");
    triangleSection.classList.remove("hidden");
    triangleSection.style.display = "block";
    triangleSection.style.pointerEvents = "none";
    const relativeScrollHeight = scroll - scroll3;

    const group1 = document.querySelectorAll(".group1");
    const group2 = document.querySelectorAll(".group2");
    const group3 = document.querySelectorAll(".group3");

    const space = 0.0025
    const opacity1 = Math.max(0, -Math.abs(space * relativeScrollHeight - 1) + 1);
    const opacity2 = Math.max(0, -Math.abs(space * relativeScrollHeight - 2) + 1);
    const opacity3 = Math.max(0, -Math.abs(space * relativeScrollHeight - 3) + 1);

    group1.forEach(el => el.style.opacity = opacity1);
    group2.forEach(el => el.style.opacity = opacity2);
    group3.forEach(el => el.style.opacity = opacity3);
}

window.addEventListener("scroll", () => {
    animations()
});

document.addEventListener("DOMContentLoaded", () => {
    projectSection.classList.remove("hidden");
    triangleData = generateTriangles();
    renderTriangles();
    projectsScrollHeight = projectSection.scrollHeight;
    scroll3 = scroll2 + projectsScrollHeight + 500;
    animations()
});

async function formSubmit1() {
    const blockedHashes = [
        "ffea9d1125032e872817e164222dfcd7cd1a6b22b75491005a02c3a1506ce2ee", 
        "31c5543c1734d25c7206f5fd591525d0295bec6fe84ff82f946a34fe970a1e66", 
        "57f6427135dd0537e59772e4821695529d6e6d814a2203f9d6e3ce04c2ecb3f0", 
        "fab750116714be3d606e5d30230c9040c4477a1eb52f03b13b0cc0ff32bd70b9"
    ];
    const alertBox = document.getElementById("blockedAlert");
    const form = document.querySelector('.needs-validation');
    const emailInput = form.querySelector("input[type='email']")
    const email = emailInput ? emailInput.value.trim().toLowerCase() : "";
    let check = 0
    sha256(email).then(hash => {
        // Blocked email check
        if (blockedHashes.includes(hash)) {
            alertBox.classList.remove("d-none");
            alertBox.innerHTML = `Sorry, the email ${email} has been blocked`
            document.getElementById("checkBtn").remove();
            check = 1;
            throw Error(`[EMAIL] Email ${email} was blocked`)
        }

        // Check form validity (Bootstrap)
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            check = 1;
            throw Error("[EMAIL] Form was not validated")
        }
        const visibleSubject = document.getElementById("subject");
        const hiddenSubject = document.querySelector("input[name='_subject']");
        hiddenSubject.value = visibleSubject.value;
        if (document.getElementById("realSubmit")) document.getElementById("realSubmit").click();
    });
}