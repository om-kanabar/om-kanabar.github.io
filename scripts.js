let animDone = false;
let animDoing = false;

async function pause(ms) {
    await new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener("DOMContentLoaded", () => {
    navButtons();
    const optionsContainer = document.querySelector(".options");
    optionsContainer.classList.remove("hidden");

    const photoPanel = document.querySelector(".photo");
    const codePanel = document.querySelector(".code");
    const backBtn = document.getElementById("back-btn");
    const form = document.getElementById("contactForm");

    if (photoPanel) photoPanel.addEventListener("click", () => triggerPhotography(photoPanel, codePanel, optionsContainer, backBtn));
    if (codePanel) codePanel.addEventListener("click", () => triggerCode(photoPanel, codePanel, optionsContainer, backBtn));
    if (backBtn) backBtn.addEventListener("click", () => resetGateway(optionsContainer, backBtn));
    if (form) form.addEventListener('submit', handleFormSubmit);

    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    aboutReady("code");
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
    document.querySelector(".options").style.backgroundColor = "#191919";
    revealBackButton(backBtn, "#ede8dd");
    animatePanels(codePanel, photoPanel, 2400);

    setTimeout(() => {
        typeWriter("om ", codePanel.querySelector(".type-target"));
        const codeBody = document.querySelector(".code-body");
        if (codeBody) codeBody.classList.remove("hidden");
        document.body.style.backgroundColor = "#191919";
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

async function renderPhotos() {
    const response = await fetch("./Assets/order.json");
    if (!response.ok) {
        throw new Error(`Fetch Error: ${response.status}`);
    }

    let photoData;
    try {
        photoData = await response.json();
    } catch (error) {
        console.error(`Invalid JSON, ${error.message}`);
        return;
    }

    const gallery = document.getElementById("photo-gallery");
    if (!gallery) {
        console.error("Could not find element with id 'photo-gallery'");
        return;
    }

    gallery.innerHTML = "";

    const flippedClass = (flipped) => flipped ? "flipped" : ""; 
    let flipped = false;

    photoData.sections.forEach(section => {
        section.photos.forEach(photo => {
            if (photo.Featured === true) {
                const newPhoto = document.createElement('div');
                
                if (photo.Orientation === "Horizontal") {
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
                            </div>
                        </div>
                    `;
                } else {
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
                            </div>
                        </div>
                    `;
                    flipped = !flipped;
                }
                
                gallery.appendChild(newPhoto);
                if (photo.lastPhoto === true) return;
            }
        });
    });
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


function navButtons() {
    const navButtons = document.querySelectorAll(".nav-arrow[data-target]");

    function executeSmoothCenterGlide(targetId) {
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;

        const elementRect = targetElement.getBoundingClientRect();
        const absoluteElementTop = elementRect.top + window.pageYOffset;
        
        const destination = absoluteElementTop - (window.innerHeight / 2) + (elementRect.height / 2);
        
        const startPosition = window.pageYOffset;
        const distance = destination - startPosition;
        const duration = 500;
        let startTime = null;
        function easeOutQuint(t) {
            return 1 - Math.pow(1 - t, 5);
        }

        function animationLoop(currentTime) {
            if (startTime === null) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1);

            window.scrollTo(0, startPosition + (distance * easeOutQuint(progress)));

            if (progress < 1) {
                requestAnimationFrame(animationLoop);
            }
        }

        requestAnimationFrame(animationLoop);
    }

    window.addEventListener("keydown", (event) => {
        if (event.key !== "ArrowDown" && event.key !== "ArrowUp" && event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;

        const cards = Array.from(document.querySelectorAll(".photo-card"));
        if (cards.length === 0) return;

        if ((event.key === "ArrowDown" || event.key === "ArrowRight") && window.pageYOffset < 50) {
            event.preventDefault();
            const firstCardId = cards[0].id;
            if (firstCardId) executeSmoothCenterGlide(firstCardId);
            return;
        }

        let closestCardIndex = 0;
        let minimumDistance = Infinity;

        cards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const distanceToCenter = Math.abs((rect.top + rect.height / 2) - (window.innerHeight / 2));
            if (distanceToCenter < minimumDistance) {
                minimumDistance = distanceToCenter;
                closestCardIndex = index;
            }
        });

        event.preventDefault(); 

        if (event.key === "ArrowDown" || event.key === "ArrowRight") {
            if (closestCardIndex < cards.length - 1) {
                const nextCardId = cards[closestCardIndex + 1].id;
                if (nextCardId) executeSmoothCenterGlide(nextCardId);
            }
        } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
            if (closestCardIndex > 0) {
                const prevCardId = cards[closestCardIndex - 1].id;
                if (prevCardId) executeSmoothCenterGlide(prevCardId);
            }
        }
    });
}


function aboutReady(section) {
    if (!["code", "photography"].includes(section)) return;
    theme = (section === "code") ? "light" : "dark";
    const bgColor = (theme === "light") ? "#ede8dd" : "#191919";
    const textColor = (theme === "dark") ? "#ede8dd" : "#191919";
    const aboutMe = document.getElementById("aboutMe");
    if (!aboutMe) return;
    aboutMe.setAttribute('data-bs-theme', theme);
    aboutMe.classList.add(theme);
    aboutMe.style.backgroundColor = bgColor;
    aboutMe.style.color = textColor;
    
    const submitBtn = document.getElementById("submitBtn");
    if (!submitBtn) return;
    submitBtn.classList = (theme === "dark") ? "btn btn-light" : "btn btn-dark";
}

async function handleFormSubmit(event) {
    const blockedEmailHashes = [
        "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855", 
        "5e884898da28047151d0e56f8dc6292773603d0d6aabbdd62a11ef721d1542d8" 
    ];

    const form = event.currentTarget;
    const stopFormElement = document.getElementById('stopForm');

    if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
        form.classList.add('was-validated');
        return; 
    }

    form.classList.add('was-validated');

    const honeypot = document.getElementById('nickname').value;
    if (honeypot !== "") {
        event.preventDefault();
        event.stopPropagation();
        stopFormElement.classList.remove('hidden');
        return;
    }
    event.preventDefault(); 
    
    const emailValue = document.getElementById('emailInput').value.trim().toLowerCase();
    const msgBuffer = new TextEncoder().encode(emailValue);
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const emailHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

    if (blockedEmailHashes.includes(emailHash)) {
        stopFormElement.classList.remove('hidden');
    } else {
        form.submit();
    }
}