let animDone = false;
let animDoing = false;

async function pause(ms) {
    await new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener("DOMContentLoaded", () => {

    const optionsContainer = document.querySelector(".options");
    optionsContainer.classList.remove("hidden");

    const photoPanel = document.querySelector(".photo");
    const codePanel = document.querySelector(".code");
    const backBtn = document.getElementById("back-btn");

    if (photoPanel) {
        photoPanel.addEventListener("click", () => triggerPhotography(photoPanel, codePanel, optionsContainer, backBtn));
    }
    
    if (codePanel) {
        codePanel.addEventListener("click", () => triggerCode(photoPanel, codePanel, optionsContainer, backBtn));
    }

    if (backBtn) {
        backBtn.addEventListener("click", () => resetGateway(optionsContainer, backBtn));
    }    
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
});

function triggerPhotography(photoPanel, codePanel, optionsContainer, backBtn) {
    if (animDone === true) return;
    animDoing = true;
    document.querySelector(".options").style.backgroundColor = "#e8e5dd";
    optionsContainer.classList.add("photo-active");
    revealBackButton(backBtn, "#111111");
    animatePanels(photoPanel, codePanel, 2400);
    renderPhotos("scene1");
    setTimeout(() => {
        typeWriter(" kanabar", photoPanel.querySelector(".type-target"));
        const photoBody = document.querySelector(".photo-body");
        if (photoBody) photoBody.classList.remove("hidden");
        document.body.style.backgroundColor = "#e8e5dd";
        document.querySelector(".options").style.height = "60vh";
    }, 1600);
    animDone = true;
    animDoing = false;
}

function triggerCode(photoPanel, codePanel, optionsContainer, backBtn) {
    if (animDone === true) return;
    animDoing = true;
    optionsContainer.classList.add("code-active");
    document.querySelector(".options").style.backgroundColor = "#111111";
    revealBackButton(backBtn, "#ede8dd");
    animatePanels(codePanel, photoPanel, 2400);

    setTimeout(() => {
        typeWriter("om ", codePanel.querySelector(".type-target"));
        const codeBody = document.querySelector(".code-body");
        if (codeBody) codeBody.classList.remove("hidden");
        document.body.style.backgroundColor = "#111111";
        document.querySelector(".options").style.height = "90vh";
    }, 1600);
    animDone = true;
    animDoing = false;
}

function animatePanels(dominantPanel, shrinkingPanel, duration) {
    animDone = true;
    animDoing = true;
    const startTime = performance.now();

    dominantPanel.style.transition = "none";
    shrinkingPanel.style.transition = "none";
    dominantPanel.style.opacity = "1";
    dominantPanel.style.zIndex = "1";
    shrinkingPanel.style.zIndex = "0";
    dominantPanel.classList.add("expanded");

    function updateFrame(now) {
        let elapsed = now - startTime;
        let x = Math.min(elapsed / duration, 1); 

        let blueY = (8.1 * Math.pow(x, 3)) - (6.8 * Math.pow(x, 2)) + (1.5 * x) + 0.5;

        if (x === 1) blueY = 1;
        let greenY = 1 - blueY;

        dominantPanel.style.width = `${blueY * 100}vw`;
        shrinkingPanel.style.width = `${greenY * 100}vw`;

        shrinkingPanel.style.opacity = greenY * 2; 

        if (x < 1) {
            requestAnimationFrame(updateFrame);
        } else {
            shrinkingPanel.style.opacity = "0";
            dominantPanel.style.width = "100vw"; 
            shrinkingPanel.style.width = "0vw";
            document.body.style.overflow = "auto";
            document.querySelector(".options").style.pointerEvents = "none";
        }
    }

    requestAnimationFrame(updateFrame);
}

function typeWriter(text, targetElement) {
    if (!targetElement) return;
    let i = 0;
    targetElement.textContent = ""; 
    
    function type() {
        if (i < text.length) {
            targetElement.textContent += text.charAt(i);
            i++;
            setTimeout(type, 100); 
        }
    }
    type();
}

function revealBackButton(button, customColor) {
    if (!button) return;
    button.style.color = customColor;
    setTimeout(() => {
        button.classList.remove("hidden");
    }, 1200);
}

function resetGateway(optionsContainer, backBtn) {
    if (animDoing == true) return;
    animDone = false;
    const photoPanel = document.querySelector(".photo");
    const codePanel = document.querySelector(".code");

    backBtn.classList.add("hidden");
    optionsContainer.classList.remove("photo-active", "code-active");

    const photoBody = document.querySelector(".photo-body");
    optionsContainer.classList.remove("photo-active");
    const codeBody = document.querySelector(".code-body");
    if (photoBody) photoBody.classList.add("hidden");
    if (codeBody) codeBody.classList.add("hidden");
    document.body.style.overflow = "";
    document.body.style.backgroundColor = "";
    document.querySelector(".options").style.height = "100vh";
    document.querySelector(".options").style.pointerEvents = "";
    document.querySelectorAll(".type-target").forEach(el => el.textContent = "");
    document.querySelector(".options").style.height = "100vh";
    if (photoPanel && codePanel) {
        photoPanel.style.width = "";
        codePanel.style.width = "";
        photoPanel.style.opacity = ""; 
        codePanel.style.opacity = "";  
        photoPanel.style.transition = "";
        codePanel.style.transition = "";
        photoPanel.classList.remove("expanded");
        codePanel.classList.remove("expanded");
    }
}

function showPhotos() {

}

async function trans(sceneID) {
    const changeScene = document.getElementById(sceneID); 
    if (!changeScene) return;
    const scenes = document.querySelectorAll(".scene");
    const transition = document.getElementById("transition");
    transition.classList.remove("hidden");
    await pause(50);
    transition.classList.add("active");
    await pause(600);
    
    scenes.forEach(scene => {
        scene.classList.add("hidden");
    });
    changeScene.classList.remove("hidden");
    await renderPhotos(sceneID);
    const navBtns = document.querySelectorAll(".nav-item"); 
    navBtns.forEach(btn => {
        btn.classList.remove("active");
    });
    const activeBtn = document.getElementById(`${sceneID}btn`);
    if (activeBtn) {
        activeBtn.classList.add("active");
    }
    transition.classList.remove("active");
    await pause(400);
    transition.classList.add("hidden");
}

async function renderPhotos(sceneID) {
    const response = await fetch("./Assets/order.json");
    if (!response.ok) {
        throw new Error(`Fetch Error: ${response.status}`);
        return;
    }

    let photoData;

    try {
        photoData = await response.json();
    } catch (error) {
        console.error(`Invalid JSON, ${error.message}`);
    }
    const sectionID = sceneID.split("scene")[1];
    const scene = document.getElementById(sceneID);
    const section = photoData.sections.find(section => section.id === sectionID)
    if (!section) return;
    let flipped = false;
    section.photos.forEach(photo => {
        if (photo.Featured == true) {
            if (photo.Orientation === "Horizontal") {
                const newPhoto = document.createElement('div');
                newPhoto.innerHTML = `
                    <div class="photo-card landscape-card" id="o.${photo.Order}">
                        <div class="photo-frame">
                            <img src="/Assets/${photo.file}" alt="${photo.alt}">
                        </div>
                        <div class="exif">
                            <div class="exif-data wide">
                                <p class="exif-item">Camera: ${photo.Camera}</p>
                                <p class="exif-item">Lens: ${photo.Lens}</p>
                                <p class="exif-item">Aperture: ${photo.Aperture} • Shutter Speed: ${photo.shutterSpeed} • ISO: ${photo.ISO}</p>
                                <p class="exif-item">Location: ${photo.Location}</p>
                            </div>
                            <div class="exif-copyright">
                                <button class="nav-arrow" data-target="o.17"><i class="bi bi-arrow-up"></i></button>
                                <span class="exif-item p-x-2">|</span>
                                <button class="nav-arrow" data-target="o.19"><i class="bi bi-arrow-down"></i></button>
                            </div>
                        </div>
                    </div>
                `
                scene.appendChild(newPhoto);
            } else {
                const newPhoto = document.createElement('div');
                newPhoto.innerHTML = `
                    <div class="photo-card vertical-card ${flippedClass(flipped)}" id="o.${photo.Order}">
                        <div class="photo-frame">
                            <img src="/Assets/${photo.file}" alt="${photo.alt}">
                        </div>
                        <div class="exif">
                            <div class="exif-data wide">
                                <p class="exif-item">Camera: ${photo.Camera}</p>
                                <p class="exif-item">Lens: ${photo.Lens}</p>
                                <p class="exif-item">Aperture: ${photo.Aperture}</p>
                                <p class="exif-item">Shutter Speed: ${photo.shutterSpeed}</p>
                                <p class="exif-item">ISO: ${photo.ISO}</p>
                                <p class="exif-item">Location: ${photo.Location}</p>
                            </div>
                            <div class="exif-copyright">
                                <button class="nav-arrow" data-target="o.17"><i class="bi bi-arrow-up"></i></button>
                                <span class="exif-item p-x-2">|</span>
                                <button class="nav-arrow" data-target="o.19"><i class="bi bi-arrow-down"></i></button>
                            </div>
                        </div>
                    </div>
                `
                scene.appendChild(newPhoto);
                flipped = !flipped
            }
        }
    });
    console.log(section);
}

function flippedClass(flipped) {
    return flipped ? "flipped" : "";
} 

let lastScrollTop = 0;
const delta = 50;

window.addEventListener("scroll", () => {
    if (!animDone) return; 

    const btnContainer = document.querySelector(".back-btn-container");
    const st = window.pageYOffset || document.documentElement.scrollTop;

    if (Math.abs(lastScrollTop - st) <= delta) return;

    if (st > lastScrollTop && st > 50) {
        btnContainer.classList.add("nav-up");
    } else {
        if (st + window.innerHeight < document.documentElement.scrollHeight) {
            btnContainer.classList.remove("nav-up");
        }
    }

    lastScrollTop = st;
});