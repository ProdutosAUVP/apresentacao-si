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

  // Índice de animação: cada elemento marcado entra um pouco depois do anterior
  let step = 0;
  const anim = () => ` data-anim style="--i:${step++}"`;
  const resetAnim = () => (step = 0);

  // Layouts que sempre têm a metade de baixo branca: a raiz é clara e o verde
  // fica confinado à faixa/painel.
  const LIGHT_ROOT = new Set(["cards", "image-top"]);

  /* ---------- anéis concêntricos ---------------------------------------- */

  // O eixo do menor círculo pousa exatamente no canto pedido. Como todos são
  // concêntricos, 3/4 de cada um sai da tela. A opacidade cai conforme o raio
  // cresce, então o menor é o mais presente.
  function rings(opts) {
    const o = opts || {};
    const corner = o.corner || "br";
    const count = o.count || 6;
    const base = o.base || 340; // diâmetro do menor
    const step_ = o.step || 210; // quanto cresce a cada anel
    const from = o.from || 0.5; // opacidade do menor
    const to = o.to || 0.06; // opacidade do maior

    let out = "";
    for (let i = 0; i < count; i++) {
      const size = base + i * step_;
      const op = from + ((to - from) * i) / Math.max(1, count - 1);
      out += `<i style="width:${size}px;height:${size}px;opacity:${op.toFixed(3)};--i:${i}"></i>`;
    }
    return `<div class="rings c-${esc(corner)}" aria-hidden="true">${out}</div>`;
  }

  /* ---------- chrome ---------------------------------------------------- */

  // O olho acompanha o fundo em que o cabeçalho pousa.
  function headerLogo(slide) {
    if (slide.layout === "image-top") return LOGO_LIGHT;
    if (slide.layout === "cards") return slide.theme === "dark" ? LOGO_LIGHT : LOGO_DARK;
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

  function annotation(slide) {
    if (!slide.annot) return "";
    return `<div class="annot pos-${esc(slide.annot.pos || "a")}"${anim()}>${esc(
      slide.annot.text
    )}</div>`;
  }

  function heading(slide, tag) {
    const t = tag || "h2";
    const cls = slide.longTitle ? "is-long" : slide.quote ? "quote" : "";
    const inner = slide.titleHTML ? slide.titleHTML : esc(slide.title || "");
    return `<${t} class="${cls}"${anim()}>${inner}</${t}>`;
  }

  function chips(slide) {
    if (!slide.chips) return "";
    const items = slide.chips
      .map((c) => {
        const label = typeof c === "string" ? c : c.label;
        const color = typeof c === "string" ? "155 70% 24%" : c.color;
        return `<span style="--c:${color}">${esc(label)}</span>`;
      })
      .join("");
    return `<div class="chips"${anim()}>${items}</div>`;
  }

  /* ---------- layouts --------------------------------------------------- */

  const layouts = {
    cover(slide) {
      return `${rings(slide.rings || { corner: "br", from: 0.42 })}
        <div class="cover-bar">
          <span class="wordmark">${esc(slide.wordmark || "AUVP Capital")}</span>
          <img src="${LOGO_DARK}" alt="AUVP">
        </div>
        <div class="cover-body">
          <hr class="rule">
          <h1${anim()}>${esc(slide.title)}</h1>
          ${slide.subtitle ? `<p class="cover-sub"${anim()}>${esc(slide.subtitle)}</p>` : ""}
        </div>`;
    },

    statement(slide) {
      const kicker = slide.kicker ? `<p class="kicker"${anim()}>${esc(slide.kicker)}</p>` : "";
      const title = slide.title || slide.titleHTML ? heading(slide) : "";
      const lines = slide.lines
        ? `<div class="lines">${slide.lines
            .map((l) => `<span${anim()}>${esc(l)}</span>`)
            .join("")}</div>`
        : "";
      const sub = slide.sub ? `<p class="sub"${anim()}>${esc(slide.sub)}</p>` : "";
      return `${slide.rings ? rings(slide.rings) : ""}
        <div class="wrap">${kicker}${title}${lines}${sub}${chips(slide)}</div>`;
    },

    numbers(slide) {
      const items = (slide.items || [])
        .map(
          (it) =>
            `<div${anim()}><div class="n">${esc(it.n)}</div><div class="t">${esc(it.t)}</div></div>`
        )
        .join("");
      return `${slide.rings ? rings(slide.rings) : ""}
        <div class="wrap">${heading(slide)}<div class="num-grid">${items}</div></div>`;
    },

    flow(slide) {
      const steps = (slide.steps || [])
        .map(
          (s, i) =>
            `<div class="step"${anim()}><div class="i">${pad(i + 1)}</div><div class="txt">${esc(
              s
            )}</div></div>`
        )
        .join("");
      const note = slide.flowNote ? `<p class="flow-note"${anim()}>${esc(slide.flowNote)}</p>` : "";
      return `${slide.rings ? rings(slide.rings) : ""}
        <div class="wrap">${heading(slide)}<div class="flow">${steps}</div>${note}</div>`;
    },

    "image-left"(slide) {
      return `<div class="col-img${slide.bleed ? " is-bleed" : ""}">
          <img src="${slide.image}" alt="${esc(slide.imageAlt || "")}"${anim()}>
        </div>
        ${annotation(slide)}
        <div class="col-txt">
          ${heading(slide)}
          ${slide.body ? `<p class="body"${anim()}>${esc(slide.body)}</p>` : ""}
        </div>`;
    },

    "image-top"(slide) {
      return `<div class="band-img${slide.bleed ? " is-bleed" : ""}">
          <img src="${slide.image}" alt="${esc(slide.imageAlt || "")}"${anim()}>
        </div>
        ${annotation(slide)}
        <div class="band-txt">
          ${heading(slide)}
          ${slide.body ? `<p class="body"${anim()}>${esc(slide.body)}</p>` : ""}
        </div>`;
    },

    cards(slide) {
      const green = slide.theme === "dark";
      const cards = (slide.cards || [])
        .map(
          (c) => `<div class="card"${anim()}><h3>${esc(c.h)}</h3><p>${esc(c.p)}</p></div>`
        )
        .join("");
      const label = slide.cardsLabel
        ? `<p class="cards-label"${anim()}>${esc(slide.cardsLabel)}</p>`
        : "";
      const lead = slide.lead ? `<p class="lead"${anim()}>${esc(slide.lead)}</p>` : "";
      return `<div class="band${green ? " is-green" : ""}">
          ${green && slide.rings ? rings(slide.rings) : ""}
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
            ${slide.sub ? `<p class="sub"${anim()}>${esc(slide.sub)}</p>` : ""}
          </div>
          <div class="frame is-green"${anim()}>${media}</div>
        </div>`;
    },

    closing(slide) {
      const deliver = (slide.deliver || [])
        .map((d) => `<div${anim()}>${esc(d)}</div>`)
        .join("");
      return `${rings(slide.rings || { corner: "br", from: 0.42 })}
        <div class="wrap">
          ${heading(slide)}
          <div class="deliver">${deliver}</div>
          ${slide.slogan ? `<p class="slogan"${anim()}>${esc(slide.slogan)}</p>` : ""}
        </div>`;
    },
  };

  /* ---------- montagem -------------------------------------------------- */

  function build() {
    document.title = DECK.title;

    stage.innerHTML = SLIDES.map((slide, i) => {
      resetAnim();
      const theme = LIGHT_ROOT.has(slide.layout) ? "light" : slide.theme || "light";
      const greenBand = slide.layout === "cards" && slide.theme === "dark";
      const render = layouts[slide.layout];
      const inner = render ? render(slide) : `<div class="wrap">${heading(slide)}</div>`;
      return `<section class="slide l-${slide.layout} t-${theme}${
        greenBand ? " has-green-band" : ""
      }" data-i="${i}" aria-label="Slide ${i + 1} de ${SLIDES.length}">${chromeTop(
        slide
      )}${inner}${chromeBottom(slide, i)}</section>`;
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
    stage.style.transform = `translate(${Math.round(
      (window.innerWidth - 1920 * s) / 2
    )}px, ${Math.round((window.innerHeight - 1080 * s) / 2)}px) scale(${s})`;
  }

  /* ---------- navegação ------------------------------------------------ */

  let leaveTimer;

  function go(i, opts) {
    const target = Math.max(0, Math.min(SLIDES.length - 1, i));
    const first = (opts || {}).first;
    if (target === current && !first) return;

    const back = target < current;
    stage.classList.toggle("nav-prev", back);

    const slides = stage.querySelectorAll(".slide");
    clearTimeout(leaveTimer);
    slides.forEach((el) => el.classList.remove("is-leaving"));

    // O slide que sai continua visível durante a transição, atrás do que
    // entra — é o que faz a troca ler como movimento e não como piscada.
    if (!first && slides[current]) slides[current].classList.add("is-leaving");

    slides.forEach((el, k) => el.classList.toggle("is-active", k === target));
    leaveTimer = setTimeout(() => {
      slides.forEach((el) => el.classList.remove("is-leaving"));
    }, 420);

    current = target;

    document.getElementById("progress").style.width =
      ((current + 1) / SLIDES.length) * 100 + "%";
    hudCount.textContent = `${pad(current + 1)} / ${pad(SLIDES.length)}`;
    renderNotes();
    overviewGrid.querySelectorAll("button").forEach((b, k) => {
      b.classList.toggle("is-current", k === current);
    });

    if (history.replaceState) history.replaceState(null, "", "#" + (current + 1));
    else location.hash = current + 1;

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

    if (e.key === "Escape") {
      toggleOverview(false);
      help.classList.remove("is-open");
      return;
    }

    switch (e.key) {
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
  go(Number.isFinite(fromHash) && fromHash > 0 ? fromHash - 1 : 0, { first: true });
})();
