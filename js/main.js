/* ===================================================== */
/* 1. PRELOADER & HERO ANIMATIONS (GSAP) */
/* ===================================================== */

window.addEventListener("load", () => {
  const tl = gsap.timeline();

  // 1. Ocultar el preloader
  tl.to(".luxury-preloader", {
    autoAlpha: 0, // opacity 0 y visibility hidden
    duration: 1,
    ease: "power2.inOut",
  })
  // 2. Animar los elementos del Hero
  .fromTo(".hero-subtitle", 
    { y: 30, autoAlpha: 0 },
    { y: 0, autoAlpha: 1, duration: 1, ease: "power3.out" },
    "-=0.2"
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
});

/* ===================================================== */
/* 2. CUENTA REGRESIVA */
/* ===================================================== */

// Fecha del evento: 15 de Agosto a las 7:00 PM (Ajusta el año si es necesario)
const eventDate = new Date("2026-08-15T19:00:00").getTime();

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
/* 3. MODAL CÓDIGO DE VESTIMENTA */
/* ===================================================== */

const dresscodeBtn = document.getElementById("dresscodeBtn");
const dresscodeModal = document.getElementById("dresscodeModal");
const closeModal = document.getElementById("closeModal");

// Abrir modal
if (dresscodeBtn) {
  dresscodeBtn.addEventListener("click", () => {
    dresscodeModal.classList.add("active");
    document.body.style.overflow = "hidden"; // Bloquear scroll de la página
  });
}

// Cerrar modal
function closeDresscodeModal() {
  dresscodeModal.classList.remove("active");
  document.body.style.overflow = "auto"; // Restaurar scroll
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
/* 4. ANIMACIONES AL HACER SCROLL (INTERSECTION OBSERVER) */
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
/* 5. EFECTO PARALLAX SUAVE (HERO & IMÁGENES) */
/* ===================================================== */

const parallaxElements = document.querySelectorAll(".parallax-bg");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;
  
  // Parallax exclusivo para móviles y escritorio (animación fluida)
  requestAnimationFrame(() => {
    parallaxElements.forEach((el) => {
      // Movimiento muy sutil hacia abajo mientras se hace scroll
      el.style.transform = `translateY(${scrollY * 0.15}px)`;
    });
  });
});

/* ===================================================== */
/* 6. SCROLL SUAVE LINKS INTERNOS */
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
/* 7. CONSOLA */
/* ===================================================== */
console.log("✨ Experiencia Luxury Isabella cargada correctamente ✨");