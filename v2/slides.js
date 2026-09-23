/* =========================================================================
   Conteúdo da apresentação — Indica AUVP · time de Novos Negócios
   -------------------------------------------------------------------------
   Publicada em /v2/. Design e motor (assets/css, assets/js/deck.js) são os
   mesmos da apresentação principal — aqui muda só o conteúdo.
   Prints desta versão ficam em v2/img/ → use caminhos "v2/img/arquivo.png".

   Fonte única do texto: SI_Apresentacao_NovosNegocios_Copy.md.
   Nada aqui foi inventado; o que falta está marcado com ⚠️ em `marks` (aparece
   na visão geral, tecla G) e, quando precisa estar na tela, em `pending`.

   Campos de cada slide: ver README. Layouts novos desta versão:
     figure   número enorme + o que ele mede            n, t, kicker, sub
     loop     etapas em linha com seta de volta          items[{k,t}], hl, back, backLabel
     compare  dois blocos de cores diferentes            blocks[{tone,icon,tag,name,rows[{who,what}]}], alert
     track    trilho de marcos (on | hl | off)           nodes[{label,note,state}], span{from,to,label}, foot
     statement ganhou  linesStyle: "no"  (lista com ✕) e  pending
   ========================================================================= */

const DECK = {
  title: "Indica AUVP — Novos Negócios · AUVP",
  date: "[data]", // ⚠️ preencher antes de apresentar (aparece no topo de todos os slides)
  targetMinutes: 25, // ⚠️ a copy diz "[X] minutos" — ajustar quando a duração for definida
};

const SLIDES = [
  /* 01 ------------------------------------------------------------------ */
  {
    layout: "cover",
    theme: "dark",
    wordmark: "AUVP",
    rings: { corner: "br", count: 6, base: 340, step: 210, from: 0.42 },
    title: "Indica AUVP.",
    subtitle: "O nosso sistema de indicação: o que é, o que não é e como vocês entram nele no dia a dia.",
    navTitle: "Abertura (promessa)",
    marks: ["⭐ promessa em três partes", "⚠️ duração: [X] minutos"],
    notes: `<p>“Em <strong>[X] minutos</strong>, vocês saem sabendo três coisas: o que é o
      sistema, o que ele não é, e como vocês entram nele no dia a dia.”</p>
      <p><em>A promessa está no subtítulo: aponte para ela. As três partes voltam na ordem —
      “o que é” (slides 03–05), “o que não é” (06) e “como vocês entram” (07 em diante).</em></p>
      <p><em>⚠️ Definir a duração e ajustar <code>targetMinutes</code> no topo do arquivo.</em></p>`,
  },

  /* 02 ------------------------------------------------------------------ */
  {
    layout: "statement",
    theme: "light",
    section: "Quem construiu",
    title: "Feito por muita gente.",
    // Mesmas cores por equipe da apresentação principal
    chips: [
      { label: "Produto", color: "155 72% 22%" },
      { label: "Tech", color: "192 64% 28%" },
      { label: "Salesforce", color: "212 60% 38%" },
      { label: "Infra", color: "258 38% 42%" },
      { label: "Logística", color: "20 64% 40%" },
      { label: "Consultoria", color: "42 74% 34%" },
      { label: "Atendimento", color: "338 48% 40%" },
    ],
    navTitle: "Quem construiu",
    marks: ["⭐ reconhecimento"],
    notes: `<p>“Antes de tudo: muita gente construiu isso. Produto, Tech, Salesforce, Infra,
      Logística, Consultoria e Atendimento. E eu sou a responsável pelo produto.”</p>
      <p><em>Separado da capa de propósito: a capa fica com a promessa, e o
      reconhecimento ganha um momento próprio, sem disputar atenção.</em></p>`,
  },

  /* 03 ------------------------------------------------------------------ */
  {
    layout: "image-left",
    theme: "light",
    section: "Por que existe",
    title: "Nosso canal de aquisição mais barato. E o mais difícil de rastrear.",
    image: "assets/img/slide03 1.png",
    imageAlt: "Planilha com nomes soltos de embaixadores: Adair, Jean, Marcio, Meu Marido",
    annot: { text: "campo de texto livre: nomes sem dono", pos: "below" },
    body: "Antes: campo de texto livre. Agora: link com identificador único.",
    navTitle: "Por que ele existe",
    marks: ["⭐ “meu marido me indicou”", "📷 print da planilha (o mesmo da versão original)"],
    notes: `<p>“Antes do sistema, indicação era um campo de texto livre. A gente recebia
      <strong>‘meu marido me indicou’</strong> e não tinha como comprovar nem pagar direito
      quem indicou de verdade. Isso virava reclamação e retrabalho.”</p>
      <p><em>Aponte o “Meu Marido.” na planilha e deixe a tela falar 2 segundos.</em></p>
      <p>“Resolvemos rastreabilidade: não é mais formulário, é <strong>link com
      identificador único</strong>.”</p>
      <p><em>O print é o mesmo da apresentação do Atendimento. Se vier um print novo, troque
      em <code>image</code>.</em></p>`,
  },

  /* 04 ------------------------------------------------------------------ */
  {
    layout: "figure",
    theme: "light",
    section: "Objetivo de negócio",
    rings: { corner: "br", count: 5, base: 300, step: 230, from: 0.22, to: 0.04 },
    kicker: "Hoje,",
    n: "XX%",
    t: "do nosso faturamento vem de indicação.",
    navTitle: "O objetivo de negócio",
    marks: ["⭐ o número que justifica o investimento", "⚠️ % de faturamento e período"],
    notes: `<p>Entregue o número e pare. Depois:</p>
      <p>“Esse número é o motivo pelo qual investimos nisso. Não é programa de
      relacionamento, é <strong>canal de receita validado</strong>.”</p>
      <p><em>⚠️ Pendente: valor atualizado e período de referência (2026 completo ou último
      trimestre) e se já inclui Consultoria além da Escola. Quando chegar, troque
      <code>n</code> e, se precisar, diga o período no <code>kicker</code>
      (ex.: “Em 2026,”).</em></p>`,
  },

  /* 05 ------------------------------------------------------------------ */
  {
    layout: "loop",
    theme: "light",
    section: "O que é",
    title: "Member Get Member: o “R” de Referral virando Aquisição de novo.",
    items: [
      { k: "A", t: "Aquisição" },
      { k: "A", t: "Ativação" },
      { k: "R", t: "Retenção" },
      { k: "R", t: "Referral" },
      { k: "R", t: "Receita" },
    ],
    hl: 3, // Referral
    back: 0, // volta para Aquisição
    backLabel: "cliente satisfeito vira novo cliente",
    pending: "⚠️ Dado consolidado sobre MGM (benchmark de mercado ou referência interna) — a inserir",
    navTitle: "O que é (MGM / AARRR)",
    marks: ["⭐ o funil que vira ciclo", "⚠️ dado consolidado de MGM"],
    notes: `<p>“No modelo AARRR — Aquisição, Ativação, Retenção, <strong>Referral</strong>,
      Receita — a indicação é o estágio que fecha o ciclo. Ela pega quem já é cliente
      satisfeito e transforma em novo cliente.”</p>
      <p><em>Percorra as letras da esquerda para a direita e pare no “R” dourado. Depois siga
      a seta de volta até Aquisição com a mão.</em></p>
      <p>“É uma estratégia de aquisição consolidada no mercado, e aqui a gente aplica de forma
      bem diluída, sem agressividade.”</p>
      <p><em>⚠️ O quadro tracejado é o lugar do dado consolidado de MGM. Quando chegar,
      substitua o texto de <code>pending</code> pelo dado — ou remova o campo.</em></p>`,
  },

  /* 06 ------------------------------------------------------------------ */
  {
    layout: "statement",
    theme: "light",
    section: "O que não é",
    title: "O Indica AUVP não é:",
    linesStyle: "no",
    lines: [
      "Um painel que o indicado acessa antes de comprar",
      "Argumento para “empurrar” quem está em dúvida",
      "A mesma coisa que promoções comerciais pontuais",
    ],
    sub: "O foco é dar visibilidade ao embaixador.",
    navTitle: "O que não é",
    marks: ["⭐ a cerca em volta do conceito"],
    notes: `<p>Leia os três itens em voz alta, um por vez.</p>
      <p>“O foco do sistema é dar visibilidade pro embaixador. Ele acompanha suas indicações
      e o recebimento do brinde. <strong>O indicado não vê nada disso</strong>; só quando ele
      mesmo se torna aluno é que ganha sua própria visão de embaixador.”</p>
      <p>“Do nosso lado, o foco é trabalhar esse canal de aquisição. Não é ferramenta de
      conversão direta com quem ainda não comprou.”</p>
      <p><em>O item 3 é a ponte para o próximo slide: “e falando em promoção — o link família
      vocês já conhecem”.</em></p>`,
  },

  /* 07 ------------------------------------------------------------------ */
  {
    layout: "compare",
    theme: "light",
    section: "Os dois links",
    title: "O link família vocês já conhecem. Agora também existe o link de indicação.",
    blocks: [
      {
        tone: "sand",
        icon: "tag",
        tag: "Já existia",
        name: "Link família",
        rows: [
          { who: "Para quem está entrando", what: "Desconto" },
          { who: "Para o embaixador", what: "Conta como indicação" },
        ],
      },
      {
        tone: "green",
        icon: "gift",
        tag: "Novo · Indica AUVP",
        name: "Link de indicação",
        rows: [{ who: "Só para quem indicou", what: "Brinde" }],
      },
    ],
    alert:
      "Na frente do cliente, são sistemas diferentes: não apresente o link família como parte do Indica AUVP.",
    navTitle: "Os dois links",
    marks: ["⭐ ponto mais sensível da apresentação", "⚠️ indicado pelo link do Indica AUVP tem benefício?"],
    notes: `<p>“O link família continua sendo o que sempre foi: <strong>desconto pra quem está
      entrando</strong>. O que muda é que as conversões dele agora também contam como
      indicação pro embaixador.”</p>
      <p>“Uma atenção importante: <strong>não tratem o link família como parte do Indica AUVP na frente
      do cliente</strong>, porque são sistemas diferentes. Por trás, os dois beneficiam o
      embaixador, só que com focos diferentes: o família no desconto, o Indica AUVP no brinde.”</p>
      <p>“Evitem falar disso abertamente com o indicado. A distinção é operacional nossa, não
      precisa virar explicação pro cliente final.”</p>
      <p><em>Cores diferentes de propósito (areia × verde): ninguém deve ler os dois como duas
      formas de fazer a mesma coisa. Termine lendo a faixa de alerta.</em></p>
      <p><em>⚠️ Confirmar: quem entra pelo link de indicação (Indica AUVP) recebe algum benefício? A
      copy diz “brinde só pra quem indicou” — o bloco verde mostra só isso.</em></p>`,
  },

  /* 08 ------------------------------------------------------------------ */
  {
    layout: "track",
    theme: "light",
    section: "Os dois links",
    title: "Exceção: campanha de março.",
    lead: "Nas conversões do link família feitas na campanha, a contagem começa na 2ª.",
    nodes: [
      { label: "1ª conversão", note: "Não conta como indicação.", state: "off" },
      { label: "2ª conversão em diante", note: "Conta como indicação.", state: "hl" },
    ],
    foot: "Fora de março, vale a regra do slide anterior: toda conversão do link família conta.",
    navTitle: "Exceção de março",
    marks: [],
    notes: `<p>“Conversão do link família também conta como indicação. A exceção é a campanha
      de março: ali, só conta a partir da <strong>2ª conversão</strong> do link família
      daquele período.”</p>
      <p>“Fora do período de março, a regra do slide anterior vale direto. Essa exceção existe
      só pra não distorcer os números daquela campanha específica.”</p>
      <p><em>Na copy original este slide repetia “conversão do link família também conta” —
      que já está no slide 07. Aqui ele mostra só a exceção.</em></p>`,
  },

  /* 09 ------------------------------------------------------------------ */
  {
    layout: "statement",
    theme: "dark",
    section: "Regra de ouro",
    rings: { corner: "bl", count: 6, base: 320, step: 200, from: 0.4 },
    title: "Sem produto, sem link.",
    sub: "O link é vinculado ao produto na conta da pessoa. Sem produto ativo, o sistema não gera nada.",
    navTitle: "Regra de ouro",
    marks: ["⭐ a regra que precisa grudar"],
    notes: `<p>“Isso não é uma regra de negócio arbitrária, é <strong>infraestrutura</strong>:
      o link só existe porque está tecnicamente atrelado ao produto na conta da pessoa.”</p>
      <p>“Hoje limitamos a quem já é cliente pra controlar o investimento em brinde frente à
      entrada de novos membros. Pode expandir conforme os resultados aparecerem.”</p>`,
  },

  /* 10 ------------------------------------------------------------------ */
  {
    layout: "track",
    theme: "light",
    section: "O que o embaixador vê",
    title: "Indicação confirmada = “Fechado e Ganho”.",
    lead: "O embaixador não acompanha o funil. Ele vê duas datas:",
    nodes: [
      { label: "Virou Lead", note: "Data em que o indicado entrou como Lead.", state: "on" },
      {
        label: "Fechado e Ganho",
        note: "Data da indicação confirmada.",
        state: "hl",
      },
    ],
    foot: "Não avançou? O motivo não aparece para o embaixador.",
    navTitle: "O que o embaixador vê",
    marks: ["⚠️ gap conhecido: reembolso no Salesforce"],
    notes: `<p>“O embaixador não acompanha o funil de vocês, ele só vê duas datas: quando o
      indicado entrou como <strong>Lead</strong>, e quando fechou como <strong>‘Fechado e
      Ganho’</strong>.”</p>
      <p>“Se não converteu, o sistema não expõe o motivo; isso fica entre o Indicado e o
      Embaixador, não é informação que exibimos.”</p>
      <p>Ponto de atenção interno: “Hoje o Salesforce ainda não captura status de
      <strong>reembolso</strong> corretamente, estamos ajustando isso pós-lançamento. Tratem
      como um gap conhecido, não como bug surpresa.”</p>
      <p><em>Ordem ajustada: este slide e o próximo seguem a jornada depois do link (Lead →
      Fechado e Ganho → brinde). Os dados retroativos, que são exceção, ficaram para depois.</em></p>`,
  },

  /* 11 ------------------------------------------------------------------ */
  {
    layout: "track",
    theme: "light",
    section: "Prazo do brinde",
    title: "Brinde: até 35 dias após a indicação confirmada.",
    lead: "Existe validação antes do envio.",
    nodes: [
      { label: "Indicação confirmada", note: "Fechado e Ganho.", state: "on" },
      {
        label: "Validação",
        note: "Evita crédito para quem compra e cancela em 7 dias.",
        state: "hl",
      },
      { label: "Envio do brinde", state: "on" },
    ],
    span: { from: 0, to: 2, label: "até 35 dias" },
    navTitle: "Prazo e validação do brinde",
    marks: ["⚠️ 35 dias contam a partir do “Fechado e Ganho”?"],
    notes: `<p>“O brinde sai em <strong>até 35 dias</strong> após a confirmação da
      conversão.”</p>
      <p>“Colocamos uma janela de validação de propósito. Ela existe pra evitar quem confirma
      a compra, recebe o crédito de indicação, e cancela em 7 dias. Isso não é desconfiança do
      cliente, é <strong>proteção do programa</strong>.”</p>
      <p><em>Continua o trilho do slide anterior: começa onde ele terminou, no “Fechado e
      Ganho”.</em></p>
      <p><em>⚠️ Confirmar: “confirmação da conversão” = “Fechado e Ganho”? E os 35 dias são até
      o envio (não até a entrega)?</em></p>`,
  },

  /* 12 ------------------------------------------------------------------ */
  {
    layout: "statement",
    theme: "light",
    section: "Dados retroativos",
    rings: { corner: "tr", count: 5, base: 300, step: 230, from: 0.22, to: 0.04 },
    kicker: "E as indicações antigas, sem link?",
    title: "Quem vincula é o Atendimento.",
    sub: "Existe um campo de vínculo para dados retroativos, mas não é operado pelo Comercial. Se o cliente perguntar, encaminhe para o Atendimento.",
    navTitle: "Dados retroativos",
    marks: ["⭐ o encaminhamento", "⚠️ a tela de vínculo já existe ou “vai existir”?"],
    notes: `<p>“Vai existir uma tela pra conectar indicações antigas sem rastreio. Isso é fluxo
      do <strong>Atendimento</strong>, não do Comercial.”</p>
      <p>“Se um cliente perguntar sobre indicação antiga, o encaminhamento é pra lá, não pra
      vocês tentarem resolver na hora.”</p>
      <p><em>O título virou a ação (“quem vincula é o Atendimento”): é a frase que o Comercial
      precisa lembrar.</em></p>
      <p><em>⚠️ A copy diz “existe um campo” na tela e “vai existir uma tela” na fala.
      Confirmar qual vale e alinhar os dois.</em></p>`,
  },

  /* 13 ------------------------------------------------------------------ */
  {
    layout: "numbers",
    theme: "dark",
    section: "Agora, na prática",
    rings: { corner: "br", count: 5, base: 260, step: 180, from: 0.36 },
    title: "Vamos ver funcionando.",
    items: [
      { n: "1", t: "Visão do embaixador" },
      { n: "2", t: "Visão de vocês no Salesforce" },
    ],
    navTitle: "Demo ao vivo (transição)",
    marks: ["🎥 demo fora do deck", "⚠️ plano B: prints de apoio (slides 15–16)"],
    notes: `<p>“Até aqui foi o contexto, agora eu mostro na tela.”</p>
      <p>“<strong>Primeiro</strong> a visão do embaixador, exatamente como ele vai ver o link,
      o status e o brinde. <strong>Depois</strong> eu mostro onde vocês geram o link de
      indicação dentro do Salesforce, lembrando que o campo do link fica atrelado à conta da
      pessoa. Vou mostrar exatamente onde procurar.”</p>
      <p><em>Este slide é só a transição: a demo acontece fora do deck, direto no sistema e no
      Salesforce. Se o compartilhamento travar (como na apresentação do Atendimento em julho),
      vá para os slides de apoio 15 e 16 — tecla <code>End</code> leva ao último.</em></p>`,
  },

  /* 14 ------------------------------------------------------------------ */
  {
    layout: "closing",
    theme: "dark",
    section: "Contato",
    rings: { corner: "br", count: 6, base: 340, step: 210, from: 0.42 },
    title: "Dúvida sobre o Indica AUVP? Procure o time de Produto.",
    deliver: ["Ariadne", "Ana Beatriz", "Armando"],
    slogan: "Ponto único para dúvidas de regra do Indica AUVP.",
    navTitle: "Encerramento (contato)",
    marks: ["⭐ ponto único de contato"],
    notes: `<p>“Dúvida sobre o sistema? Pode procurar a Ariadne, a Ana Beatriz ou o Armando,
      do time de Produto.”</p>
      <p>Feche reforçando que o time de Produto é o <strong>ponto único de contato</strong>
      para dúvidas de regra. Isso evita que o Comercial crie a própria interpretação sobre o
      sistema.</p>`,
  },

  /* 15 — apoio --------------------------------------------------------- */
  {
    layout: "image-top",
    theme: "light",
    section: "Apoio à demo",
    title: "Visão do embaixador.",
    body: "Link, status e brinde.",
    image: "v2/img/print-embaixador.svg",
    imageAlt: "Portal do embaixador: link, status das indicações e brinde",
    navTitle: "Apoio: visão do embaixador",
    marks: ["📷 plano B da demo", "⚠️ print a inserir"],
    notes: `<p><em>Slide de apoio — use só se a demo ao vivo travar.</em></p>
      <p><em>⚠️ Trocar o espaço reservado pelo print definitivo em
      <code>v2/img/</code>.</em></p>`,
  },

  /* 16 — apoio --------------------------------------------------------- */
  {
    layout: "image-top",
    theme: "light",
    section: "Apoio à demo",
    title: "Onde vocês geram o link no Salesforce.",
    body: "O campo do link fica na conta da pessoa.",
    image: "v2/img/print-salesforce.svg",
    imageAlt: "Salesforce: campo do link de indicação na conta da pessoa",
    navTitle: "Apoio: link no Salesforce",
    marks: ["📷 plano B da demo", "⚠️ print a inserir"],
    notes: `<p><em>Slide de apoio — use só se a demo ao vivo travar.</em></p>
      <p><em>⚠️ Trocar o espaço reservado pelo print definitivo em
      <code>v2/img/</code>.</em></p>`,
  },
];
