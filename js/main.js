/* ===================================================== */
/* 1. PANTALLA DE BIENVENIDA Y AUDIO (NUEVO) */
/* ===================================================== */

const welcomeOverlay = document.getElementById("welcomeOverlay");
const openInviteBtn = document.getElementById("openInvite");
const bgMusic = document.getElementById("bgMusic");
const musicBtn = document.getElementById("musicBtn");

// Bloquear el scroll inicialmente
document.body.classList.add("no-scroll");

if (openInviteBtn) {
  openInviteBtn.addEventListener("click", () => {
    
    // 1. Iniciar la música
    if (bgMusic) {
      bgMusic.volume = 0.6; // Volumen al 60% para que no sature
      bgMusic.play().catch(error => console.log("Autoplay bloqueado por el navegador", error));
    }

    // 2. Ocultar la pantalla de bienvenida
    if (welcomeOverlay) {
      welcomeOverlay.classList.add("hidden");
    }

    // 3. Restaurar el scroll de la página
    document.body.classList.remove("no-scroll");

    // 4. Mostrar botón flotante animado
    if (musicBtn) {
      musicBtn.classList.add("visible", "playing");
    }

    // 5. Iniciar las animaciones del texto principal (Hero)
    iniciarAnimacionesHero();
  });
}

// Lógica del botón flotante (Pausar / Reproducir)
if (musicBtn) {
  musicBtn.addEventListener("click", () => {
    if (bgMusic.paused) {
      bgMusic.play();
      musicBtn.classList.add("playing");
    } else {
      bgMusic.pause();
      musicBtn.classList.remove("playing");
    }
  });
}


/* ===================================================== */
/* 2. PRELOADER & HERO ANIMATIONS (GSAP) */
/* ===================================================== */

window.addEventListener("load", () => {
  // Solo ocultamos el preloader inicial al cargar la página
  gsap.to(".luxury-preloader", {
    autoAlpha: 0,
    duration: 1,
    ease: "power2.inOut",
  });
});

// Esta función ahora se llama ÚNICAMENTE cuando el usuario hace clic en "Abrir Invitación"
function iniciarAnimacionesHero() {
  const tl = gsap.timeline();

  tl.fromTo(".hero-subtitle", 
    { y: 30, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out" }
  )
  .fromTo(".hero-title",
    { y: 50, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 1.2, ease: "power4.out" },
    "-=0.7"
  )
  .fromTo(".hero-lastname",
    { y: 30, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out" },
    "-=0.9"
  )
  .fromTo(".divider",
    { scaleY: 0, transformOrigin: "top" },
    { scaleY: 1, duration: 1, ease: "power2.out" },
    "-=0.6"
  )
  .fromTo(".hero-event",
    { y: 20, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 0.8, ease: "power2.out" },
    "-=0.5"
  )
  .fromTo(".scroll-indicator",
    { y: 20, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 1, ease: "power2.out" },
    "-=0.3"
  );
}


/* ===================================================== */
/* 3. CUENTA REGRESIVA */
/* ===================================================== */

// Fecha del evento: 15 de Agosto a las 7:30 PM
const eventDate = new Date("2026-08-15T19:30:00").getTime();

const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

function updateCountdown() {
  const now = new Date().getTime();
  const distance = eventDate - now;

  // Si el evento ya pasó
  if (distance < 0) {
    if(daysEl) {
      daysEl.innerHTML = "00";
      hoursEl.innerHTML = "00";
      minutesEl.innerHTML = "00";
      secondsEl.innerHTML = "00";
    }
    return;
  }

  // Cálculos de tiempo
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  // Pintar valores
  if(daysEl) {
    daysEl.innerHTML = formatTime(days);
    hoursEl.innerHTML = formatTime(hours);
    minutesEl.innerHTML = formatTime(minutes);
    secondsEl.innerHTML = formatTime(seconds);
  }
}

function formatTime(time) {
  return time < 10 ? `0${time}` : time;
}

// Inicializar
updateCountdown();
setInterval(updateCountdown, 1000);


/* ===================================================== */
/* 4. MODAL CÓDIGO DE VESTIMENTA */
/* ===================================================== */

const dresscodeBtn = document.getElementById("dresscodeBtn");
const dresscodeModal = document.getElementById("dresscodeModal");
const closeModal = document.getElementById("closeModal");

// Abrir modal
if (dresscodeBtn) {
  dresscodeBtn.addEventListener("click", () => {
    dresscodeModal.classList.add("active");
    document.body.classList.add("no-scroll"); // Bloquear scroll
  });
}

// Cerrar modal
function closeDresscodeModal() {
  dresscodeModal.classList.remove("active");
  document.body.classList.remove("no-scroll"); // Restaurar scroll
}

if (closeModal) {
  closeModal.addEventListener("click", closeDresscodeModal);
}

// Cerrar al dar click fuera del contenido de cristal
if (dresscodeModal) {
  dresscodeModal.addEventListener("click", (e) => {
    if (e.target === dresscodeModal) {
      closeDresscodeModal();
    }
  });
}

// Cerrar con ESC
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && dresscodeModal?.classList.contains("active")) {
    closeDresscodeModal();
  }
});


/* ===================================================== */
/* 5. ANIMACIONES AL HACER SCROLL (INTERSECTION OBSERVER) */
/* ===================================================== */

const animatedElements = document.querySelectorAll(".fade-up, .fade-left, .fade-right");

const observerOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = entry.target;

      if (target.classList.contains("fade-up")) {
        gsap.fromTo(target, 
          { y: 50, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out" }
        );
      } 
      else if (target.classList.contains("fade-left")) {
        gsap.fromTo(target, 
          { x: -50, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 1.2, ease: "power3.out" }
        );
      } 
      else if (target.classList.contains("fade-right")) {
        gsap.fromTo(target, 
          { x: 50, autoAlpha: 0 },
          { x: 0, autoAlpha: 1, duration: 1.2, ease: "power3.out" }
        );
      }

      // Dejar de observar una vez animado
      observer.unobserve(target);
    }
  });
}, observerOptions);

animatedElements.forEach((el) => observer.observe(el));


/* ===================================================== */
/* 6. EFECTO PARALLAX SUAVE (HERO & IMÁGENES) */
/* ===================================================== */

const parallaxElements = document.querySelectorAll(".parallax-bg");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  
  requestAnimationFrame(() => {
    parallaxElements.forEach((el) => {
      // Movimiento muy sutil hacia abajo mientras se hace scroll
      el.style.transform = `translateY(${scrollY * 0.15}px)`;
    });
  });
});


/* ===================================================== */
/* 7. SCROLL SUAVE LINKS INTERNOS */
/* ===================================================== */

const internalLinks = document.querySelectorAll('a[href^="#"]');

internalLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId.length > 1) {
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});


/* ===================================================== */
/* 8. CONSOLA */
/* ===================================================== */
console.log("✨ Experiencia Luxury Isabella cargada correctamente ✨");