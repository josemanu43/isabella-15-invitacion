/* ===================================================== */
/* CONFIGURACIÓN SWIPER: LUXURY GALLERY COVERFLOW */
/* ===================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // 1. Inicializar Swiper con el efecto premium
  const swiper = new Swiper(".mySwiper", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true, // La imagen principal siempre al centro
    slidesPerView: "auto", // Se adapta al ancho de las cards en CSS
    initialSlide: 2, // Inicia en la foto central
    
    coverflowEffect: {
      rotate: 0,      // Sin rotación, diseño plano y moderno
      stretch: 0,
      depth: 100,     // Profundidad de los slides inactivos
      modifier: 2,    // Multiplicador del efecto 3D
      slideShadows: false, // Las sombras las maneja el CSS
    },

    // Reproducción automática fluida
    autoplay: {
      delay: 3500,
      disableOnInteraction: false,
    },

    // Bucle infinito
    loop: true,

    // Puntos de navegación
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
      dynamicBullets: true, // Puntos con tamaño dinámico (estilo iOS)
    },

    // Sensibilidad táctil optimizada
    touchRatio: 1.5,
    resistanceRatio: 0.85,
  });

  // 2. Optimización de rendimiento (Tu lógica de visibilidad)
  // Pausa el carrusel si el usuario minimiza el navegador o cambia de pestaña
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      swiper.autoplay.stop();
    } else {
      swiper.autoplay.start();
    }
  });

  /* 
    Nota: El efecto suave de escala al cambiar de slide ahora está
    optimizado íntegramente en style.css (.swiper-slide-active y .slide-inner img)
    para garantizar 60fps constantes en dispositivos móviles.
  */
});