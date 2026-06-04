let animDone = false;

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
    optionsContainer.classList.add("photo-active");
    revealBackButton(backBtn, "#111111");
    animatePanels(photoPanel, codePanel, 2400);

    // Waits 1.6 seconds for the struggle to finish before typing
    setTimeout(() => {
        typeWriter(" kanabar", photoPanel.querySelector(".type-target"));
    }, 1600);
    animDone = true;
}

function triggerCode(photoPanel, codePanel, optionsContainer, backBtn) {
    if (animDone === true) return;
    optionsContainer.classList.add("code-active");
    revealBackButton(backBtn, "#fefcf7");
    // Slower duration: 2400ms (2.4 seconds)
    animatePanels(codePanel, photoPanel, 2400);

    // Waits 1.6 seconds for the struggle to finish before typing
    setTimeout(() => {
        typeWriter("om ", codePanel.querySelector(".type-target"));
    }, 1600);
    animDone = true;
}

function animatePanels(dominantPanel, shrinkingPanel, duration) {
    animDone = true;
    const startTime = performance.now();

    // 1. Strip transitions completely so CSS doesn't trail behind the JS
    dominantPanel.style.transition = "none";
    shrinkingPanel.style.transition = "none";
    
    // Ensure the expanding side stays fully solid and visible
    dominantPanel.style.opacity = "1";

    function updateFrame(now) {
        let elapsed = now - startTime;
        let x = Math.min(elapsed / duration, 1); 

        // Blue Line Formula (Dominant expanding side)
        let blueY = (8.1 * Math.pow(x, 3)) - (6.8 * Math.pow(x, 2)) + (1.5 * x) + 0.5;

        if (x === 1) blueY = 1;
        let greenY = 1 - blueY;

        // 2. Set the widths dynamically
        dominantPanel.style.width = `${blueY * 100}%`;
        shrinkingPanel.style.width = `${greenY * 100}%`;

        // 3. Fade the opacity out on the exact same mathematical curve
        // As greenY drops from 0.5 down to 0, opacity drops perfectly with it
        shrinkingPanel.style.opacity = `${greenY * 2}`; 

        if (x < 1) {
            requestAnimationFrame(updateFrame);
        } else {
            // Clean up: explicitly hide it at the absolute end of the loop
            shrinkingPanel.style.opacity = "0";
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
    }, 1200); // Waits for your polynomial struggle curve to finish before fading in
}

function resetGateway(optionsContainer, backBtn) {
    animDone = false;
    const photoPanel = document.querySelector(".photo");
    const codePanel = document.querySelector(".code");

    backBtn.classList.add("hidden");
    optionsContainer.classList.remove("photo-active", "code-active");
    document.querySelectorAll(".type-target").forEach(el => el.textContent = "");
    if (photoPanel && codePanel) {
        photoPanel.style.width = "";
        codePanel.style.width = "";
        photoPanel.style.opacity = ""; // Restores base CSS opacity
        codePanel.style.opacity = "";  // Restores base CSS opacity
        photoPanel.style.transition = "";
        codePanel.style.transition = "";
    }
}