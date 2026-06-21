/* =================================================================
   MVP DE MI VIDA — TRIBUTO DE DÍA DEL PADRE
   script.js · Lógica de la página + CONFIGURACIÓN EDITABLE
   =================================================================
   ¿NO SABES PROGRAMAR? NO HAY PROBLEMA.
   Todo lo que necesitas cambiar está en el bloque "CONFIG" de aquí
   abajo. No necesitas tocar nada más en este archivo.
   ================================================================= */

const CONFIG = {

  /* ---------------------------------------------------------------
     1. PORTADA (HERO)
     --------------------------------------------------------------- */
  hero: {
    eyebrow: "Edición especial · Día del Padre",
    title: "Papá,<br>el padre santo que me dio la vida",          // <br> crea un salto de línea
    subtitle: "Hecho por tu hijo Fabricio, el unico heredero al vocho.",
    buttonText: "Comenzar el homenaje",
    buttonLink: "#galeria",                              // a qué sección lleva el botón
    bigNumber: "23"                                       // número decorativo gigante de fondo
  },

  /* ---------------------------------------------------------------
     2. MARCADOR — estadísticas personalizadas estilo NBA
     Agrega, edita o elimina las que quieras. Si "isInfinity" es
     true, se mostrará el símbolo ∞ en vez de contar un número.
     --------------------------------------------------------------- */
  stats: [
    { label: "Edad del ganador",        value: 49,   suffix: "",  isInfinity: false },
    { label: "Altura del duendecillo",       value: 160,  suffix: "+", isInfinity: false },
    { label: "Amor por el Vocho",             value: 100,  suffix: "%", isInfinity: false },
    { label: "Cariño por su hijo",             value: 0,    suffix: "",  isInfinity: true  }
  ],

  /* ---------------------------------------------------------------
     3. GALERÍA DE FOTOS
     ─────────────────────────────────────────────────────────────
     CÓMO AGREGAR TUS FOTOS:
     1) Copia tus imágenes dentro de la carpeta /img
     2) Agrega una línea nueva aquí abajo por cada foto:

        { src: "img/NOMBRE-DEL-ARCHIVO.jpg", caption: "Tu leyenda", tag: "2024" },

     - "src"     → la ruta del archivo dentro de /img
     - "caption" → el texto que aparece al pasar el cursor sobre la foto
     - "tag"     → una etiqueta corta opcional (año, lugar, apodo...)
                   escribe "" si no quieres mostrar ninguna
     Puedes agregar tantas fotos como quieras, el diseño se acomoda solo.
     --------------------------------------------------------------- */
  photos: [
    { src: "foto_1.jpg", caption: "Aqui posando como verdaderos modelos", tag: "1" },
    { src: "foto_2.jpg", caption: "Tu y yo de ratones, uno mas dienton que otro",     tag: "2" },
    { src: "foto_3.jpg", caption: "Tu de joven en tu mejor momento",     tag: "3" },
    { src: "foto_4.jpg", caption: "Pensando en tu existencia",           tag: "4" },
    { src: "foto_5.jpg", caption: "Que elegancia la de francia",     tag: "5" },
    { src: "foto_6.jpg", caption: "Jugando en las ligas mayores",      tag: "6" }
  ],

  /* ---------------------------------------------------------------
     4. MENSAJES / DEDICATORIAS
     Agrega o quita tarjetas con tus propios mensajes para papá.
     --------------------------------------------------------------- */
  messages: [
    {
      title: "El mejor padre",
      text: "Tuviste un mal padre, pero nunca seguiste sus ejemplos y siempre me apoyaste en todo lo que necesite."
    },
    {
      title: "Confianza",
      text: "Puedo hablar contigo en confianza y decir cualquier palabra tonta o frase."
    },
    {
      title: "Errores",
      text: "Aunque a veces cometias errores, siempre te dabas cuenta y tratabas de corregirte."
    },
    {
      title: "Enseñanza",
      text: "Me enseñaste varias cosas buenas que hoy en dia me ayudan actuar como se debe."
    }
  ],

  /* ---------------------------------------------------------------
     5. CANCIÓN DE FONDO
     ─────────────────────────────────────────────────────────────
     CÓMO AGREGAR TU CANCIÓN:
     1) Copia tu archivo .mp3 dentro de la carpeta /music
     2) Escribe aquí abajo el nombre exacto del archivo
     --------------------------------------------------------------- */
  song: {
    src: "musica_1.mp3",     // nombre del archivo dentro de /music
    title: "LE DIJE A PAPA",
    artist: "EVA AYLLON",
    defaultVolume: 70             // volumen inicial (0 a 100)
  },

  /* ---------------------------------------------------------------
     6. PIE DE PÁGINA
     --------------------------------------------------------------- */
  footer: {
    message: "Feliz Día del Padre",
    signature: "Espero que te haya gustado, es algo simple pero mi mente no tuvo mucha creatividad jaja, ya otro año te hare algo mas grande o te comprare algo"
  }

};

/* =================================================================
   A PARTIR DE AQUÍ: LÓGICA DE LA PÁGINA
   No es necesario editar nada más abajo para personalizar tus
   textos, fotos o música — todo eso ya se controla desde CONFIG.
   ================================================================= */

document.addEventListener("DOMContentLoaded", () => {
  renderHero();
  renderStats();
  renderGallery();
  renderMessages();
  renderMusic();
  renderFooter();

  initScrollProgress();
  initDotNav();
  initRevealOnScroll();
  initLightbox();
  initAudioPlayer();
  initParticles();
});

/* -----------------------------------------------------------------
   RENDER: PORTADA
   ----------------------------------------------------------------- */
function renderHero() {
  const { hero } = CONFIG;
  document.getElementById("heroEyebrow").textContent = hero.eyebrow;
  document.getElementById("heroTitle").innerHTML = hero.title;
  document.getElementById("heroSubtitle").textContent = hero.subtitle;
  document.getElementById("heroNumber").textContent = hero.bigNumber;

  const cta = document.getElementById("heroCta");
  cta.querySelector("span").textContent = hero.buttonText;
  cta.setAttribute("href", hero.buttonLink);
}

/* -----------------------------------------------------------------
   RENDER: MARCADOR / ESTADÍSTICAS
   ----------------------------------------------------------------- */
function renderStats() {
  const wrap = document.getElementById("scoreboard");
  wrap.innerHTML = "";

  CONFIG.stats.forEach((stat) => {
    const card = document.createElement("div");
    card.className = "stat-card";

    const value = document.createElement("span");
    value.className = "stat-card__value" + (stat.isInfinity ? " is-infinity" : "");
    value.textContent = stat.isInfinity ? "∞" : "0" + stat.suffix;
    value.dataset.target = stat.value;
    value.dataset.suffix = stat.suffix || "";
    value.dataset.infinity = stat.isInfinity ? "true" : "false";

    const label = document.createElement("span");
    label.className = "stat-card__label";
    label.textContent = stat.label;

    card.appendChild(value);
    card.appendChild(label);
    wrap.appendChild(card);
  });
}

/* Animación de conteo ascendente para las estadísticas del marcador */
function animateStats() {
  document.querySelectorAll(".stat-card__value").forEach((el) => {
    if (el.dataset.infinity === "true" || el.dataset.animated === "true") return;
    el.dataset.animated = "true";

    const target = parseInt(el.dataset.target, 10) || 0;
    const suffix = el.dataset.suffix || "";
    const duration = 1600;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cúbico
      const current = Math.round(eased * target);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });
}

/* -----------------------------------------------------------------
   RENDER: GALERÍA DE FOTOS
   ----------------------------------------------------------------- */
function renderGallery() {
  const grid = document.getElementById("galleryGrid");
  grid.innerHTML = "";

  CONFIG.photos.forEach((photo, index) => {
    const item = document.createElement("figure");
    item.className = "gallery-item";
    item.setAttribute("data-index", index);
    item.setAttribute("tabindex", "0");
    item.setAttribute("role", "button");
    item.setAttribute("aria-label", "Ampliar foto: " + (photo.caption || "foto " + (index + 1)));
    item.setAttribute("data-missing-text", "Agrega " + photo.src.split("/").pop() + " en la carpeta /img");

    item.innerHTML = `
      ${photo.tag ? `<span class="gallery-item__tag">${photo.tag}</span>` : ""}
      <img src="${photo.src}" alt="${photo.caption || "Fotografía"}" loading="lazy">
      <div class="gallery-item__shine" aria-hidden="true"></div>
      ${photo.caption ? `<figcaption class="gallery-item__caption">${photo.caption}</figcaption>` : ""}
    `;

    // Si la imagen no existe todavía, mostramos un marcador elegante
    const imgEl = item.querySelector("img");
    imgEl.addEventListener("error", () => item.classList.add("img-missing"), { once: true });

    grid.appendChild(item);
  });
}

/* -----------------------------------------------------------------
   RENDER: MENSAJES
   ----------------------------------------------------------------- */
function renderMessages() {
  const grid = document.getElementById("messagesGrid");
  grid.innerHTML = "";

  CONFIG.messages.forEach((msg, index) => {
    const card = document.createElement("article");
    card.className = "message-card reveal";
    card.innerHTML = `
      <span class="message-card__quote-mark" aria-hidden="true">&rdquo;</span>
      <span class="message-card__number">Mensaje 0${index + 1}</span>
      <h3 class="message-card__title">${msg.title}</h3>
      <p class="message-card__text">${msg.text}</p>
    `;
    grid.appendChild(card);
  });

  // Vuelve a observar las tarjetas recién creadas para la animación de aparición
  observeRevealElements();
}

/* -----------------------------------------------------------------
   RENDER: MÚSICA
   ----------------------------------------------------------------- */
function renderMusic() {
  const { song } = CONFIG;
  document.getElementById("songTitle").textContent = song.title;
  document.getElementById("songArtist").textContent = song.artist;

  const audio = document.getElementById("audioPlayer");
  audio.src = song.src;

  const volumeBar = document.getElementById("volumeBar");
  volumeBar.value = song.defaultVolume;
  audio.volume = song.defaultVolume / 100;
}

/* -----------------------------------------------------------------
   RENDER: FOOTER
   ----------------------------------------------------------------- */
function renderFooter() {
  document.getElementById("footerMessage").textContent = CONFIG.footer.message;
  document.getElementById("footerSignature").textContent = CONFIG.footer.signature;
}

/* -----------------------------------------------------------------
   BARRA DE PROGRESO DE SCROLL
   ----------------------------------------------------------------- */
function initScrollProgress() {
  const bar = document.getElementById("scrollProgressBar");
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    bar.style.width = pct + "%";
  }, { passive: true });
}

/* -----------------------------------------------------------------
   NAVEGACIÓN DE PUNTOS LATERAL
   ----------------------------------------------------------------- */
function initDotNav() {
  const dots = document.querySelectorAll(".dot-nav__dot");
  const sections = Array.from(dots).map((dot) => document.querySelector(dot.getAttribute("href")));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const idx = sections.indexOf(entry.target);
        dots.forEach((d) => d.classList.remove("is-active"));
        if (dots[idx]) dots[idx].classList.add("is-active");
      }
    });
  }, { threshold: 0.5 });

  sections.forEach((sec) => sec && observer.observe(sec));
}

/* -----------------------------------------------------------------
   ANIMACIÓN DE APARICIÓN AL HACER SCROLL (reveal)
   ----------------------------------------------------------------- */
// El observer se crea aquí, en el nivel superior del archivo, para que
// ya exista en cuanto se cargue el script — antes de que cualquier
// función de renderizado intente usarlo (evita errores de orden).
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");

      // Si es el marcador, disparamos el conteo de estadísticas
      if (entry.target.id === "scoreboard") animateStats();

      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.18 });

function initRevealOnScroll() {
  observeRevealElements();
}

function observeRevealElements() {
  document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => {
    revealObserver.observe(el);
  });
}

/* -----------------------------------------------------------------
   LIGHTBOX — VISOR DE FOTOS AMPLIADO
   ----------------------------------------------------------------- */
function initLightbox() {
  const lightbox = document.getElementById("lightbox");
  const imgEl = document.getElementById("lightboxImg");
  const captionEl = document.getElementById("lightboxCaption");
  const closeBtn = document.getElementById("lightboxClose");
  const prevBtn = document.getElementById("lightboxPrev");
  const nextBtn = document.getElementById("lightboxNext");

  let currentIndex = 0;

  function openLightbox(index) {
    const photo = CONFIG.photos[index];
    if (!photo) return;
    currentIndex = index;
    imgEl.src = photo.src;
    imgEl.alt = photo.caption || "Fotografía ampliada";
    captionEl.textContent = photo.caption || "";
    lightbox.classList.add("is-open");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    lightbox.classList.remove("is-open");
    document.body.style.overflow = "";
  }

  function showRelative(delta) {
    const total = CONFIG.photos.length;
    currentIndex = (currentIndex + delta + total) % total;
    openLightbox(currentIndex);
  }

  document.getElementById("galleryGrid").addEventListener("click", (e) => {
    const item = e.target.closest(".gallery-item");
    if (!item || item.classList.contains("img-missing")) return;
    openLightbox(parseInt(item.dataset.index, 10));
  });

  document.getElementById("galleryGrid").addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      const item = e.target.closest(".gallery-item");
      if (item && !item.classList.contains("img-missing")) {
        e.preventDefault();
        openLightbox(parseInt(item.dataset.index, 10));
      }
    }
  });

  closeBtn.addEventListener("click", closeLightbox);
  prevBtn.addEventListener("click", () => showRelative(-1));
  nextBtn.addEventListener("click", () => showRelative(1));

  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) closeLightbox();
  });

  document.addEventListener("keydown", (e) => {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showRelative(1);
    if (e.key === "ArrowLeft") showRelative(-1);
  });
}

/* -----------------------------------------------------------------
   REPRODUCTOR DE MÚSICA
   ----------------------------------------------------------------- */
function initAudioPlayer() {
  const audio = document.getElementById("audioPlayer");
  const playBtn = document.getElementById("playBtn");
  const iconPlay = document.getElementById("iconPlay");
  const iconPause = document.getElementById("iconPause");
  const progressBar = document.getElementById("progressBar");
  const volumeBar = document.getElementById("volumeBar");
  const timeCurrent = document.getElementById("timeCurrent");
  const timeTotal = document.getElementById("timeTotal");
  const disc = document.getElementById("playerDisc");
  const eq = document.getElementById("playerEq");
  const hint = document.getElementById("playerHint");

  function formatTime(seconds) {
    if (!isFinite(seconds) || isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  }

  function setPlayingState(isPlaying) {
    iconPlay.style.display = isPlaying ? "none" : "block";
    iconPause.style.display = isPlaying ? "block" : "none";
    playBtn.setAttribute("aria-label", isPlaying ? "Pausar canción" : "Reproducir canción");
    disc.classList.toggle("is-spinning", isPlaying);
    eq.classList.toggle("is-active", isPlaying);
  }

  playBtn.addEventListener("click", () => {
    if (audio.paused) {
      audio.play().catch(() => {
        hint.textContent = "No se encontró el archivo de música. Revisa CONFIG.song en script.js y la carpeta /music.";
      });
    } else {
      audio.pause();
    }
  });

  audio.addEventListener("play", () => setPlayingState(true));
  audio.addEventListener("pause", () => setPlayingState(false));

  audio.addEventListener("loadedmetadata", () => {
    timeTotal.textContent = formatTime(audio.duration);
    progressBar.max = audio.duration || 0;
  });

  audio.addEventListener("timeupdate", () => {
    progressBar.value = audio.currentTime;
    timeCurrent.textContent = formatTime(audio.currentTime);
  });

  progressBar.addEventListener("input", () => {
    audio.currentTime = progressBar.value;
  });

  volumeBar.addEventListener("input", () => {
    audio.volume = volumeBar.value / 100;
  });

  audio.addEventListener("ended", () => setPlayingState(false));
}

/* -----------------------------------------------------------------
   PARTÍCULAS DORADAS DE FONDO (canvas decorativo y liviano)
   ----------------------------------------------------------------- */
function initParticles() {
  const canvas = document.getElementById("particles-canvas");
  const ctx = canvas.getContext("2d");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let particles = [];
  let width, height;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize);

  const colors = ["rgba(212,175,55,0.55)", "rgba(255,106,26,0.45)", "rgba(247,244,238,0.3)"];
  const count = window.innerWidth < 700 ? 26 : 50;

  for (let i = 0; i < count; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.8 + 0.6,
      speed: Math.random() * 0.35 + 0.08,
      drift: Math.random() * 0.4 - 0.2,
      color: colors[Math.floor(Math.random() * colors.length)]
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach((p) => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();

      if (!prefersReducedMotion) {
        p.y -= p.speed;
        p.x += p.drift;
        if (p.y < -10) { p.y = height + 10; p.x = Math.random() * width; }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
      }
    });
    requestAnimationFrame(draw);
  }
  draw();
}
