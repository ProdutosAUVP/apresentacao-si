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
     track    trilho de marcos (on | hl | off)           nodes[{label,note,state}], span{from,to,label}
                                                         ou spans[...], foot
     statement ganhou  linesStyle: "no"  (lista com ✕), teams[{label,color,people,lead}] e pending
     closing  ganhou  sub (linha de apoio antes do slogan)
   ========================================================================= */

const DECK = {
  title: "Indica AUVP — Novos Negócios · AUVP",
  date: "23-09-2026", // aparece no topo de todos os slides
  targetMinutes: 15, // 15 min de fala; as dúvidas vêm depois, fora do cronômetro
};

const SLIDES = [
  /* 01 -------------------------------------------------------------------- */
  {
    layout: "cover",
    theme: "dark",
    wordmark: "AUVP",
    rings: { corner: "br", count: 6, base: 340, step: 210, from: 0.42 },
    title: "Indica AUVP.",
    subtitle: "O nosso sistema de indicação: o que é, o que não é e como vocês entram nele no dia a dia.",
    navTitle: "Abertura (promessa)",
    marks: ["⭐ promessa em três partes"],
    notes: `<p>“Em <strong>15 minutos</strong>, vocês saem sabendo três coisas: o que é o
      sistema, o que ele não é, e como vocês entram nele no dia a dia.”</p>
      <p><em>A promessa está no subtítulo: aponte para ela. As três partes voltam na ordem —
      “o que é” (slides 03–05), “o que não é” (06) e “como vocês entram” (07 em diante).</em></p>
      <p><em>São 15 minutos de fala e depois um tempo para dúvidas. O cronômetro (tecla
      <code>T</code>) fica vermelho aos 15 minutos.</em></p>`,
  },

  /* 02 -------------------------------------------------------------------- */
  {
    layout: "statement",
    theme: "light",
    section: "Quem construiu",
    title: "Feito por muita gente.",
    // Mesmas cores por equipe da apresentação principal. Salesforce e Infra
    // aparecem juntos porque são as mesmas pessoas.
    teams: [
      {
        label: "Produto",
        color: "155 72% 22%",
        people: "Elane, Ariadne, Ana Beatriz e Armando",
        lead: "Beatriz (Bia) e Daniel",
      },
      { label: "Tech", color: "192 64% 28%", people: "Vitor Manoel", lead: "Wendell" },
      {
        label: "Salesforce + Infra",
        color: "212 60% 38%",
        people: "Witor Lomazzi e João Lima",
        lead: "Cauê",
      },
      { label: "Logística", color: "20 64% 40%", people: "Maria Luiza", lead: "João Antonelli" },
      {
        label: "Consultoria",
        color: "42 74% 34%",
        people: "Relacionamento: Lilian e Débora",
      },
      {
        label: "Atendimento",
        color: "338 48% 40%",
        people: "Equipe toda, com foco em Ana Souza e Flávio Prado",
        lead: "Déia",
      },
      {
        label: "Jurídico",
        color: "258 38% 42%",
        people: "Thaiene Araújo e Camila Emily",
        lead: "Thais Almeida",
      },
    ],
    navTitle: "Quem construiu",
    marks: ["⭐ reconhecimento nominal"],
    notes: `<p>“Antes de tudo: muita gente construiu isso.” Credite <strong>pelo nome</strong>,
      equipe por equipe: Produto, Tech, Salesforce e Infra, Logística, o Relacionamento da
      Consultoria, o Atendimento e o Jurídico — “e eu sou a responsável pelo produto.”</p>
      <p><em>Separado da capa de propósito: a capa fica com a promessa, e o
      reconhecimento ganha um momento próprio, sem disputar atenção.</em></p>`,
  },

  /* 03 -------------------------------------------------------------------- */
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

  /* 04 -------------------------------------------------------------------- */
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
    navTitle: "O que é (MGM / AARRR)",
    marks: ["⭐ o funil que vira ciclo"],
    notes: `<p>“No modelo AARRR — Aquisição, Ativação, Retenção, <strong>Referral</strong>,
      Receita — a indicação é o estágio que fecha o ciclo. Ela pega quem já é cliente
      satisfeito e transforma em novo cliente.”</p>
      <p><em>Percorra as letras da esquerda para a direita e pare no “R” dourado. Depois siga
      a seta de volta até Aquisição com a mão.</em></p>
      <p>“É uma estratégia de aquisição consolidada no mercado, e aqui a gente aplica de forma
      bem diluída, sem agressividade.”</p>
      <p><strong>Se precisar explicar o AARRR para quem não conhece:</strong> é o “mapa da
      jornada do cliente”. Ele ajuda a responder “em qual parte do funil eu estou perdendo
      gente, e onde eu deveria focar meu esforço agora?”. Serve para diagnosticar em qual
      etapa está o gargalo <strong>antes</strong> de sair construindo funcionalidade; sem esse
      diagnóstico, o time corre o risco de investir esforço no lugar errado do funil.</p>
      <p>“É por isso que o sistema tem as regras que tem: primeiro a gente mede o crescimento
      e o impacto dentro da AUVP Escola. Com resultado, dá pra flexibilizar regras e até
      melhorar os brindes.”</p>
      <p><em>Essa última frase conversa com a regra de ouro (slide 09): “pode expandir
      conforme os resultados aparecerem”.</em></p>
      <p><em>O próximo slide é a referência interna do MGM: quantos leads a base trouxe em
      2026.</em></p>`,
  },

  /* 05 -------------------------------------------------------------------- */
  {
    layout: "figure",
    theme: "light",
    section: "Indicação em números",
    kicker: "Em 2026, até setembro,",
    n: "6.753",
    t: "leads chegaram à base por indicação.",
    sub: "Média de ~780 por mês de janeiro a agosto.",
    // Base total: painel de leads, mensal, jan–set/26 = 97.595 (já inclui a
    // indicação; a barra de dez/25 do painel fica de fora). 6.753 ÷ 97.595 = 6,9%.
    share: {
      title: "Em toda a base, de janeiro a setembro",
      part: 6753,
      partLabel: "Indicação: 6.753 (≈ 7%)",
      rest: 90842,
      restLabel: "Outras origens: 90.842",
      note: "Base total: 97.595 leads no período.",
    },
    barsTitle: "Leads por indicação · 2026",
    bars: [
      { x: "Jan", v: 865, label: "865" },
      { x: "Fev", v: 694, label: "694" },
      { x: "Mar", v: 1076, label: "1.076" },
      { x: "Abr", v: 735, label: "735" },
      { x: "Mai", v: 858, label: "858" },
      { x: "Jun", v: 588, label: "588" },
      { x: "Jul", v: 763, label: "763" },
      { x: "Ago", v: 679, label: "679" },
      { x: "Set", v: 495, label: "495", partial: true },
    ],
    barsNote: "* Setembro em andamento.",
    navTitle: "Leads por indicação em 2026",
    marks: [
      "⭐ o volume que a base traz",
      "setembro ainda em andamento",
    ],
    notes: `<p>“Esse é o volume que a nossa base trouxe este ano: <strong>6.753 leads</strong>
      que chegaram porque alguém que já é cliente recomendou. Dá uma média de quase 800 por
      mês.”</p>
      <p>“E pra dar escala: este ano entraram quase 98 mil leads na base, de todas as
      origens. <strong>Cerca de 7%</strong> vieram por indicação, justamente o canal mais
      barato.”</p>
      <p><em>A proporção fica entre 5,6% e 9,7% mês a mês (o pico é março). Fonte da base
      total: painel de leads, visão mensal de jan a set/26.</em></p>
      <p><em>Setembro está em andamento (495 até agora): por isso a barra vazada. Não leia
      como queda.</em></p>
      <p><em>Fique no volume. Conversão e faturamento são números do Comercial: não entram
      nesta apresentação.</em></p>
      <p><em>Fonte: matriz mensal de indicação (jan–set/26).</em></p>`,
  },

  /* 06 -------------------------------------------------------------------- */
  {
    layout: "statement",
    theme: "light",
    section: "O que não é",
    title: "O Indica AUVP não é:",
    linesStyle: "no",
    lines: [
      "Um painel que o indicado acessa antes de comprar",
      "A mesma coisa que promoções comerciais pontuais",
    ],
    sub: "O foco é dar visibilidade ao embaixador.",
    navTitle: "O que não é",
    marks: ["⭐ a cerca em volta do conceito"],
    notes: `<p>Leia os dois itens em voz alta, um por vez.</p>
      <p>“O foco do sistema é dar visibilidade pro embaixador. Ele acompanha suas indicações
      e o recebimento do brinde. <strong>O indicado não vê nada disso</strong>; só quando ele
      mesmo se torna aluno é que ganha sua própria visão de embaixador.”</p>
      <p>“Do nosso lado, o foco é trabalhar esse canal de aquisição. Não é ferramenta de
      conversão direta com quem ainda não comprou.”</p>
      <p><em>O item 2 é a ponte para o próximo slide: “e falando em promoção — o link família
      vocês já conhecem”.</em></p>`,
  },

  /* 07 -------------------------------------------------------------------- */
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
      formas de fazer a mesma coisa.</em></p>
      <p><em>⚠️ Confirmar: quem entra pelo link de indicação (Indica AUVP) recebe algum benefício? A
      copy diz “brinde só pra quem indicou” — o bloco verde mostra só isso.</em></p>`,
  },

  /* 08 -------------------------------------------------------------------- */
  {
    layout: "track",
    theme: "light",
    section: "Os dois links",
    title: "Exceção: campanha de março.",
    lead: "Nas conversões do link família feitas na campanha, cada par vale 1 indicação.",
    nodes: [
      { label: "1ª conversão", state: "on" },
      { label: "2ª conversão", note: "Fecha o par.", state: "hl" },
      { label: "3ª conversão", state: "on" },
      { label: "4ª conversão", note: "Fecha o par.", state: "hl" },
    ],
    spans: [
      { from: 0, to: 1, label: "1 indicação" },
      { from: 2, to: 3, label: "1 indicação" },
    ],
    foot: "Fora de março, vale a regra do slide anterior: toda conversão do link família conta.",
    navTitle: "Exceção de março",
    marks: [],
    notes: `<p>“Conversão do link família também conta como indicação. A exceção é a campanha
      de março: ali, as conversões do link família contam <strong>em pares</strong> — a cada
      2 conversões, 1 indicação.”</p>
      <p><em>Exemplo, se perguntarem: 4 conversões no link família em março = 2 indicações;
      3 conversões = 1 indicação (a 3ª espera o par).</em></p>
      <p>“Fora do período de março, a regra do slide anterior vale direto. Essa exceção existe
      só pra não distorcer os números daquela campanha específica.”</p>
      <p><em>Na copy original este slide repetia “conversão do link família também conta” —
      que já está no slide 07. Aqui ele mostra só a exceção.</em></p>`,
  },

  /* 09 -------------------------------------------------------------------- */
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

  /* 10 -------------------------------------------------------------------- */
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

  /* 11 -------------------------------------------------------------------- */
  {
    layout: "track",
    theme: "light",
    section: "Prazo do brinde",
    title: "Brinde: até 30 dias úteis após a indicação confirmada.",
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
    span: { from: 0, to: 2, label: "até 30 dias úteis" },
    navTitle: "Prazo e validação do brinde",
    marks: ["⚠️ 30 dias úteis contam a partir do “Fechado e Ganho”?"],
    notes: `<p>“O brinde sai em <strong>até 30 dias úteis</strong> após a confirmação da
      conversão.”</p>
      <p>“Colocamos uma janela de validação de propósito. Ela existe pra evitar quem confirma
      a compra, recebe o crédito de indicação, e cancela em 7 dias. Isso não é desconfiança do
      cliente, é <strong>proteção do programa</strong>.”</p>
      <p><em>Continua o trilho do slide anterior: começa onde ele terminou, no “Fechado e
      Ganho”.</em></p>
      <p><em>⚠️ Confirmar: “confirmação da conversão” = “Fechado e Ganho”? E os 30 dias úteis são até
      o envio (não até a entrega)?</em></p>`,
  },

  /* 12 -------------------------------------------------------------------- */
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

  /* 13 -------------------------------------------------------------------- */
  {
    layout: "cards",
    theme: "light",
    section: "No dia a dia",
    title: "Quem chega por indicação já ouviu falar bem de nós.",
    lead: "Informação que vocês têm a partir de agora, para usar na conversa como fizer sentido.",
    cardsLabel: "O que vocês têm em mãos:",
    cards: [
      {
        h: "A recomendação de um aluno",
        p: "Todo lead de indicação chega por alguém que já é cliente e conhece o produto por dentro.",
      },
      {
        h: "6.753 recomendações em 2026",
        p: "É quantas pessoas chegaram este ano porque um aluno indicou: ≈ 7% de todos os leads da base.",
      },
      {
        h: "O brinde é de quem indicou",
        p: "O brinde do Indica AUVP vai para o embaixador. O indicado não recebe brinde pelo programa.",
      },
    ],
    navTitle: "O que muda na conversa",
    marks: ["⭐ informação, não roteiro"],
    notes: `<p>“O que isso muda pra vocês? Quem chega por indicação já ouviu, de alguém em quem
      confia, que o produto vale a pena. Vocês não começam do zero.”</p>
      <p>“Aqui eu trago a informação. Como ela entra na conversa, vocês e os especialistas do
      time sabem melhor do que eu: pode ser uma oportunidade de venda ou um apoio numa objeção
      sobre o valor do produto.”</p>
      <p><em>Não sugira frases nem abordagens: a condução da conversa é do Comercial. Os três
      cartões são só fatos: a origem do lead, o volume e a regra do brinde (a mesma do slide
      dos dois links).</em></p>`,
  },

  /* 14 -------------------------------------------------------------------- */
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
    marks: ["🎥 demo fora do deck", "⚠️ plano B: prints de apoio (slides 16–17)"],
    notes: `<p>“Até aqui foi o contexto, agora eu mostro na tela.”</p>
      <p>“<strong>Primeiro</strong> a visão do embaixador, exatamente como ele vai ver o link,
      o status e o brinde. <strong>Depois</strong> eu mostro onde vocês geram o link de
      indicação dentro do Salesforce, lembrando que o campo do link fica atrelado à conta da
      pessoa. Vou mostrar exatamente onde procurar.”</p>
      <p><em>Este slide é só a transição: a demo acontece fora do deck, direto no sistema e no
      Salesforce. Se o compartilhamento travar (como na apresentação do Atendimento em julho),
      vá para os slides de apoio 16 e 17 — tecla <code>End</code> leva ao último.</em></p>`,
  },

  /* 15 -------------------------------------------------------------------- */
  {
    layout: "closing",
    theme: "dark",
    section: "Contato",
    rings: { corner: "br", count: 6, base: 340, step: 210, from: 0.42 },
    title: "Dúvida sobre o Indica AUVP? Procure o time de Produto.",
    deliver: ["Ariadne", "Ana Beatriz", "Armando"],
    sub: "Para acionar Infra ou Tech, existe um fluxo. Quem quiser conhecer, é só me avisar que eu passo o processo.",
    slogan: "Ponto único para dúvidas de regra do Indica AUVP.",
    navTitle: "Encerramento (contato)",
    marks: ["⭐ ponto único de contato"],
    notes: `<p>“Dúvida sobre o sistema? Pode procurar a Ariadne, a Ana Beatriz ou o Armando,
      do time de Produto.”</p>
      <p>“Pra acionar o time de Infra ou de Tech, é por um fluxo. Quem quiser saber mais, só me
      avisar que eu passo o processo.”</p>
      <p>Feche reforçando que o time de Produto é o <strong>ponto único de contato</strong>
      para dúvidas de regra. Isso evita que o Comercial crie a própria interpretação sobre o
      sistema.</p>
      <p><em>Aqui termina a fala (15 minutos). Deixe este slide na tela e abra para as
      dúvidas: os contatos ficam visíveis enquanto o time pergunta.</em></p>`,
  },

  /* 16 — apoio ------------------------------------------------------------ */
  {
    layout: "image-top",
    theme: "light",
    section: "Apoio à demo",
    title: "Visão do embaixador.",
    band: 800, // print largo: mais altura para ficar legível
    body: "O link único, pronto para copiar ou enviar pelo WhatsApp, e os primeiros passos.",
    image: "v2/img/print-embaixador.png",
    imageAlt: "Início do portal do embaixador: link único com botões Copiar e WhatsApp, aviso de que a indicação só conta se a compra vier do link, e a lista de primeiros passos",
    navTitle: "Apoio: visão do embaixador",
    marks: ["📷 plano B da demo"],
    notes: `<p><em>Slide de apoio — use só se a demo ao vivo travar.</em></p>
      <p>Pontos para mostrar no print:</p>
      <ul>
        <li>o <strong>link único</strong> no topo, com os botões Copiar e WhatsApp;</li>
        <li>o aviso: a indicação só conta se a compra vier do link dele;</li>
        <li>os <strong>primeiros passos</strong>, começando por aceitar o Regulamento do
        Programa.</li>
      </ul>`,
  },

  /* 17 — apoio ------------------------------------------------------------ */
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
