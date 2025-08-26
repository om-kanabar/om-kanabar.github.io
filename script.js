// © 2025 Om Kanabar.
// More info in LICENSE

const navy = `#233c4a`;
const yellow = `#ffb300`;

var color = `${yellow}`

function initParticles() {
  const particlesElement = document.getElementById("particles-js");
  if (!particlesElement) return;
  particlesJS("particles-js", {
    "particles": {
      "number": {
        "value": 175,
        "density": {
          "enable": true,
          "value_area": 800
        }
      },
      "color": {
        "value": `${color}`
      },
      "shape": {
        "type": "circle",
        "stroke": {
          "width": 0,
          "color": `${color}`
        },
        "polygon": {
          "nb_sides": 5
        },
        "image": {
          "src": "img/github.svg",
          "width": 100,
          "height": 100
        }
      },
      "opacity": {
        "value": 0.5,
        "random": false,
        "anim": {
          "enable": false,
          "speed": 1,
          "opacity_min": 0.1,
          "sync": false
        }
      },
      "size": {
        "value": 4,
        "random": true,
        "anim": {
          "enable": true,
          "speed": 2,
          "size_min": 1,
          "sync": false
        }
      },
      "line_linked": {
        "enable": true,
        "distance": 150,
        "color": `${color}`,
        "opacity": 0.4,
        "width": 1
      },
      "move": {
        "enable": true,
        "speed": 1.5,
        "direction": "none",
        "random": true,
        "straight": false,
        "out_mode": "out",
        "bounce": false,
        "attract": {
          "enable": false,
          "rotateX": 600,
          "rotateY": 1200
        }
      }
    },
    "interactivity": {
      "detect_on": "canvas",
      "events": {
        "onhover": {
          "enable": true,
          "mode": "grab"
        },
        "onclick": {
          "enable": false,
          "mode": "repulse"
        },
        "resize": true
      },
      "modes": {
        "grab": {
          "distance": 200,
          "line_linked": {
            "opacity": 1
          }
        },
        "bubble": {
          "distance": 400,
          "size": 40,
          "duration": 2,
          "opacity": 8,
          "speed": 3
        },
        "repulse": {
          "distance": 200,
          "duration": 0.4
        },
        "push": {
          "particles_nb": 4
        },
        "remove": {
          "particles_nb": 2
        }
      }
    },
    "retina_detect": true
  });
}

let toggleClickCount = 0;

document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById('darkButton');
    const logoDesktop = document.getElementById('logo');

    // Initialize toggle value based on saved preference for light mode
    let btnToggle = localStorage.getItem("lightMode") === "true" ? 1 : 0;

    // Function to apply light mode state
    function applyLightMode(isLight) {
        const element = document.body;

        if (isLight) {
            element.classList.add("light-mode");
            btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-moon-fill" viewBox="0 0 16 16"><path d="M6 .278a.77.77 0 0 1 .08.858 7.2 7.2 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277q.792-.001 1.533-.16a.79.79 0 0 1 .81.316.73.73 0 0 1-.031.893A8.35 8.35 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.75.75 0 0 1 6 .278"/></svg>`;
            logoDesktop.src = "Assets/1.png";
            console.log("Light Mode On");
            color = `${navy}`;
        } else {
            element.classList.remove("light-mode");
            btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-sun-fill" viewBox="0 0 16 16"><path d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0m9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/></svg>`;
            logoDesktop.src = "Assets/3.png";
            console.log("Light Mode Off");
            color = `${yellow}`;
        }

        localStorage.setItem("lightMode", isLight ? "true" : "false");
        btnToggle = isLight ? 1 : 0;
        initParticles();
    }

    // Apply the saved mode on page load
    applyLightMode(btnToggle === 1);
    btn.addEventListener("click", () => {

        console.log("Button Clicked");

        applyLightMode(btnToggle === 0);
        toggleClickCount++;
        if (toggleClickCount >= 10) {
            location.reload();
            return;
        }

    });
});

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  const blockedHashes = [
    "ffea9d1125032e872817e164222dfcd7cd1a6b22b75491005a02c3a1506ce2ee"
  ];

  async function sha256(message) {
    const msgBuffer = new TextEncoder().encode(message);
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
  }

  const alertBox = document.getElementById("blockedAlert");
  const forms = document.querySelectorAll('.needs-validation');

  Array.from(forms).forEach(form => {
    form.addEventListener('submit', function(event) {
      event.preventDefault(); // stop browser submit immediately

      const emailInput = form.querySelector("input[type='email']");
      const email = emailInput ? emailInput.value.trim().toLowerCase() : "";

      sha256(email).then(hash => {
        // Blocked email check
        if (blockedHashes.includes(hash)) {
          if (alertBox) alertBox.classList.remove("d-none");
          return; // stop submission
        }

        // Check form validity (Bootstrap)
        if (!form.checkValidity()) {
          form.classList.add('was-validated');
          return; // stop submission
        }

        // All good — submit manually
        form.submit();
      });
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
    const visibleSubject = document.getElementById("subject");
    const hiddenSubject = document.querySelector("input[name='_subject']");

    if (visibleSubject && hiddenSubject) {
        visibleSubject.addEventListener("input", function () {
            hiddenSubject.value = visibleSubject.value;
        });
    }
});

async function langCode(){
  let text = "Languages I Code In"
  let split = text.split(""); 
  const p = document.getElementById("st-0-t");
  p.innerHTML = "";
  p.classList.remove("hidden");
  for (let i = 0; i < split.length; i++) {
    p.innerHTML += split[i];
    await new Promise(resolve => setTimeout(resolve, 100)); 
  }
  while (true){
    p.innerHTML = `${text}|`
    await new Promise(resolve => setTimeout(resolve, 400));
    p.innerHTML = text;
    await new Promise(resolve => setTimeout(resolve, 400));
  }
}

document.addEventListener("DOMContentLoaded", () => {
  langCode();
});
