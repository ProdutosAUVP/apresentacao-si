/* =========================================================================
   Motor da apresentação — renderiza SLIDES, navega e controla o modo
   apresentador (notas, cronômetro, visão geral).
   Sem dependências, sem build. Funciona abrindo o index.html direto.
   ========================================================================= */

(function () {
  "use strict";

  const LOGO_LIGHT = "assets/brand/olho-branco.svg";
  const LOGO_DARK = "assets/brand/olho-preto.svg";

  const stage = document.getElementById("stage");
  const viewport = document.getElementById("viewport");
  const hud = document.getElementById("hud");
  const hudCount = document.getElementById("hud-count");
  const hudTimer = document.getElementById("hud-timer");
  const notes = document.getElementById("notes");
  const overview = document.getElementById("overview");
  const overviewGrid = document.getElementById("overview-grid");
  const help = document.getElementById("help");

  let current = 0;

  /* ---------- helpers --------------------------------------------------- */

  const esc = (s) =>
    String(s).replace(
      /[&<>"']/g,
      (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]
    );

  const pad = (n) => String(n).padStart(2, "0");

  // Layouts cujo rodapé pousa sobre área branca: o chrome de baixo fica escuro.
  const LIGHT_ROOT = new Set(["cards", "image-top"]);

  // O olho acompanha o fundo em que o cabeçalho pousa: faixa escura no topo
  // (cards / imagem no topo) e slides escuros usam a versão branca; o resto,
  // a preta — mesma lógica do template impresso.
  function headerLogo(slide) {
    if (LIGHT_ROOT.has(slide.layout)) return LOGO_LIGHT;
    return slide.theme === "dark" ? LOGO_LIGHT : LOGO_DARK;
  }

  function chromeTop(slide) {
    if (slide.layout === "cover") return "";
    return `<header class="chrome-top">
      <span class="hdr-label">${esc(slide.section || DECK.title)}</span>
      <div class="hdr-right">
        <span class="hdr-date">${esc(DECK.date)}</span>
        <img class="hdr-logo" src="${headerLogo(slide)}" alt="AUVP">
      </div>
    </header>`;
  }

  function chromeBottom(slide, index) {
    if (slide.layout === "cover") return "";
    return `<footer class="chrome-bottom">
      <span class="pg">${pad(index + 1)}</span>
      <span class="confid">Documento confidencial. Proibido compartilhamento.</span>
    </footer>`;
  }

  const rings = `<div class="rings" aria-hidden="true"><span></span><span></span><span></span><span></span><span></span></div>`;

  function annotation(slide) {
    if (!slide.annot) return "";
    return `<div class="annot pos-${esc(slide.annot.pos || "a")}">${esc(slide.annot.text)}</div>`;
  }

  function heading(slide, tag) {
    const t = tag || "h2";
    const cls = slide.longTitle ? ' class="is-long"' : slide.quote ? ' class="quote"' : "";
    const inner = slide.titleHTML ? slide.titleHTML : esc(slide.title || "");
    return `<${t}${cls}>${inner}</${t}>`;
  }

  /* ---------- layouts --------------------------------------------------- */

  const layouts = {
    cover(slide) {
      return `${rings}
        <div class="cover-bar">
          <span class="wordmark">${esc(slide.wordmark || "AUVP Capital")}</span>
          <img src="${LOGO_DARK}" alt="AUVP">
        </div>
        <div class="cover-body">
          <hr class="rule">
          <h1>${esc(slide.title)}</h1>
          ${slide.subtitle ? `<p class="cover-sub">${esc(slide.subtitle)}</p>` : ""}
        </div>`;
    },

    statement(slide) {
      const kicker = slide.kicker ? `<p class="kicker">${esc(slide.kicker)}</p>` : "";
      const lines = slide.lines
        ? `<div class="lines">${slide.lines.map((l) => `<span>${esc(l)}</span>`).join("")}</div>`
        : "";
      const title = slide.title || slide.titleHTML ? heading(slide) : "";
      const sub = slide.sub ? `<p class="sub">${esc(slide.sub)}</p>` : "";
      return `<div class="wrap">${kicker}${title}${lines}${sub}${chips(slide)}</div>`;
    },

    numbers(slide) {
      const items = (slide.items || [])
        .map((it) => `<div><div class="n">${esc(it.n)}</div><div class="t">${esc(it.t)}</div></div>`)
        .join("");
      return `<div class="wrap">${heading(slide)}<div class="num-grid">${items}</div></div>`;
    },

    flow(slide) {
      const steps = (slide.steps || [])
        .map(
          (s, i) =>
            `<div class="step"><div class="i">${pad(i + 1)}</div><div class="txt">${esc(s)}</div></div>`
        )
        .join("");
      const note = slide.flowNote ? `<p class="flow-note">${esc(slide.flowNote)}</p>` : "";
      return `<div class="wrap">${heading(slide)}<div class="flow">${steps}</div>${note}</div>`;
    },

    "image-left"(slide) {
      return `<div class="col-img${slide.bleed ? " is-bleed" : ""}">
          <img src="${slide.image}" alt="${esc(slide.imageAlt || "")}">
        </div>
        ${annotation(slide)}
        <div class="col-txt">
          ${heading(slide)}
          ${slide.body ? `<p class="body">${esc(slide.body)}</p>` : ""}
        </div>`;
    },

    "image-top"(slide) {
      return `<div class="band-img${slide.bleed ? " is-bleed" : ""}">
          <img src="${slide.image}" alt="${esc(slide.imageAlt || "")}">
        </div>
        ${annotation(slide)}
        <div class="band-txt">
          ${heading(slide)}
          ${slide.body ? `<p class="body">${esc(slide.body)}</p>` : ""}
        </div>`;
    },

    cards(slide) {
      const cards = (slide.cards || [])
        .map((c) => `<div class="card"><h3>${esc(c.h)}</h3><p>${esc(c.p)}</p></div>`)
        .join("");
      const label = slide.cardsLabel
        ? `<p class="cards-label">${esc(slide.cardsLabel)}</p>`
        : "";
      const lead = slide.lead ? `<p class="lead">${esc(slide.lead)}</p>` : "";
      return `<div class="band-dark">
          <div class="inner">${heading(slide)}${lead}</div>
          ${label}
        </div>
        <div class="cards n-${(slide.cards || []).length}">${cards}</div>`;
    },

    video(slide) {
      const media = slide.video
        ? `<video controls preload="metadata" poster="${slide.poster || ""}">
             <source src="${slide.video}">
           </video>`
        : `<img src="${slide.poster}" alt="Espaço reservado para o vídeo do sistema">`;
      return `<div class="wrap">
          <div>
            ${heading(slide)}
            ${slide.sub ? `<p class="sub">${esc(slide.sub)}</p>` : ""}
          </div>
          <div class="frame">${media}</div>
        </div>`;
    },

    closing(slide) {
      const deliver = (slide.deliver || []).map((d) => `<div>${esc(d)}</div>`).join("");
      return `${rings}
        <div class="wrap">
          ${heading(slide)}
          <div class="deliver">${deliver}</div>
          ${slide.slogan ? `<p class="slogan">${esc(slide.slogan)}</p>` : ""}
        </div>`;
    },
  };

  function chips(slide) {
    if (!slide.chips) return "";
    return `<div class="chips">${slide.chips.map((c) => `<span>${esc(c)}</span>`).join("")}</div>`;
  }

  /* ---------- montagem -------------------------------------------------- */

  function build() {
    document.title = DECK.title;
    stage.innerHTML = SLIDES.map((slide, i) => {
      const theme = LIGHT_ROOT.has(slide.layout) ? "light" : slide.theme || "light";
      const render = layouts[slide.layout];
      const inner = render ? render(slide) : `<div class="wrap">${heading(slide)}</div>`;
      return `<section class="slide l-${slide.layout} t-${theme}" data-i="${i}"
        aria-label="Slide ${i + 1} de ${SLIDES.length}">${chromeTop(slide)}${inner}${chromeBottom(
        slide,
        i
      )}</section>`;
    }).join("");

    overviewGrid.innerHTML = SLIDES.map((slide, i) => {
      const warn = (slide.marks || []).some((m) => m.indexOf("⚠️") === 0);
      const media = (slide.marks || []).filter(
        (m) => m.indexOf("📷") === 0 || m.indexOf("🎥") === 0
      ).length;
      const flags = [warn ? "⚠️ dado a preencher" : "", media ? "📷 mídia" : ""]
        .filter(Boolean)
        .join(" · ");
      return `<button type="button" data-goto="${i}">
        <div class="o-idx">${pad(i + 1)}</div>
        <div class="o-title">${esc(slide.navTitle || slide.title || "")}</div>
        ${flags ? `<div class="o-flag">${flags}</div>` : ""}
      </button>`;
    }).join("");

    overviewGrid.addEventListener("click", (e) => {
      const btn = e.target.closest("[data-goto]");
      if (!btn) return;
      go(Number(btn.dataset.goto));
      toggleOverview(false);
    });
  }

  /* ---------- escala do palco ------------------------------------------ */

  function resize() {
    const s = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    stage.style.transform = `translate(${Math.round((window.innerWidth - 1920 * s) / 2)}px, ${Math.round(
      (window.innerHeight - 1080 * s) / 2
    )}px) scale(${s})`;
  }

  /* ---------- navegação ------------------------------------------------ */

  function go(i) {
    current = Math.max(0, Math.min(SLIDES.length - 1, i));
    stage.querySelectorAll(".slide").forEach((el, k) => {
      el.classList.toggle("is-active", k === current);
    });
    document.getElementById("progress").style.width =
      ((current + 1) / SLIDES.length) * 100 + "%";
    hudCount.textContent = `${pad(current + 1)} / ${pad(SLIDES.length)}`;
    renderNotes();
    overviewGrid.querySelectorAll("button").forEach((b, k) => {
      b.classList.toggle("is-current", k === current);
    });
    if (history.replaceState) history.replaceState(null, "", "#" + (current + 1));
    else location.hash = current + 1;
    // pausa qualquer vídeo que não seja o do slide atual
    stage.querySelectorAll("video").forEach((v) => {
      if (!v.closest(".slide").classList.contains("is-active")) v.pause();
    });
    flashHud();
  }

  const next = () => go(current + 1);
  const prev = () => go(current - 1);

  /* ---------- notas ---------------------------------------------------- */

  function renderNotes() {
    const s = SLIDES[current];
    const marks = (s.marks || [])
      .map((m) => `<span class="${m.indexOf("⚠️") === 0 ? "warn" : ""}">${esc(m)}</span>`)
      .join("");
    notes.innerHTML = `<div class="n-head">
        <span class="n-idx">Slide ${pad(current + 1)}</span>
        <span class="n-title">${esc(s.navTitle || s.title || "")}</span>
        <span class="n-marks">${marks}</span>
      </div>
      <div class="n-body">${s.notes || "<p><em>Sem notas.</em></p>"}</div>`;
  }

  function toggleNotes(force) {
    if (force === undefined) notes.classList.toggle("is-open");
    else notes.classList.toggle("is-open", force);
  }

  function toggleOverview(force) {
    if (force === undefined) overview.classList.toggle("is-open");
    else overview.classList.toggle("is-open", force);
  }

  /* ---------- cronômetro ----------------------------------------------- */

  let elapsed = 0;
  let running = false;

  setInterval(() => {
    if (running) elapsed++;
    const m = Math.floor(elapsed / 60);
    hudTimer.textContent = `${pad(m)}:${pad(elapsed % 60)}`;
    hudTimer.classList.toggle("over", m >= DECK.targetMinutes);
  }, 1000);

  /* ---------- HUD ------------------------------------------------------- */

  let hudTimeout;
  function flashHud() {
    hud.classList.add("is-visible");
    clearTimeout(hudTimeout);
    hudTimeout = setTimeout(() => hud.classList.remove("is-visible"), 2600);
  }

  /* ---------- eventos --------------------------------------------------- */

  document.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key;

    if (k === "Escape") {
      toggleOverview(false);
      help.classList.remove("is-open");
      return;
    }

    switch (k) {
      case "ArrowRight":
      case "ArrowDown":
      case "PageDown":
      case " ":
        e.preventDefault();
        next();
        break;
      case "ArrowLeft":
      case "ArrowUp":
      case "PageUp":
        e.preventDefault();
        prev();
        break;
      case "Home":
        go(0);
        break;
      case "End":
        go(SLIDES.length - 1);
        break;
      case "s":
      case "S":
        toggleNotes();
        break;
      case "g":
      case "G":
      case "o":
      case "O":
        toggleOverview();
        break;
      case "t":
        running = !running;
        flashHud();
        break;
      case "T":
        elapsed = 0;
        running = false;
        flashHud();
        break;
      case "f":
      case "F":
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen();
        break;
      case "?":
      case "h":
      case "H":
        help.classList.toggle("is-open");
        break;
    }
  });

  viewport.addEventListener("click", (e) => {
    if (e.target.closest("video, button, a, #notes, #overview, #help")) return;
    if (e.clientX < window.innerWidth * 0.28) prev();
    else next();
  });

  let touchX = null;
  viewport.addEventListener(
    "touchstart",
    (e) => {
      touchX = e.touches[0].clientX;
    },
    { passive: true }
  );
  viewport.addEventListener(
    "touchend",
    (e) => {
      if (touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 56) dx < 0 ? next() : prev();
      touchX = null;
    },
    { passive: true }
  );

  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", flashHud);

  // Permite abrir/compartilhar um slide específico: index.html#7
  window.addEventListener("hashchange", () => {
    const n = parseInt(location.hash.replace(/\D/g, ""), 10);
    if (Number.isFinite(n) && n - 1 !== current) go(n - 1);
  });

  /* ---------- start ----------------------------------------------------- */

  build();
  resize();
  const fromHash = parseInt(location.hash.replace(/\D/g, ""), 10);
  go(Number.isFinite(fromHash) && fromHash > 0 ? fromHash - 1 : 0);
})();
