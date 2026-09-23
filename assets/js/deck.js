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
  const LIGHT_ROOT = new Set(["cards", "image-top", "image-stack"]);

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
    if (slide.layout === "image-top" || slide.layout === "image-stack") return LOGO_LIGHT;
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

  // O print mora num .shot: é a célula que o fitShots mede, e é o que permite
  // ancorar uma legenda logo abaixo dele sem cálculo de posição.
  function shot(src, alt, extra) {
    return `<div class="shot"><img src="${src}" alt="${esc(alt || "")}" data-fit${
      extra || ""
    }></div>`;
  }

  function annotation(slide) {
    if (!slide.annot) return "";
    const pos = slide.annot.pos || "a";
    if (pos === "below") return ""; // renderizada junto do print
    return `<div class="annot pos-${esc(pos)}"${anim()}>${esc(slide.annot.text)}</div>`;
  }

  // Legenda centralizada sob o print
  function caption(slide) {
    if (!slide.annot || slide.annot.pos !== "below") return "";
    return `<div class="annot is-below"${anim()}>${esc(slide.annot.text)}</div>`;
  }

  // Trilha de degraus: conquistado, o próximo em destaque, e os seguintes
  // perdendo força — a mesma gramática dos anéis e do fluxo.
  function trail(items) {
    return `<ol class="trail">${(items || [])
      .map(
        (t, i) =>
          `<li class="s-${esc(t.state || "locked")}" style="--k:${i}"><span class="dot"></span>
            <span class="t-lab">${esc(t.label)}</span>
            ${t.note ? `<span class="t-note">${esc(t.note)}</span>` : ""}</li>`
      )
      .join("")}</ol>`;
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

  // Créditos com nome: a ficha colorida da equipe, as pessoas e a liderança
  function teams(slide) {
    if (!slide.teams) return "";
    const items = slide.teams
      .map(
        (t) => `<div class="team" style="--c:${t.color || "155 70% 24%"}">
          <span class="team-tag">${esc(t.label)}</span>
          <span class="team-people">${esc(t.people || "")}</span>
          ${t.lead ? `<span class="team-lead">Liderança: ${esc(t.lead)}</span>` : ""}
        </div>`
      )
      .join("");
    return `<div class="teams"${anim()}>${items}</div>`;
  }

  // Dado que ainda não chegou: fica visível no slide (tracejado), para não
  // passar despercebido no ensaio. Some quando o campo `pending` sai.
  function pending(slide) {
    if (!slide.pending) return "";
    return `<p class="pending"${anim()}>${esc(slide.pending)}</p>`;
  }

  // Ícones dos blocos comparados — traço simples, herdam a cor do bloco
  const ICONS = {
    tag: `<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M6 24.5V8a2 2 0 0 1 2-2h16.5L42 23.5 23.5 42z"/><circle cx="15" cy="15" r="3.2"/><path d="M19 31l12-12"/></svg>`,
    gift: `<svg viewBox="0 0 48 48" aria-hidden="true"><rect x="6" y="16" width="36" height="9" rx="1.5"/><path d="M9 25v17h30V25M24 16v26"/><path d="M24 16c-3-7-12-9-12-3 0 3 5 3 12 3zM24 16c3-7 12-9 12-3 0 3-5 3-12 3z"/></svg>`,
  };

  /* ---------- layouts --------------------------------------------------- */

  const layouts = {
    cover(slide) {
      // A faixa branca é só o fundo: quem posiciona a marca e o olho é o mesmo
      // .chrome-top dos outros slides, para o topo não "pular" na virada.
      return `${rings(slide.rings || { corner: "br", from: 0.42 })}
        <div class="cover-bar"></div>
        <header class="chrome-top is-cover">
          <span class="wordmark">${esc(slide.wordmark || "AUVP Capital")}</span>
          <div class="hdr-right">
            <img class="hdr-logo" src="${LOGO_DARK}" alt="AUVP">
          </div>
        </header>
        <div class="cover-body">
          <hr class="rule">
          <h1${anim()}>${esc(slide.title)}</h1>
          ${slide.subtitle ? `<p class="cover-sub"${anim()}>${esc(slide.subtitle)}</p>` : ""}
        </div>`;
    },

    statement(slide) {
      const kicker = slide.kicker ? `<p class="kicker"${anim()}>${esc(slide.kicker)}</p>` : "";
      const title = slide.title || slide.titleHTML ? heading(slide) : "";
      // linesStyle "no": lista do que NÃO é — marcador ✕ e corpo menor
      const lines = slide.lines
        ? `<div class="lines${slide.linesStyle === "no" ? " is-no" : ""}">${slide.lines
            .map((l) => `<span${anim()}>${esc(l)}</span>`)
            .join("")}</div>`
        : "";
      const sub = slide.sub ? `<p class="sub"${anim()}>${esc(slide.sub)}</p>` : "";
      return `${slide.rings ? rings(slide.rings) : ""}
        <div class="wrap">${kicker}${title}${lines}${sub}${chips(slide)}${teams(slide)}${pending(slide)}</div>`;
    },

    // Um número que carrega o slide sozinho: o número enorme, o que ele mede
    // logo abaixo.
    figure(slide) {
      return `${slide.rings ? rings(slide.rings) : ""}
        <div class="wrap">
          ${slide.kicker ? `<p class="kicker"${anim()}>${esc(slide.kicker)}</p>` : ""}
          <div class="fig-n"${anim()}>${esc(slide.n)}</div>
          <p class="fig-t"${anim()}>${esc(slide.t)}</p>
          ${slide.sub ? `<p class="sub"${anim()}>${esc(slide.sub)}</p>` : ""}
          ${pending(slide)}
        </div>`;
    },

    // Etapas em linha com uma delas em destaque e uma seta de volta ao começo:
    // o funil que vira ciclo (AARRR → Referral alimenta Aquisição).
    loop(slide) {
      const items = slide.items || [];
      const hl = slide.hl || 0;
      const back = slide.back || 0;
      const cols = items
        .map(
          (it, i) => `<div class="lp-col${i === hl ? " is-hl" : ""}${
            i === back ? " is-back" : ""
          }"${anim()}><span class="lp-k">${esc(it.k)}</span><span class="lp-t">${esc(
            it.t
          )}</span></div>`
        )
        .join("");
      // a seta sai da etapa em destaque e volta à primeira, por baixo
      const n = Math.max(1, items.length);
      const a = Math.min(hl, back);
      const b = Math.max(hl, back);
      const arc = `<div class="lp-arc" style="left:${((a + 0.5) / n) * 100}%;width:${
        ((b - a) / n) * 100
      }%"${anim()}>${slide.backLabel ? `<span>${esc(slide.backLabel)}</span>` : ""}</div>`;
      return `${slide.rings ? rings(slide.rings) : ""}
        <div class="wrap">
          ${heading(slide)}
          <div class="lp" style="--n:${n}">${cols}${arc}</div>
          ${pending(slide)}
        </div>`;
    },

    // Dois blocos lado a lado, de cores diferentes, para ninguém ler os dois
    // como duas formas de fazer a mesma coisa. `alert` fecha com a orientação.
    compare(slide) {
      const blocks = (slide.blocks || [])
        .map(
          (b) => `<div class="cmp-b cmp-${esc(b.tone || "green")}"${anim()}>
            <div class="cmp-head">
              ${b.icon && ICONS[b.icon] ? `<span class="cmp-ico">${ICONS[b.icon]}</span>` : ""}
              <div>
                ${b.tag ? `<span class="cmp-tag">${esc(b.tag)}</span>` : ""}
                <h3>${esc(b.name)}</h3>
              </div>
            </div>
            <ul>${(b.rows || [])
              .map(
                (r) =>
                  `<li><span class="cmp-who">${esc(r.who)}</span><span class="cmp-what">${esc(
                    r.what
                  )}</span></li>`
              )
              .join("")}</ul>
          </div>`
        )
        .join("");
      return `<div class="wrap">
          ${heading(slide)}
          <div class="cmp">${blocks}</div>
          ${slide.alert ? `<p class="cmp-alert"${anim()}>${esc(slide.alert)}</p>` : ""}
        </div>`;
    },

    // Trilho horizontal de marcos. state: "on" (cheio), "hl" (o que importa),
    // "off" (não conta / não aparece — vazado e apagado). `span` desenha uma
    // chave de prazo entre dois marcos; `foot` é a linha de ressalva.
    track(slide) {
      const nodes = slide.nodes || [];
      const n = Math.max(1, nodes.length);
      const list = nodes
        .map(
          (nd, i) => `<li class="s-${esc(nd.state || "on")}" style="--k:${i}"${anim()}>
            <span class="tk-dot"></span>
            <span class="tk-lab">${esc(nd.label)}</span>
            ${nd.note ? `<span class="tk-note">${esc(nd.note)}</span>` : ""}
          </li>`
        )
        .join("");
      // `span` (uma chave) ou `spans` (várias, ex.: pares de conversões)
      const span = (slide.spans || (slide.span ? [slide.span] : []))
        .map(
          (sp) => `<div class="tk-span" style="left:${(sp.from / n) * 100}%;width:calc(${
            ((sp.to - sp.from) / n) * 100
          }% + 5px)"${anim()}><span>${esc(sp.label)}</span></div>`
        )
        .join("");
      return `${slide.rings ? rings(slide.rings) : ""}
        <div class="wrap">
          ${slide.kicker ? `<p class="kicker"${anim()}>${esc(slide.kicker)}</p>` : ""}
          ${heading(slide)}
          ${slide.lead ? `<p class="lead"${anim()}>${esc(slide.lead)}</p>` : ""}
          <div class="tk${span ? " has-span" : ""}" style="--n:${n}">${span}<ol>${list}</ol></div>
          ${slide.foot ? `<p class="tk-foot"${anim()}>${esc(slide.foot)}</p>` : ""}
        </div>`;
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
            `<div class="step" style="--k:${i}"${anim()}><div class="i">${pad(
              i + 1
            )}</div><div class="txt">${esc(s)}</div></div>`
        )
        .join("");
      const note = slide.flowNote ? `<p class="flow-note"${anim()}>${esc(slide.flowNote)}</p>` : "";
      return `${slide.rings ? rings(slide.rings) : ""}
        <div class="wrap">${heading(slide)}<div class="flow">${steps}</div>${note}</div>`;
    },

    "image-left"(slide) {
      const below = slide.annot && slide.annot.pos === "below";
      return `<div class="col-img${slide.bleed ? " is-bleed" : ""}${
        below ? " has-caption" : ""
      }"${anim()}>
          ${slide.bleed ? `<img src="${slide.image}" alt="${esc(slide.imageAlt || "")}">` : shot(slide.image, slide.imageAlt)}
          ${caption(slide)}
        </div>
        ${annotation(slide)}
        <div class="col-txt">
          ${heading(slide)}
          ${slide.body ? `<p class="body"${anim()}>${esc(slide.body)}</p>` : ""}
          ${
            slide.stat
              ? `<div class="stat"${anim()}><span class="stat-n">${esc(
                  slide.stat.n
                )}</span><span class="stat-t">${esc(slide.stat.t)}</span></div>`
              : ""
          }
        </div>`;
    },

    "image-top"(slide) {
      const below = slide.annot && slide.annot.pos === "below";
      const aside = slide.trail
        ? `<aside class="viz"${anim()}>${
            slide.trailTitle ? `<p class="viz-t">${esc(slide.trailTitle)}</p>` : ""
          }${trail(slide.trail)}</aside>`
        : "";
      return `<div class="band-img${slide.bleed ? " is-bleed" : ""}${
        aside ? " has-aside" : ""
      }${below ? " has-caption" : ""}"${anim()}>
          ${slide.bleed ? `<img src="${slide.image}" alt="${esc(slide.imageAlt || "")}">` : shot(slide.image, slide.imageAlt)}
          ${aside}
          ${caption(slide)}
        </div>
        ${annotation(slide)}
        <div class="band-txt">
          ${heading(slide)}
          ${slide.body ? `<p class="body"${anim()}>${esc(slide.body)}</p>` : ""}
        </div>`;
    },

    // Duas imagens empilhadas no mesmo painel verde: a tela que a pessoa vê em
    // cima, o payload que a sustenta embaixo. A camada de baixo troca por passo.
    "image-stack"(slide) {
      const layers = (slide.stack || [])
        .map((l, i) => shot(l.image, l.imageAlt, i ? ` data-step="${i}"` : ""))
        .join("");
      return `<div class="band-stack">
          <div class="stack-top"${anim()}>${shot(slide.image, slide.imageAlt)}</div>
          <div class="stack-bottom"${anim()}>${layers}</div>
        </div>
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
      const doc = slide.doc
        ? `<figure class="doc"${anim()}><img src="${slide.doc.image}" alt="${esc(
            slide.doc.alt || ""
          )}"><figcaption>${esc(slide.doc.caption || "")}</figcaption></figure>`
        : "";
      return `<div class="band${green ? " is-green" : ""}">
          ${green && slide.rings ? rings(slide.rings) : ""}
          <div class="inner">${heading(slide)}${lead}</div>
          ${doc}
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

    // Linha do tempo: o que já está de pé (marco cheio) e o que vem depois
    // (marco vazado). Diz "isto é uma fase" melhor do que dois cartões.
    timeline(slide) {
      const marks = (slide.marks_ || [])
        .map(
          (m, i) => `<li class="${esc(m.state || "next")}" style="--k:${i}"${anim()}>
            <span class="tl-dot"></span>
            <span class="tl-when">${esc(m.when)}</span>
            <span class="tl-what">${esc(m.what)}</span>
            ${(m.items || [])
              .map((it) => `<span class="tl-item">${esc(it)}</span>`)
              .join("")}
          </li>`
        )
        .join("");
      return `${slide.rings ? rings(slide.rings) : ""}
        <div class="wrap">
          ${heading(slide)}
          ${slide.lead ? `<p class="lead"${anim()}>${esc(slide.lead)}</p>` : ""}
          <ol class="tl">${marks}</ol>
        </div>`;
    },

    // Equação: as parcelas viram blocos e os operadores ficam do tamanho que
    // merecem. A aposta lê como conta, não como frase corrida.
    equation(slide) {
      const terms = (slide.terms || [])
        .map(
          (t, i) =>
            `${i ? `<span class="op"${anim()}>+</span>` : ""}<span class="term"${anim()}>${esc(
              t
            )}</span>`
        )
        .join("");
      const results = (slide.results || [])
        .map((r) => `<span class="res"${anim()}>${esc(r)}</span>`)
        .join("");
      return `${slide.rings ? rings(slide.rings) : ""}
        <div class="wrap">
          ${slide.kicker ? `<p class="kicker"${anim()}>${esc(slide.kicker)}</p>` : ""}
          <div class="eq">${terms}</div>
          <div class="eq-out">
            <span class="op is-eq"${anim()}>=</span>
            <div class="eq-res">${results}</div>
          </div>
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
          ${slide.sub ? `<p class="sub"${anim()}>${esc(slide.sub)}</p>` : ""}
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
      const bandVar = slide.band ? ` style="--band:${slide.band}px"` : "";
      return `<section class="slide l-${slide.layout} t-${theme}${
        greenBand ? " has-green-band" : ""
      }" data-i="${i}"${bandVar} aria-label="Slide ${i + 1} de ${
        SLIDES.length
      }">${chromeTop(slide)}${inner}${chromeBottom(slide, i)}</section>`;
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

  // `object-fit: contain` resolve o encaixe, mas deixa a caixa do <img> maior
  // que a imagem — e aí canto arredondado e sombra desenham a caixa, não o
  // print. Como o palco é fixo em 1920x1080, dá para calcular o tamanho final
  // uma vez e aplicá-lo: a caixa passa a ser a imagem.
  function fitShots() {
    stage.querySelectorAll("[data-fit]").forEach((img) => {
      const apply = () => {
        const box = img.parentElement;
        const cs = getComputedStyle(box);
        const w = box.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
        const h = box.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
        if (!w || !h || !img.naturalWidth) return;
        const k = Math.min(w / img.naturalWidth, h / img.naturalHeight);
        img.style.width = Math.round(img.naturalWidth * k) + "px";
        img.style.height = Math.round(img.naturalHeight * k) + "px";
      };
      if (img.complete) apply();
      else img.addEventListener("load", apply, { once: true });
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

    // Entrando de frente, o slide começa fechado; voltando, já vem revelado —
    // é o que se espera de quem está refazendo o caminho.
    shown = back ? stepsOf(target) : 0;
    showSteps(target, shown);

    current = target;

    document.getElementById("progress").style.width =
      ((current + 1) / SLIDES.length) * 100 + "%";
    hudCount.textContent = `${pad(current + 1)} / ${pad(SLIDES.length)}`;
    renderNotes();
    overviewGrid.querySelectorAll("button").forEach((b, k) => {
      b.classList.toggle("is-current", k === current);
    });

    // caminho explícito: com <base href> (ex.: /v2/), "#n" sozinho resolveria para a raiz
    if (history.replaceState)
      history.replaceState(null, "", location.pathname + location.search + "#" + (current + 1));
    else location.hash = current + 1;

    stage.querySelectorAll("video").forEach((v) => {
      if (!v.closest(".slide").classList.contains("is-active")) v.pause();
    });

    flashHud();
  }

  /* ---------- passos dentro do slide ------------------------------------
     Alguns slides revelam camadas antes de virar (as setas do payload). O
     avanço consome os passos primeiro; só depois troca de slide. */

  function stepsOf(i) {
    const el = stage.querySelectorAll(".slide")[i];
    return el ? el.querySelectorAll("[data-step]").length : 0;
  }

  function showSteps(i, n) {
    const el = stage.querySelectorAll(".slide")[i];
    if (!el) return;
    el.dataset.shown = String(n);
  }

  let shown = 0;

  function next() {
    if (shown < stepsOf(current)) {
      shown++;
      showSteps(current, shown);
      flashHud();
      return;
    }
    go(current + 1);
  }

  function prev() {
    if (shown > 0) {
      shown--;
      showSteps(current, shown);
      flashHud();
      return;
    }
    go(current - 1);
  }

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
  fitShots();
  resize();
  const fromHash = parseInt(location.hash.replace(/\D/g, ""), 10);
  go(Number.isFinite(fromHash) && fromHash > 0 ? fromHash - 1 : 0, { first: true });
})();
