/* =========================================================================
   Conteúdo da apresentação — Indicação V2
   -------------------------------------------------------------------------
   ESTE É O ÚNICO ARQUIVO QUE VOCÊ PRECISA EDITAR para trocar textos,
   imagens e notas de fala.

   Campos de cada slide:
     layout   cover | statement | numbers | flow | image-left | image-top |
              cards | video | closing
     theme    "dark" (verde profundo) ou "light" (branco)
     section  rótulo do cabeçalho
     title    título na tela (vai para MAIÚSCULAS pelo CSS)
     ...      campos específicos de cada layout (ver README)
     image    caminho do arquivo — TROQUE AQUI pelos prints definitivos
     annot    { text, pos } setinha fixa (➡️) sobre a imagem — pos: a | b | c
     rings    { corner, count, base, step, from, to } anéis decorativos
     chips    [{ label, color }] — color em HSL sem hsl(), ex.: "155 72% 22%"
     marks    marcadores exibidos no painel de notas (⭐ 📷 🎥 ⚠️ ➡️)
     notes    roteiro da fala (aceita HTML simples)
   ========================================================================= */

const DECK = {
  title: "Indicação V2 — AUVP Capital",
  date: "Julho de 2026", // ⚠️ conferir antes de apresentar
  targetMinutes: 25, // usado pelo cronômetro do apresentador
};

const SLIDES = [
  /* 01 ------------------------------------------------------------------ */
  {
    layout: "cover",
    theme: "dark",
    wordmark: "AUVP Capital",
    rings: { corner: "br", count: 6, base: 340, step: 210, from: 0.42 },
    title: "O nosso canal mais barato de aquisição estava quebrado.",
    subtitle: "Hoje você vai entender por quê — e o que consertamos.",
    navTitle: "Abertura (promessa)",
    marks: ["⭐ ideia saliente"],
    notes: `<p>“Em ~25 minutos vocês vão sair sabendo três coisas: qual era a dor real da
      indicação, o que a V2 resolve, e onde cada time entra. Não vou passar sobre o sistema
      ponto a ponto, somente o que precisa estar claro para todos.”</p>`,
  },

  /* 02 ------------------------------------------------------------------ */
  {
    layout: "statement",
    theme: "light",
    section: "Quem construiu",
    title: "Feito por muita gente.",
    // Uma cor por equipe. Matizes diferentes, mas luminosidade parecida:
    // lê como sistema, não como arco-íris. Texto sempre branco.
    chips: [
      { label: "Produto", color: "155 72% 22%" },
      { label: "Tech", color: "192 64% 28%" },
      { label: "Salesforce", color: "212 60% 38%" },
      { label: "Infra", color: "258 38% 42%" },
      { label: "Logística", color: "20 64% 40%" },
      { label: "Consultores", color: "42 74% 34%" },
      { label: "Atendimento", color: "338 48% 40%" },
    ],
    navTitle: "Quem construiu",
    marks: ["⭐ colaboradores no início", "⚠️ nomes a preencher"],
    notes: `<p>Credite <strong>nominalmente</strong> quem puxou cada frente.</p>
      <p><em>⚠️ Preencher antes de apresentar: nome da pessoa responsável por cada
      time acima.</em></p>`,
  },

  /* 03 ------------------------------------------------------------------ */
  {
    layout: "image-left",
    theme: "light",
    section: "O problema",
    title: "“Meu marido me indicou.”",
    quote: true,
    image: "assets/img/slide-03-nomes-soltos.svg",
    imageAlt: "Tela com nomes soltos: João, Márcio, meu marido me indicou",
    annot: { text: "nomes soltos, sem dono", pos: "c" },
    navTitle: "A surpresa",
    marks: ["⭐ surpresa / história", "📷 tela real de nomes soltos"],
    notes: `<p>“Na V -1 a captação era por formulário, só o nome. A gente recebia dezenas de
      ‘João’, ‘Márcio’, ‘meu marido me indicou’. Não dava pra rastrear quem indicou quem.”</p>
      <p><em>Deixe a tela falar 2–3 segundos antes de explicar. É o momento que gruda.</em></p>`,
  },

  /* 04 ------------------------------------------------------------------ */
  {
    layout: "flow",
    theme: "light",
    section: "O problema",
    title: "A bola de neve.",
    steps: [
      "Fontes que não se cruzavam",
      "Apuração na mão",
      "Atraso",
      "Reclamação",
      "Mais trabalho",
    ],
    flowNote: "…e o ciclo recomeça.",
    navTitle: "A bola de neve",
    marks: ["⭐ história (ciclo)"],
    notes: `<p>Conte como ciclo: “Sem rastreabilidade, apurar brinde era manual e moroso.
      O atraso virava reclamação, a reclamação virava retrabalho, o retrabalho gerava mais
      atraso. ‘Cadê meu brinde?’ virou rotina no atendimento.”</p>
      <p><em>Winston: repita a ideia-ciclo — recupera quem se distraiu.</em></p>`,
  },

  /* 05 ------------------------------------------------------------------ */
  {
    layout: "statement",
    theme: "light",
    section: "O problema",
    rings: { corner: "tr", count: 5, base: 300, step: 230, from: 0.22, to: 0.04 },
    lines: ["Informação fragmentada.", "Zero rastreabilidade.", "Regras opacas."],
    navTitle: "O problema, em uma frase",
    marks: [],
    notes: `<p>Detalhe os dois lados <strong>na voz</strong> — o embaixador perdido
      (não sabe se/quando ganha) e o time afogado (cruza fontes na mão).
      Não coloque isso na tela.</p>`,
  },

  /* 06 ------------------------------------------------------------------ */
  {
    layout: "numbers",
    theme: "light",
    section: "Por que importa",
    title: "Três razões:",
    items: [
      { n: "1", t: "Menos retrabalho" },
      { n: "2", t: "Canal barato de conversão" },
      { n: "3", t: "+5% de faturamento" },
    ],
    navTitle: "Por que importa",
    marks: ["⭐ pontuação verbal (numeração)", "⚠️ base e janela dos 5%"],
    notes: `<p>Use os números como pontuação: “Razão um… razão dois… razão três.”
      Sustente cada uma. “Indicação é uma via barata e de qualidade dentro da nossa esteira;
      mesmo com brinde, compensa.”</p>
      <p><em>⚠️ Confirmar base e janela dos 5%.</em></p>`,
  },

  /* 07 ------------------------------------------------------------------ */
  {
    layout: "statement",
    theme: "light",
    section: "Comportamento a mudar",
    titleHTML:
      'De indicar por acaso <span class="arrow">→</span><br>a indicar de propósito, de novo.',
    navTitle: "Comportamento a mudar",
    marks: [],
    notes: `<p>Contraste hoje × futuro na voz (esporádico → recorrente; “quando lembra” →
      em 2 toques; não sabe se vale → vê o progresso). A frase da tela é o slogan da seção —
      <strong>repita-a</strong>.</p>`,
  },

  /* 08 ------------------------------------------------------------------ */
  {
    layout: "statement",
    theme: "dark",
    section: "A solução",
    rings: { corner: "bl", count: 6, base: 320, step: 200, from: 0.4 },
    lines: ["Um link.", "Um lugar.", "Regras claras.", "Brinde que chega."],
    navTitle: "A solução",
    marks: ["⭐ a cerca em volta do conceito"],
    notes: `<p>Defina a cerca: o que a V2 é e o que não é — “não é um programa de brindes;
      é um <strong>canal de aquisição rastreável</strong>.”</p>
      <p>Apresente os 4 pilares aqui <strong>na voz</strong>:</p>
      <ul>
        <li>unificação</li>
        <li>gamificação clara</li>
        <li>autonomia operacional</li>
        <li>base pra novos formatos</li>
      </ul>`,
  },

  /* 09 ------------------------------------------------------------------ */
  {
    layout: "image-left",
    theme: "light",
    section: "Demo",
    title: "O link nasce no ‘Minha AUVP’ (Hub).",
    image: "assets/img/slide-09-menu-hub.svg",
    imageAlt: "Menu superior do Minha AUVP mostrando os produtos que a pessoa tem",
    annot: { text: "só os produtos que a pessoa tem", pos: "a" },
    navTitle: "Demo: onde nasce o link",
    marks: ["📷 menu do Minha AUVP", "➡️ setinha fixa"],
    notes: `<p>“O menu só mostra o produto que a pessoa realmente tem — Escola, Consultoria,
      ou os dois. Sem produto, não existe link. A esteira de brinde da Escola é uma; a da
      Consultoria é outra. Por ora o link se gera aqui no Hub; menu global e comunidade vão
      passar a redirecionar pra cá.”</p>`,
  },

  /* 10 ------------------------------------------------------------------ */
  {
    layout: "image-top",
    theme: "light",
    section: "Demo",
    title: "Cada link tem um código. Cada indicação tem dono.",
    body: "Lembram do “meu marido me indicou”? Acabou.",
    image: "assets/img/slide-10-link-rastreavel.svg",
    imageAlt: "Link estruturado com o identificador de quem indicou",
    annot: { text: "identificador", pos: "b" },
    navTitle: "Demo: rastreável de verdade",
    marks: ["⭐ callback da surpresa", "📷 link estruturado", "➡️ setinha fixa"],
    notes: `<p>“Lembram do ‘meu marido me indicou’? Acabou. Cada link carrega um
      identificador — dá pra saber quem clicou e quem converteu, automaticamente. E a mesma
      estrutura serve pra qualquer produto novo, inclusive um de brindes.”</p>
      <p><em>Amarra no Slide 3 — Winston: fechar o ciclo.</em></p>`,
  },

  /* 11 ------------------------------------------------------------------ */
  {
    layout: "image-left",
    theme: "light",
    section: "Demo",
    title: "Acompanha, e compartilha em 2 toques.",
    image: "assets/img/slide-11-portal-whatsapp.svg",
    imageAlt: "Portal do embaixador com o brinde do próximo degrau e botão de WhatsApp",
    annot: { text: "próximo degrau", pos: "b" },
    navTitle: "Demo: o que o embaixador vê",
    marks: ["📷 portal + WhatsApp", "➡️ setinha fixa"],
    notes: `<p>“Ela vê quem usou o link e quem converteu. Na trilha, vê só o brinde da
      próxima indicação acumulada — o próximo degrau, não o da 5ª ou 10ª. Exemplo: fiz 1
      indicação e ganhei o brinde de ‘1 indicação’; na trilha aparece o brinde da 2ª, e só.
      Pra compartilhar, um toque no WhatsApp: escolhe o contato e vai com a mensagem
      pronta.”</p>`,
  },

  /* 12 ------------------------------------------------------------------ */
  {
    layout: "video",
    theme: "light",
    section: "Demo",
    title: "Está no ar — e zerado pra vocês testarem.",
    sub: "Link no chat. Sem nenhum dado ainda: é de propósito.",
    video: null, // ex.: "assets/video/demo.mp4"
    poster: "assets/img/slide-12-video-poster.svg",
    navTitle: "Demo: veja funcionando",
    marks: ["🎥 vídeo curto (60–90 s)", "⚠️ link do ambiente pra colar no chat"],
    notes: `<p>“Vou deixar o link no chat. Como ainda não tem nenhum dado, aparece zerado —
      é de propósito, pra vocês navegarem à vontade.”</p>
      <p><em>Mantenha o vídeo em 60–90 s, senão estoura o tempo.</em></p>
      <p><em>⚠️ Ter o link pronto pra colar no chat.</em></p>`,
  },

  /* 13 ------------------------------------------------------------------ */
  {
    layout: "cards",
    theme: "dark",
    section: "Regras",
    rings: { corner: "br", count: 5, base: 260, step: 180, from: 0.36 },
    title: "Regra de ouro: sem link, sem indicação.",
    cardsLabel: "Como funciona:",
    cards: [
      { h: "Link só com produto", p: "Sem Escola ou Consultoria ativa, não existe link." },
      { h: "Só se gera no Hub", p: "O ‘Minha AUVP’ é a origem única do link." },
      { h: "Menu global e comunidade", p: "Passam a redirecionar para o Hub." },
    ],
    navTitle: "As regras que evitam confusão",
    marks: ["⭐ a cerca"],
    notes: `<p>Defina o que conta e o que não conta. “Isso protege a pessoa certa e evita o
      espertinho. Vamos publicar um <strong>regulamento oficial</strong> detalhando tudo, pra
      tirar a dúvida na origem — menos ‘isso conta?’ na fila do atendimento.”</p>`,
  },

  /* 14 ------------------------------------------------------------------ */
  {
    layout: "cards",
    theme: "light",
    section: "Regras",
    title: "Vale a regra de ouro. E olhamos caso a caso.",
    lead: "“E os dados retroativos?” — a pergunta que vai aparecer.",
    cardsLabel: "Dois caminhos:",
    cards: [
      {
        h: "Com rastreio",
        p: "Entra como “em análise” → conferimos → liberamos.",
      },
      {
        h: "Sem rastreio",
        p: "Reivindicação em até 90 dias da entrada do indicado na base.",
      },
    ],
    navTitle: "“E os dados retroativos?”",
    marks: ["⭐ a cerca / FAQ que vai aparecer"],
    notes: `<p>“Meu maior medo é pagar brinde duplicado por falta de rastreio antigo. Então:
      o que já temos rastreado entra na tela como ‘em análise’ — a logística (João) confere e
      libera, e a pessoa vê que já ganhou, sem pedir de novo. Quem chega alegando direito sem
      link vinculado é caso a caso, com prazo de 90 dias após o indicado entrar na base.
      É manual e chatinho só no começo; depois automatiza. Tudo isso vai num documento pra
      não gerar dúvida no usuário.”</p>`,
  },

  /* 15 ------------------------------------------------------------------ */
  {
    layout: "cards",
    theme: "light",
    section: "Escopo desta fase",
    title: "Não é a V2 inteira. É o coração dela.",
    cardsLabel: "Hoje × futuro:",
    cards: [
      { h: "Hoje", p: "Link rastreado + visibilidade automática. Ambiente admin inicial." },
      { h: "Futuro", p: "Painel de admin pra conferência de brinde e conversão num lugar só." },
    ],
    navTitle: "Escopo desta fase",
    marks: [],
    notes: `<p>“Sendo transparente: não é a V2 inteira — é o coração dela. O painel onde
      vocês conferem brinde e conversão num lugar só está em desenvolvimento; paramos por
      prioridade e vamos retomar. Hoje já existe um ambiente admin inicial. O que entregamos
      de fato é <strong>rastrear</strong> e <strong>dar visibilidade automática</strong>.”</p>`,
  },

  /* 16 ------------------------------------------------------------------ */
  {
    layout: "statement",
    theme: "light",
    section: "Hipóteses",
    rings: { corner: "br", count: 5, base: 300, step: 230, from: 0.22, to: 0.04 },
    kicker: "Estamos apostando que:",
    titleHTML:
      'rastrear <span class="hl">+</span> regras claras <span class="hl">+</span> facilitar <span class="hl">=</span> mais indicação, menos reclamação',
    longTitle: true,
    navTitle: "Hipóteses",
    marks: [],
    notes: `<p>Liste as apostas <strong>na voz</strong>:</p>
      <ul>
        <li>clientes querem indicar — falta atrito baixo e prêmio claro;</li>
        <li>gamificação e pertencimento fazem indicar de novo;</li>
        <li>o canal escala e contribui pro faturamento.</li>
      </ul>
      <p>Deixe claro que são <strong>apostas</strong> — e que o próximo slide é como
      testamos.</p>`,
  },

  /* 17 ------------------------------------------------------------------ */
  {
    layout: "numbers",
    theme: "light",
    section: "Como saberemos",
    title: "Três provas:",
    items: [
      { n: "1", t: "Cai reclamação de brinde" },
      { n: "2", t: "+5% no canal" },
      { n: "3", t: "Comunidade indica de novo" },
    ],
    navTitle: "Como saberemos se deu certo",
    marks: ["⭐ pontuação verbal", "⚠️ baselines de tickets e receita"],
    notes: `<p>Amarre cada prova a uma promessa do começo: “Estas três linhas são o que eu
      prometi lá no Slide 1. Se elas se moverem, a fase valeu.”</p>
      <p><em>⚠️ Preciso de baseline de (1) tickets/mês sobre brinde e (2) receita atual do
      canal.</em></p>`,
  },

  /* 18 ------------------------------------------------------------------ */
  {
    layout: "cards",
    theme: "light",
    section: "Onde cada time entra",
    title: "Sem todos dentro, não escala.",
    cardsLabel: "Pré-requisitos e donos:",
    cards: [
      { h: "Tech", p: "Stack, edge functions, encurtador, RBAC." },
      { h: "Salesforce", p: "Adapter e payload de status." },
      { h: "Infra", p: "Dependências do dashboard." },
      { h: "Logística", p: "Envio, custos e transportadora." },
      { h: "Consultores", p: "Fluxo que vira o status." },
      { h: "Atendimento", p: "Vínculo manual e caso a caso." },
    ],
    navTitle: "Onde cada time entra",
    marks: [],
    notes: `<ul>
        <li><strong>Tech</strong> — stack, edge functions, encurtador, RBAC travado antes do
          go-live</li>
        <li><strong>Salesforce</strong> — adapter/payload que vira status pra
          <code>converted</code> em tempo real</li>
        <li><strong>Infra</strong> — dependências (ex.: IF-04-A) pro dashboard
          operacional</li>
        <li><strong>Logística (João)</strong> — fluxo e custos de envio, integração
          transportadora/Tiny</li>
        <li><strong>Consultores / Salesforce Consultoria</strong> — fluxo que dita a virada
          de status</li>
        <li><strong>Atendimento</strong> — passa a ser o dono do vínculo manual e do
          tratamento caso a caso</li>
      </ul>`,
  },

  /* 19 ------------------------------------------------------------------ */
  {
    layout: "closing",
    theme: "dark",
    section: "O que entregamos",
    rings: { corner: "br", count: 6, base: 340, step: 210, from: 0.42 },
    title: "O que esta fase entregou:",
    deliver: ["Rastreabilidade real", "Portal único", "Regras claras", "Brinde operacional"],
    slogan: "“Cliente ativo é o nosso melhor vendedor.”",
    navTitle: "O que entregamos (fecho)",
    marks: ["⭐ slogan + fecho"],
    notes: `<p>Feche com o slogan e uma saudação ao tempo do público (“valeu pelos 25
      minutos”).</p>
      <p><strong>Não</strong> termine com “obrigada, perguntas?”. A tela final é a lista de
      contribuições; as perguntas acontecem por cima dela.</p>`,
  },
];
