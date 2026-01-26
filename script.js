// © 2025 Om Kanabar.
// More info in LICENSE
// Restored this page just so people can contact me

const navy = `#233c4a`;
const yellow = `#ffb300`;

var color = `${yellow}`

function initParticles() {
  const particlesElement = document.getElementById("particles-js");
  if (!particlesElement) return;
  if (window.pJSDom && window.pJSDom.length) {
    window.pJSDom[0].pJS.fn.vendors.destroypJS();
    window.pJSDom = [];
  }
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

async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

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

function pause(ms){
  return new Promise(resolve => setTimeout(resolve, ms));
}

document.addEventListener("DOMContentLoaded", () => {
  langCode();
});
