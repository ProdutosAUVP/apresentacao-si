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
    image: "assets/img/slide03 1.png",
    imageAlt: "Planilha com nomes soltos de embaixadores: Adair, Jean, Marcio, Meu Marido",
    annot: { text: "nomes soltos, sem dono", pos: "c" },
    stat: { n: "32%", t: "da nossa base tem registro assim — e não dá pra cruzar." },
    navTitle: "A surpresa",
    marks: ["⭐ surpresa / história", "📷 tela real de nomes soltos", "⚠️ conferir os 32%"],
    notes: `<p>“Na V -1 a captação era por formulário, só o nome. A gente recebia dezenas de
      ‘João’, ‘Márcio’, ‘meu marido me indicou’. Não dava pra rastrear quem indicou quem.”</p>
      <p><em>Deixe a tela falar 2–3 segundos antes de explicar. É o momento que gruda.</em></p>
      <p>Depois entregue o número: “<strong>32% da nossa base</strong> tem registro assim.
      Não é exceção, é um terço da base que a gente não consegue cruzar.”</p>
      <p><em>⚠️ Conferir a base e a data de apuração dos 32%.</em></p>`,
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

  /* 08 ------------------------------------------------------------------ */
  {
    layout: "image-top",
    theme: "light",
    section: "Demo",
    title: "O link é gerado no Salesforce com rastreabilidade.",
    image: "assets/img/slide 09.png",
    imageAlt: "Portal do embaixador: menu lateral, seleção de produto e o link pronto para copiar ou enviar no WhatsApp",
    annot: { text: "só os produtos que a pessoa tem", pos: "c" },
    navTitle: "Demo: onde nasce o link",
    marks: ["📷 menu do Minha AUVP", "➡️ setinha fixa"],
    notes: `<p>“O menu só mostra o produto que a pessoa realmente tem — Escola, Consultoria,
      ou os dois. Sem produto, não existe link. A esteira de brinde da Escola é uma; a da
      Consultoria é outra. Por ora o link se gera aqui no Hub; menu global e comunidade vão
      passar a redirecionar pra cá.”</p>`,
  },

  /* 09 ------------------------------------------------------------------ */
  {
    layout: "image-stack",
    theme: "light",
    section: "Demo",
    title: "Cada link tem um código. Cada indicação tem dono.",
    body: "Lembram do “meu marido me indicou”? Acabou.",
    image: "assets/img/slide 10.png",
    imageAlt: "O link pronto no portal do embaixador",
    // A camada de baixo é a mesma imagem com uma seta a mais: revelar o passo
    // parece a seta aparecendo, não a imagem trocando.
    stack: [
      {
        image: "assets/img/Seta1_slide10.png",
        imageAlt: "Retorno do Salesforce, com a seta apontando para o link",
      },
      {
        image: "assets/img/Seta2_slide10.png",
        imageAlt: "O mesmo retorno, agora com a segunda seta apontando para o código",
      },
    ],
    navTitle: "Demo: rastreável de verdade",
    marks: ["⭐ callback da surpresa", "📷 tela + payload", "➡️ setas em dois tempos"],
    notes: `<p>Este slide tem <strong>um passo</strong>: a primeira seta já vem na tela,
      apontando para o link. Aperte “próximo” <strong>uma vez</strong> e a segunda seta
      aparece, no código — só então vire o slide.</p>
      <p>“Lembram do ‘meu marido me indicou’? Acabou. O link que a pessoa copia lá em cima
      é este objeto aqui embaixo: cada link carrega um identificador — dá pra saber quem
      clicou e quem converteu, automaticamente. E a mesma estrutura serve pra qualquer
      produto novo, inclusive um de brindes.”</p>
      <p><em>Amarra no Slide 3 — Winston: fechar o ciclo.</em></p>`,
  },

  /* 10 ------------------------------------------------------------------ */
  {
    layout: "image-top",
    theme: "light",
    section: "Demo",
    title: "Acompanha, e compartilha em 2 toques.",
    band: 800, // print denso: tabela + trilha
    image: "assets/img/slide 12.png",
    imageAlt: "Portal do embaixador: indicações recentes e a trilha de progresso até o próximo tier",
    annot: { text: "próximo degrau", pos: "c" },
    navTitle: "Demo: o que o embaixador vê",
    marks: ["📷 portal + WhatsApp", "➡️ setinha fixa"],
    notes: `<p>“Ela vê quem usou o link e quem converteu. Na trilha, vê só o brinde da
      próxima indicação acumulada — o próximo degrau, não o da 5ª ou 10ª. Exemplo: fiz 1
      indicação e ganhei o brinde de ‘1 indicação’; na trilha aparece o brinde da 2ª, e só.
      Pra compartilhar, um toque no WhatsApp: escolhe o contato e vai com a mensagem
      pronta.”</p>`,
  },

  /* 11 ------------------------------------------------------------------ */
  {
    layout: "cards",
    theme: "dark",
    section: "Regras",
    rings: { corner: "br", count: 5, base: 260, step: 180, from: 0.36 },
    title: "Regra de ouro: sem link, sem indicação.",
    lead: "E estamos publicando o Regulamento do Programa de Indicação AUVP.",
    doc: {
      image: "assets/img/slide 13.png",
      alt: "Primeira página do Regulamento do Programa de Indicação AUVP",
      caption: "Regulamento oficial",
    },
    cardsLabel: "Como funciona:",
    cards: [
      { h: "Link só com produto", p: "Sem Escola ou Consultoria ativa, não existe link." },
      { h: "Só se gera no Hub", p: "O ‘Minha AUVP’ é a origem única do link." },
      { h: "Menu global e comunidade", p: "Passam a redirecionar para o Hub." },
    ],
    navTitle: "As regras que evitam confusão",
    marks: ["⭐ a cerca"],
    notes: `<p>Defina o que conta e o que não conta. “Isso protege a pessoa certa e evita o
      espertinho. O <strong>Regulamento do Programa de Indicação AUVP</strong> já está sendo
      escrito: geração de link, validação, conduta, vedação a spam, proteção de dados e
      concessão de recompensas. Tira a dúvida na origem — menos ‘isso conta?’ na fila do
      atendimento.”</p>`,
  },

  /* 12 ------------------------------------------------------------------ */
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
      {
        h: "Canal oficial",
        p: "As reivindicações entram pelo Userback — um caminho só, rastreado.",
      },
    ],
    navTitle: "“E os dados retroativos?”",
    marks: ["⭐ a cerca / FAQ que vai aparecer"],
    notes: `<p>“Meu maior medo é pagar brinde duplicado por falta de rastreio antigo. Então:
      o que já temos rastreado entra na tela como ‘em análise’ — a logística (João) confere e
      libera, e a pessoa vê que já ganhou, sem pedir de novo. Quem chega alegando direito sem
      link vinculado é caso a caso, com prazo de 90 dias após o indicado entrar na base.
      É manual e chatinho só no começo; depois automatiza. Tudo isso vai num documento pra
      não gerar dúvida no usuário.”</p>
      <p>“E tem um caminho só pra pedir: o <strong>Userback</strong>. Fora dele, não entra —
      é o que evita a reivindicação se perder em três canais diferentes.”</p>`,
  },

  /* 13 ------------------------------------------------------------------ */
  {
    layout: "cards",
    theme: "light",
    section: "Escopo desta fase",
    title: "Não é a V2 inteira. É o coração dela.",
    cardsLabel: "Hoje × futuro:",
    cards: [
      { h: "Hoje", p: "Link rastreado + visibilidade automática. Ambiente admin inicial." },
      {
        h: "Futuro",
        p: "Painel de admin pra conferência de brinde e conversão num lugar só, e automação com o ERP da logística para exibir o envio do brinde.",
      },
    ],
    navTitle: "Escopo desta fase",
    marks: [],
    notes: `<p>“Sendo transparente: não é a V2 inteira — é o coração dela. O painel onde
      vocês conferem brinde e conversão num lugar só está em desenvolvimento; paramos por
      prioridade e vamos retomar. Hoje já existe um ambiente admin inicial. O que entregamos
      de fato é <strong>rastrear</strong> e <strong>dar visibilidade automática</strong>.”</p>
      <p>“Depois dele vem a automação com o ERP da logística, pra pessoa ver o envio do
      brinde sem ninguém ter que consultar e responder.”</p>`,
  },

  /* 14 ------------------------------------------------------------------ */
  {
    layout: "statement",
    theme: "light",
    section: "Hipóteses",
    rings: { corner: "br", count: 5, base: 300, step: 230, from: 0.22, to: 0.04 },
    kicker: "Estamos apostando que:",
    titleHTML:
      'rastrear <span class="hl">+</span> regras claras <span class="hl">+</span> brindes com esteira de gamificação <span class="hl">=</span> mais indicação, mais faturamento',
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

  /* 15 ------------------------------------------------------------------ */
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

  /* 16 ------------------------------------------------------------------ */
  {
    layout: "closing",
    theme: "dark",
    section: "O que entregamos",
    rings: { corner: "br", count: 6, base: 340, step: 210, from: 0.42 },
    title: "O que esta fase entregou:",
    deliver: ["Rastreabilidade real", "Portal único", "Regras claras", "Brinde operacional"],
    slogan: "“Membro engajado é o nosso maior ativo.”",
    navTitle: "O que entregamos (fecho)",
    marks: ["⭐ slogan + fecho"],
    notes: `<p>Feche com o slogan e uma saudação ao tempo do público (“valeu pelos 25
      minutos”).</p>
      <p><strong>Não</strong> termine com “obrigada, perguntas?”. A tela final é a lista de
      contribuições; as perguntas acontecem por cima dela.</p>`,
  },
];
