document.addEventListener("DOMContentLoaded", () => {
  const root = document.documentElement;
  const themeToggle = document.getElementById("themeToggle");
  const toTop = document.getElementById("toTop");
  const cursorGlow = document.getElementById("cursorGlow");

  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    root.setAttribute("data-theme", "dark");
    themeToggle.textContent = "Modo claro";
  }

  themeToggle.addEventListener("click", () => {
    const isDark = root.getAttribute("data-theme") === "dark";

    if (isDark) {
      root.removeAttribute("data-theme");
      localStorage.setItem("theme", "light");
      themeToggle.textContent = "Modo oscuro";
    } else {
      root.setAttribute("data-theme", "dark");
      localStorage.setItem("theme", "dark");
      themeToggle.textContent = "Modo claro";
    }
  });

  window.addEventListener("mousemove", (event) => {
    if (!cursorGlow) return;

    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  });

  const revealElements = document.querySelectorAll(".reveal");

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.14 });

  revealElements.forEach((element) => revealObserver.observe(element));

  window.addEventListener("scroll", () => {
    if (window.scrollY > 600) {
      toTop.style.display = "block";
    } else {
      toTop.style.display = "none";
    }
  });

  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Carrusel
  const slides = document.querySelectorAll(".slide");
  const nextSlide = document.getElementById("nextSlide");
  const prevSlide = document.getElementById("prevSlide");
  let currentSlide = 0;

  function showSlide(index) {
    slides.forEach((slide) => slide.classList.remove("active"));
    slides[index].classList.add("active");
  }

  if (nextSlide && prevSlide && slides.length > 0) {
    nextSlide.addEventListener("click", () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    });

    prevSlide.addEventListener("click", () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    });
  }

  // Línea del tiempo
  const timelineData = {
    "stage-1": {
      label: "1946 · Origen impreso",
      title: "La revista como objeto de agenda",
      text: "SEMANA nace ligada a la tradición de la revista política. Su fuerza inicial está en ordenar la conversación pública, construir portadas memorables y ofrecer una lectura interpretativa del país.",
      image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80"
    },
    "stage-2": {
      label: "1982 · Segunda época",
      title: "Consolidación editorial e influencia política",
      text: "En su segunda etapa, SEMANA fortalece su presencia como medio político influyente. La portada, el reportaje y la opinión se convierten en piezas centrales de su identidad periodística.",
      image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=80"
    },
    "stage-3": {
      label: "2019-2020 · Giro empresarial",
      title: "Del impreso al digital como prioridad",
      text: "Con el ingreso del grupo Gilinski y la reorganización editorial, la estrategia digital se acelera. El medio empieza a pensarse menos como revista y más como ecosistema de contenidos.",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1200&q=80"
    },
    "stage-4": {
      label: "2020 · Video y señal digital",
      title: "La noticia se vuelve transmisión, clip y debate",
      text: "SEMANA apuesta con más fuerza por el video, las entrevistas, los en vivos y los formatos audiovisuales. La marca comienza a funcionar como señal continua, no solo como medio escrito.",
      image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=1200&q=80"
    },
    "stage-5": {
      label: "2025 · Rediseño móvil",
      title: "La pantalla del celular se vuelve el centro",
      text: "El rediseño del portal responde a una audiencia que consume mayoritariamente desde dispositivos móviles. Esto transforma la forma de jerarquizar, visualizar y empaquetar las noticias.",
      image: "https://images.unsplash.com/photo-1551817958-d9d86fb29431?auto=format&fit=crop&w=1200&q=80"
    },
    "stage-6": {
      label: "Actualidad · IA, polarización y confianza",
      title: "El reto ya no es solo llegar, sino ser creíble",
      text: "SEMANA enfrenta los grandes dilemas del periodismo contemporáneo: automatización, presión por métricas, polarización política, desinformación y necesidad de reconstruir confianza.",
      image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80"
    }
  };

  const timelineItems = document.querySelectorAll(".timeline-item");
  const stageLabel = document.getElementById("stageLabel");
  const stageTitle = document.getElementById("stageTitle");
  const stageText = document.getElementById("stageText");
  const stageImage = document.getElementById("stageImage");

  timelineItems.forEach((item) => {
    item.addEventListener("click", () => {
      const stage = item.dataset.stage;
      const data = timelineData[stage];

      timelineItems.forEach((button) => button.classList.remove("active"));
      item.classList.add("active");

      stageLabel.textContent = data.label;
      stageTitle.textContent = data.title;
      stageText.textContent = data.text;
      stageImage.src = data.image;
    });
  });

  // Plataformas
  const platformData = {
    web: {
      label: "Portal web",
      title: "La portada como centro de distribución",
      text: "El sitio web concentra la agenda, organiza secciones, publica últimas noticias y conecta con productos como contenido exclusivo, opinión, especiales, Semana TV, Semana Play y verticales temáticas.",
      image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80",
      tags: ["Notas", "Portada modular", "SEO", "Discover"]
    },
    youtube: {
      label: "YouTube",
      title: "La noticia como programa, entrevista y transmisión",
      text: "YouTube permite convertir la marca periodística en una señal audiovisual. Allí funcionan los debates, los lives, los clips extensos, los shorts y la presencia de rostros reconocibles.",
      image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=1200&q=80",
      tags: ["Entrevistas", "Lives", "Shorts", "Análisis"]
    },
    instagram: {
      label: "Instagram",
      title: "Visualidad, resumen y consumo rápido",
      text: "Instagram traduce la actualidad a reels, carruseles, historias y piezas visuales. Es una plataforma clave para empaquetar noticias con diseño, síntesis y emoción.",
      image: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=1200&q=80",
      tags: ["Reels", "Carruseles", "Historias", "Visualidad"]
    },
    tiktok: {
      label: "TikTok",
      title: "La noticia entra en la lógica del scroll",
      text: "TikTok exige videos cortos, entrada rápida, ritmo narrativo y una lectura mucho más cercana al entretenimiento informativo. Allí se disputa la atención de audiencias jóvenes.",
      image: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&w=1200&q=80",
      tags: ["Video corto", "Scroll", "Audiencias jóvenes", "Tendencias"]
    },
    facebook: {
      label: "Facebook",
      title: "Distribución masiva y conversación amplia",
      text: "Facebook sigue siendo una superficie importante para redistribuir enlaces, videos y transmisiones. Su valor está en el alcance, los comentarios y la circulación entre comunidades amplias.",
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1200&q=80",
      tags: ["Enlaces", "Videos", "Tráfico", "Comentarios"]
    },
    x: {
      label: "X/Twitter",
      title: "Agenda política en tiempo real",
      text: "X funciona como espacio de reacción inmediata. Es útil para última hora, opinión, debate político y circulación rápida de titulares, pero también intensifica la confrontación.",
      image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&w=1200&q=80",
      tags: ["Última hora", "Opinión", "Debate", "Agenda política"]
    }
  };

  const platformTabs = document.querySelectorAll(".platform-tab");
  const platformLabel = document.getElementById("platformLabel");
  const platformTitle = document.getElementById("platformTitle");
  const platformText = document.getElementById("platformText");
  const platformImage = document.getElementById("platformImage");
  const platformTags = document.getElementById("platformTags");

  platformTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const key = tab.dataset.platform;
      const data = platformData[key];

      platformTabs.forEach((button) => button.classList.remove("active"));
      tab.classList.add("active");

      platformLabel.textContent = data.label;
      platformTitle.textContent = data.title;
      platformText.textContent = data.text;
      platformImage.src = data.image;

      platformTags.innerHTML = data.tags.map(tag => `<span>${tag}</span>`).join("");
    });
  });

  // Arquitectura transmedia
  const storyData = {
    articulo: {
      label: "Formato 01",
      title: "Artículo web: profundidad, contexto y archivo",
      text: "La nota web organiza los hechos, entrega antecedentes, enlaza fuentes y deja registro. Es la pieza que puede sostener más contexto, pero compite con la presión de publicar rápido y titular para ser encontrado.",
      image: "https://images.unsplash.com/photo-1495020689067-958852a7765e?auto=format&fit=crop&w=1200&q=80"
    },
    reel: {
      label: "Formato 02",
      title: "Reel: síntesis visual para retener segundos",
      text: "El reel convierte la noticia en una pieza vertical, rápida y emocional. Sirve para atraer audiencia, pero puede simplificar demasiado temas complejos.",
      image: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?auto=format&fit=crop&w=1200&q=80"
    },
    short: {
      label: "Formato 03",
      title: "Short: video breve para consumo móvil",
      text: "El short condensa una idea, una declaración o un momento noticioso. Su potencia está en la velocidad, pero su límite está en la falta de contexto.",
      image: "https://images.unsplash.com/photo-1492724441997-5dc865305da7?auto=format&fit=crop&w=1200&q=80"
    },
    carrusel: {
      label: "Formato 04",
      title: "Carrusel: explicación visual paso a paso",
      text: "El carrusel permite ordenar datos, frases clave y contexto en varias pantallas. Es ideal para Instagram y para audiencias que quieren entender rápido sin leer una nota larga.",
      image: "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1200&q=80"
    },
    hilo: {
      label: "Formato 05",
      title: "Hilo en X: reacción, cronología y debate",
      text: "El hilo traduce la noticia en fragmentos sucesivos. Puede servir para explicar una secuencia, pero también entra fácilmente en dinámicas de confrontación política.",
      image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&w=1200&q=80"
    },
    live: {
      label: "Formato 06",
      title: "Live: presencia en tiempo real",
      text: "El live convierte el medio en señal. Permite cobertura continua, entrevistas y análisis inmediato, pero aumenta el riesgo de hablar antes de tener suficiente verificación.",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1200&q=80"
    },
    entrevista: {
      label: "Formato 07",
      title: "Entrevista: rostro, autoridad y conversación",
      text: "La entrevista pone en escena voces y figuras. En plataformas digitales, no solo informa: también genera clips, frases y fragmentos recirculables.",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80"
    },
    podcast: {
      label: "Formato 08",
      title: "Podcast: pausa, interpretación y profundidad",
      text: "El podcast ofrece una experiencia más lenta y conversacional. Es útil para análisis, contexto y construcción de comunidad.",
      image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?auto=format&fit=crop&w=1200&q=80"
    },
    newsletter: {
      label: "Formato 09",
      title: "Newsletter: relación directa con la audiencia",
      text: "La newsletter ayuda a reducir dependencia de redes. Llega al correo del usuario y permite construir una relación más estable que el simple clic ocasional.",
      image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=80"
    }
  };

  const storyNodes = document.querySelectorAll(".story-node");
  const storyLabel = document.getElementById("storyLabel");
  const storyTitle = document.getElementById("storyTitle");
  const storyText = document.getElementById("storyText");
  const storyImage = document.getElementById("storyImage");

  storyNodes.forEach((node) => {
    node.addEventListener("click", () => {
      const key = node.dataset.story;
      const data = storyData[key];

      storyNodes.forEach((button) => button.classList.remove("active"));
      node.classList.add("active");

      storyLabel.textContent = data.label;
      storyTitle.textContent = data.title;
      storyText.textContent = data.text;
      storyImage.src = data.image;
    });
  });

  // Flip cards en móvil: permitir click
  const flipCards = document.querySelectorAll(".flip-card");

  flipCards.forEach((card) => {
    card.addEventListener("click", () => {
      card.classList.toggle("flipped");
    });
  });
});