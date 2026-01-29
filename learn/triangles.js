document.addEventListener("DOMContentLoaded", () => {
    genElems();
});

function genElems() {
    const box = document.getElementById("box");
    box.innerHTML = "";

    const widths = [5, 10];
    const colors = ["#191919", "#233c4a", "#ffb300"];
    const orientations = [0, 90, 180, 270];

    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    box.style.display = "flex";
    box.style.flexDirection = "column";
    box.style.overflow = "hidden";

    let currentHeightPx = 0;
    let orientationIndex = 0;

    while (currentHeightPx < viewportHeight) {
        let remaining = 100; // in vw

        const row = document.createElement("div");
        row.style.display = "flex";
        row.style.lineHeight = "0";
        row.style.overflow = "hidden";

        let rowMaxHeightPx = 0;

        while (remaining > 0) {
            const allowedWidths = widths.filter(w => w <= remaining);
            const elemWidth = allowedWidths[Math.floor(Math.random() * allowedWidths.length)];
            const elemColor = colors[Math.floor(Math.random() * colors.length)];

            const orientation = orientations[orientationIndex];
            orientationIndex = (orientationIndex + 1) % orientations.length;

            const elem = document.createElement("div");
            elem.style.width = `${elemWidth}vw`;
            elem.style.height = `${elemWidth}vw`;
            elem.style.background = elemColor;
            elem.style.clipPath = "polygon(0% 100%, 100% 100%, 100% 0%)";
            elem.style.transform = `rotate(${orientation}deg)`;
            elem.style.transformOrigin = "center";
            elem.style.display = "inline-block";
            elem.style.overflow = "hidden";

            row.appendChild(elem);
            remaining -= elemWidth;

            rowMaxHeightPx = Math.max(rowMaxHeightPx, (elemWidth / 100) * viewportWidth);
        }

        // if (currentHeightPx + rowMaxHeightPx > viewportHeight) {
        //     break;
        // }
        box.appendChild(row);
        currentHeightPx += rowMaxHeightPx;
    }
}