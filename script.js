function handleLinkClick(title, url) {
  event.target.closest(".link-item").style.transform = "scale(0.98)";

  setTimeout(() => {
    if (url.startsWith("mailto:")) {
      window.location.href = url;
    } else {
      window.open(url, "_blank");
    }
  }, 100);

  setTimeout(() => {
    event.target.closest(".link-item").style.transform = "";
  }, 200);
}

function validateProfileImage() {
  const profileImage = document.getElementById("profileImage");
  const profileContainer = document.getElementById("profileContainer");
  const imageUrl = profileImage.src;

  if (!imageUrl || imageUrl === "" || imageUrl.endsWith("/")) {
    showInitials();
    return;
  }

  profileImage.onload = function () {
    profileImage.classList.add("loaded");
    profileContainer.classList.add("has-image");
  };

  profileImage.onerror = function () {
    showInitials();
  };

  if (profileImage.complete && profileImage.naturalWidth > 0) {
    profileImage.classList.add("loaded");
    profileContainer.classList.add("has-image");
  }
}

function showInitials() {
  const profileImage = document.getElementById("profileImage");
  const profileContainer = document.getElementById("profileContainer");

  profileImage.classList.remove("loaded");
  profileContainer.classList.remove("has-image");
}

document.addEventListener("DOMContentLoaded", function () {
  setTimeout(() => {
    validateProfileImage();
  }, 100);

  const links = document.querySelectorAll(".link-item");

  links.forEach((link, index) => {
    link.addEventListener("mouseenter", function () {
      this.style.animationDelay = "0s";
    });
  });
});

document.querySelectorAll(".link-item").forEach((link) => {
  link.addEventListener("click", function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const ripple = document.createElement("div");
    ripple.className = "ripple";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    this.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

const PARTICLE_JS_CONFIG = {
  particles: {
    number: {
      value: window.innerWidth < 768 ? 20 : 40,
      density: { enable: true, value_area: 800 },
    },
    color: { value: "#ffffff" },
    shape: {
      type: "circle",
      stroke: { width: 0, color: "#000000" },
    },
    opacity: {
      value: 0.3,
      random: false,
      anim: { enable: false },
    },
    size: {
      value: 3,
      random: true,
      anim: { enable: false },
    },
    line_linked: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.2,
      width: 1,
    },
    move: {
      enable: true,
      speed: 3,
      direction: "none",
      random: false,
      straight: false,
      out_mode: "out",
      bounce: false,
    },
  },
  interactivity: {
    detect_on: "canvas",
    events: {
      onhover: { enable: false },
      onclick: { enable: false },
      resize: true,
    },
  },
  retina_detect: true,
};

particlesJS("particles-js", PARTICLE_JS_CONFIG);
