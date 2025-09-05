// © 2025 Om Kanabar.
// More info in LICENSE

let terminal;

document.addEventListener("DOMContentLoaded", () => {
    terminal = new Terminal();
    start();
});

let isLight;

async function start(){
    await terminal.subtitle("st-0-h");
    await pause(200)
    await terminal.subtitle("st-1");
    terminal.changeColor("st-1", "green")
    await terminal.subtitle("st-2");
    isLight = localStorage.getItem("lightMode") === "true";
    if (isLight) {
        lightMode();
    }
    await terminal.subtitle("st-3");
}

async function lightMode(){
    await terminal.subtitle("st-l3");
    await terminal.subtitle("st-l4");
    document.body.classList.add("light");
    document.getElementById("t-box").classList.add("light");
    const divs = document.querySelectorAll('div');
    divs.forEach(Element => {
        Element.classList.add("light");
    });
    terminal.changeColor("st-l3", "black");
    await pause(750);
    terminal.changeColor("st-l4", "black");
    terminal.changeColor("st-3", "black");
    await pause(750);
    terminal.changeColor("st-l5", "black")
    await terminal.subtitle("st-l5")
}

function pause(ms){
	return new Promise(resolve => setTimeout(resolve, ms));
}

class Terminal {
    constructor(id) {}
    async subtitle(id){
        return new Promise(async (resolve) => {
            let stElem = document.getElementById(id);
            if (!stElem) return;
            let st = id.split("-");
            if (st.length < 2) return;
            stElem.classList.remove("hidden");

            // Type logic
            let text = stElem.innerText;
            let splitText = text.split("");
            let length = text.length;
            let inText = "";
            let repeat = null;

            let dtTime = Number(stElem.getAttribute("dt-time")) || 50;
            let time = dtTime / length;

            // Handle repeat marker ^[]
            if (text.includes("^[")) {
                let parts = text.split("^[");
                if (parts.length === 2) {
                    repeat = parts[1].slice(0, -1);
                    text = parts[0];
                    splitText = text.split("");
                    length = text.length;
                }
            }

            stElem.innerHTML = "";
            for (let i = 0; i < length; i++) {
                await pause(time);
                inText += splitText[i];
                stElem.innerHTML = inText;
            }

            // Repeat logic

            if (repeat) {
                let repeatSplit = repeat.split("");
                let repeatTime = Number(stElem.getAttribute("dt-repeatTime")) || 400;
                let totalRepeats = stElem.getAttribute("dt-repeat") || 5;
                if (totalRepeats === "inf") {
                    totalRepeats = 2000;
                } else {
                totalRepeats = Number(stElem.getAttribute("dt-repeat") || 5); 
                };

                let baseText = inText; // store the typed text before repeats

                for (let j = 0; j < totalRepeats; j++) {
                    inText = baseText;
                    stElem.innerHTML = inText;      // display base text first
                    await pause(repeatTime);         // pause before first repeat character

                    for (let k = 0; k < repeatSplit.length; k++) {
                        await pause(repeatTime);
                        inText += repeatSplit[k];
                        stElem.innerHTML = inText;
                    }

                    // Pause and reset only if not the last repeat cycle
                    if (j < totalRepeats - 1) {
                        await pause(repeatTime);
                        inText = baseText;
                        stElem.innerHTML = inText;
                    }
                }
            }
            await pause(Number(stElem.getAttribute("dt-repeatTime")) || 400)
            stElem.innerHTML = text;

            // Hide if needed
            if (st[2] === "h") {
                await pause(Number(stElem.getAttribute("dt-end")) || 1000);
                stElem.classList.add("hidden");
            }
            resolve();
        });
    }
    
    changeColor(id, color) {
        const elem = document.getElementById(id);
        if (!elem) return;
        const colors = ["blue", "purple", "green", "url-white", "url-black", "white", "black", "red", "yellow"];
        if (!colors.includes(color)) return;
        colors.forEach(c => elem.classList.remove(`t-${c}`));
        elem.classList.add(`t-${color}`);
    }

    async tInput(){

    }
}