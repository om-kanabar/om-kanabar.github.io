let animDone = false;
let animDoing = false;

document.addEventListener("DOMContentLoaded", () => {
    const optionsContainer = document.querySelector(".options");
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
});

function triggerPhotography(photoPanel, codePanel, optionsContainer, backBtn) {
    if (animDone === true) return;
    animDoing = true;
    document.querySelector(".options").style.backgroundColor = "#e8e5dd";
    optionsContainer.classList.add("photo-active");
    revealBackButton(backBtn, "#111111");
    animatePanels(photoPanel, codePanel, 2400);

    setTimeout(() => {
        typeWriter(" kanabar", photoPanel.querySelector(".type-target"));
        const photoBody = document.querySelector(".photo-body");
        if (photoBody) photoBody.classList.remove("hidden");
        document.body.style.backgroundColor = "#e8e5dd";
        document.querySelector(".options").style.height = "80vh";
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

        shrinkingPanel.style.opacity = `${greenY * 2}`; 

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

let isPhysicsRunning = false;
let velocity = 0;
let currentY = window.scrollY;
let lastScrollTimestamp = 0;
let physicsLoopId = null;

window.addEventListener('wheel', (e) => {
    const photoBody = document.querySelector('.photo-body');
    if (!photoBody || photoBody.classList.contains('hidden')) return;

    if (isPhysicsRunning && Math.abs(velocity) < 2) {
        cancelAnimationFrame(physicsLoopId);
        isPhysicsRunning = false;
    }

    velocity += e.deltaY * 0.15; 
    
    velocity = Math.max(Math.min(velocity, 45), -45);

    if (!isPhysicsRunning) {
        currentY = window.scrollY;
        runTerrainPhysics();
    }
}, { passive: true });

function runTerrainPhysics() {
    isPhysicsRunning = true;
    
    const cards = document.querySelectorAll('.photo-card');
    if (cards.length === 0) {
        isPhysicsRunning = false;
        return;
    }

    const card1Center = cards[0].getBoundingClientRect().top + window.scrollY + (cards[0].offsetHeight / 2);
    const card2Center = cards[1] ? (cards[1].getBoundingClientRect().top + window.scrollY + (cards[1].offsetHeight / 2)) : card1Center + window.innerHeight;
    const wavelength = card2Center - card1Center; 

    const gravity = 1.1;
    const friction = 0.92;
    const stopThreshold = 0.1;

    let initialScrollDirection = velocity > 0 ? 1 : -1;
    let baselineCardIndex = findClosestCardIndex(currentY, cards);
    let baselineCardCenter = getCardCenterByIndex(baselineCardIndex, cards);

    function updateFrame() {
        const deltaX = currentY - baselineCardCenter;
        const angle = (deltaX / wavelength) * Math.PI;
        const restoringForce = -gravity * Math.sin(angle);

        velocity += restoringForce;
        velocity *= friction;

        let nextY = currentY + velocity;

        if (initialScrollDirection > 0 && nextY < baselineCardCenter && velocity < 0) {
            nextY = baselineCardCenter;
            velocity = 0;
        } else if (initialScrollDirection < 0 && nextY > baselineCardCenter && velocity > 0) {
            nextY = baselineCardCenter;
            velocity = 0;
        }

        currentY = nextY;
        window.scrollTo(0, currentY);

        if (Math.abs(velocity) < stopThreshold && Math.abs(currentY - baselineCardCenter) < 1) {
            window.scrollTo(0, baselineCardCenter);
            isPhysicsRunning = false;
            velocity = 0;
        } else {
            const newClosestIndex = findClosestCardIndex(currentY, cards);
            if (newClosestIndex !== baselineCardIndex) {
                if ((initialScrollDirection > 0 && newClosestIndex > baselineCardIndex) || 
                    (initialScrollDirection < 0 && newClosestIndex < baselineCardIndex)) {
                    baselineCardIndex = newClosestIndex;
                    baselineCardCenter = getCardCenterByIndex(baselineCardIndex, cards);
                }
            }
            physicsLoopId = requestAnimationFrame(updateFrame);
        }
    }

    physicsLoopId = requestAnimationFrame(updateFrame);
}

function findClosestCardIndex(scrollY, cards) {
    const screenCenter = scrollY + (window.innerHeight / 2);
    let closestIndex = 0;
    let minDistance = Infinity;

    cards.forEach((card, index) => {
        const cardCenter = card.getBoundingClientRect().top + window.scrollY + (card.offsetHeight / 2);
        const dist = Math.abs(screenCenter - cardCenter);
        if (dist < minDistance) {
            minDistance = dist;
            closestIndex = index;
        }
    });
    return closestIndex;
}

function getCardCenterByIndex(index, cards) {
    if (!cards[index]) return window.scrollY;
    const card = cards[index];
    return card.getBoundingClientRect().top + window.scrollY - (window.innerHeight / 2) + (card.offsetHeight / 2);
}