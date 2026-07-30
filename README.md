# Indicação V2 — apresentação

Apresentação de ~30 min (≈25 de fala) sobre a Indicação V2, no formato de slides
minimalistas: **pouco texto na tela, o roteiro fica na fala**.

Site estático, sem build e sem dependências. Estética, cores, fontes e logos vêm do
[Design System da AUVP](https://produtosauvp.github.io/central/design-system).

**No ar:** https://produtosauvp.github.io/apresentacao-si/

---

## Regras de design

**O fundo padrão é branco.** O verde é pontual: marca só os quatro momentos de
maior peso — capa (01), a virada da solução (08), a regra de ouro (13) e o fecho
(19) — mais os painéis que emolduram print e vídeo. Mudar o `theme` de um slide
para `"dark"` é uma decisão narrativa, não decorativa.

**O verde nunca é chapado.** É sempre o `--green-grad`: o verde da marca descendo
em degradê leve para um verde mais escuro, com uma camada de ruído por cima
(`--grain`, 7% de opacidade) para texturizar. Os dois vivem no CSS — não escreva
`background: hsl(var(--brand-dark))` direto em lugar nenhum.

**Anéis decorativos** (`rings`): o eixo do círculo menor pousa exatamente num
canto, então 3/4 de cada anel sai da tela e só um quadrante aparece. A opacidade
cai conforme o raio cresce — o menor é o mais presente. Escolha o canto que
estiver livre de texto e do cabeçalho.

**Uma cor por equipe** no slide 02, com matizes diferentes mas luminosidade
parecida: lê como sistema, não como arco-íris.

---

## Rodar localmente

Basta abrir o `index.html` no navegador. Se preferir servir:

```bash
python3 -m http.server 8000
# depois abra http://localhost:8000
```

## Atalhos do apresentador

| Tecla | Ação |
|---|---|
| `→` `←` `espaço` | Avançar / voltar |
| `Home` `End` | Primeiro / último slide |
| `S` | Notas da fala (roteiro completo do slide atual) |
| `G` | Visão geral dos 19 slides (mostra o que ainda falta preencher) |
| `T` / `Shift+T` | Cronômetro: iniciar-pausar / zerar — fica vermelho depois de 25 min |
| `F` | Tela cheia |
| `?` | Ajuda |
| `Esc` | Fechar painéis |

Clique na direita/esquerda da tela também avança e volta, e em celular funciona
por arraste. `index.html#7` abre direto no slide 7.

**Exportar em PDF:** `Ctrl/Cmd + P` → paisagem, sem margens, "imprimir cores de
fundo". Cada slide vira uma página; os painéis do apresentador não saem.

---

## Editar o conteúdo

Tudo — textos, imagens e notas de fala — está em **`assets/js/slides.js`**.
É o único arquivo que precisa ser tocado no dia a dia.

```js
const DECK = {
  date: "Julho de 2026",   // aparece no cabeçalho de todos os slides
  targetMinutes: 25,       // limite do cronômetro
};
```

Cada slide é um objeto do array `SLIDES`, na ordem de apresentação.

### Trocar as imagens pelas definitivas

As imagens atuais são **placeholders** gerados em SVG. Para substituir:

1. coloque o arquivo novo em `assets/img/` (png, jpg, webp ou svg — tanto faz);
2. aponte o campo `image` do slide correspondente para ele.

| Slide | Campo `image` hoje | O que entra no lugar |
|---|---|---|
| 03 | `slide-03-nomes-soltos.svg` | 📷 tela real dos nomes soltos (João, Márcio, "meu marido me indicou") |
| 09 | `slide-09-menu-hub.svg` | 📷 menu superior do "Minha AUVP" com os produtos da pessoa |
| 10 | `slide-10-link-rastreavel.svg` | 📷 link estruturado, com o identificador visível |
| 11 | `slide-11-portal-whatsapp.svg` | 📷 portal: brinde do próximo degrau + botão de WhatsApp |
| 12 | `slide-12-video-poster.svg` | 🎥 vídeo de 60–90 s (ver abaixo) |

Prints entram **encaixados** num painel escuro, com respiro em volta — é o que
mantém o rótulo branco do cabeçalho legível sobre imagens claras. Para uma **foto**
que deve sangrar a coluna inteira (como no template impresso), adicione
`bleed: true` no slide.

### Colocar o vídeo do slide 12

Salve o arquivo em `assets/video/demo.mp4` e troque no slide 12:

```js
video: "assets/video/demo.mp4",
poster: "assets/img/slide-12-poster.jpg",   // opcional
```

Sem `video`, o slide mostra o espaço reservado. Mantenha o vídeo em 60–90 s: acima
disso estoura o tempo da apresentação.

### Setinha fixa (➡️)

O campo `annot` desenha a pílula dourada com a seta sobre a imagem:

```js
annot: { text: "identificador", pos: "b" },   // pos: a | b | c
```

As três posições transbordam a borda da imagem de propósito, para a seta nunca
cobrir o que ela aponta. `a` = alto, `b` = meio, `c` = baixo.

### Layouts disponíveis

Todos derivam dos modelos do template oficial:

| `layout` | Uso | Campos |
|---|---|---|
| `cover` | Capa (faixa branca + título grande) | `title`, `subtitle`, `wordmark` |
| `statement` | Declaração com tipo grande — o layout padrão | `title` ou `titleHTML`, `lines[]`, `kicker`, `sub`, `chips[]` |
| `numbers` | Pontuação verbal ("razão um… dois… três") | `title`, `items[{n,t}]` |
| `flow` | Ciclo / bola de neve | `title`, `steps[]`, `flowNote` |
| `image-left` | Slide com imagem, modelo 1 | `title`, `body`, `image`, `annot`, `quote: true` |
| `image-top` | Slide com imagem, modelo 2 | `title`, `body`, `image`, `annot` |
| `cards` | Texto sem imagem, modelo 2 (faixa + cartões; verde só com `theme: "dark"`) | `title`, `lead`, `cardsLabel`, `cards[{h,p}]` (2, 3 ou 6) |
| `video` | Demo em vídeo | `title`, `sub`, `video`, `poster` |
| `closing` | Fecho com entregas + slogan | `title`, `deliver[]`, `slogan` |

Campos comuns: `theme` (`dark` / `light`), `section` (rótulo do cabeçalho),
`navTitle` (nome na visão geral), `marks[]` (os marcadores ⭐ 📷 🎥 ⚠️ ➡️ que
aparecem no painel de notas) e `notes` (o roteiro da fala, aceita HTML simples).

`titleHTML` existe para quando o título precisa de destaque interno —
`<span class="hl">+</span>`, `<span class="arrow">→</span>` ou um `<br>`.

### Anéis e fichas coloridas

```js
rings: { corner: "br", count: 6, base: 340, step: 210, from: 0.42, to: 0.06 },
```

`corner` é `br` | `bl` | `tr` | `tl`; `base` é o diâmetro do menor anel, `step` o
quanto cada um cresce, e `from`/`to` a opacidade do menor e do maior. A cor vem
do tema (branco sobre verde, verde sobre branco) — não precisa declarar.

```js
chips: [{ label: "Produto", color: "155 72% 22%" }],
```

`color` é HSL **sem** o `hsl()` em volta. O texto sai sempre branco, então
mantenha a luminosidade em torno de 22–42% para o contraste se sustentar.

### Animação

A troca de slide é direcional (o conteúdo entra do lado para onde você está
indo) e os elementos sobem escalonados, na ordem em que aparecem na marcação.
Não há nada a configurar: o motor numera os elementos sozinho.

Nenhum estado de repouso é invisível — quem esconde é o keyframe, com fill
`backwards`. É isso que garante que desligar a animação (impressão,
`prefers-reduced-motion`) devolva o slide inteiro visível, em vez de páginas em
branco no PDF.

---

## ⚠️ Antes de apresentar

Os slides marcados com ⚠️ aparecem sinalizados na visão geral (`G`):

- **Slide 02** — creditar nominalmente quem puxou cada frente.
- **Slide 06** — confirmar a base e a janela dos **+5% de faturamento**.
- **Slide 12** — ter o link do ambiente pronto para colar no chat, e o vídeo no lugar.
- **Slide 17** — baseline de (1) tickets/mês sobre brinde e (2) receita atual do canal.
- **`DECK.date`** — conferir o mês no cabeçalho.

---

## Estrutura

```
index.html                    Casca da página (palco + painéis do apresentador)
assets/css/deck.css           Tokens do Design System + todos os layouts
assets/css/fonts.css          @font-face das fontes auto-hospedadas
assets/fonts/                 Anek Latin, Roboto e Sora em woff2
assets/js/slides.js           ← O CONTEÚDO (textos, imagens, notas)
assets/js/deck.js             Motor: renderiza, navega, notas, cronômetro
assets/brand/olho-*.svg       Logos oficiais (branco, preto, amarelo)
assets/img/                   Imagens dos slides (hoje: placeholders)
```

Os slides são desenhados num palco fixo de **1920×1080** e escalados por
transform para caber na tela. É o que garante que o tamanho de fonte na tela é o
mesmo em qualquer monitor, e que o PDF sai idêntico ao que se vê.

As fontes são servidas pelo próprio repositório (subsets latin e latin-ext), de
propósito: a apresentação não pode depender de CDN nem de internet boa na hora H.

---

## Publicar

### Passo manual, uma vez só

Em **Settings → Pages**, deixe **Source = GitHub Actions**.

Isso não dá para automatizar: criar o site do Pages pela API exige permissão de
admin no repositório, e o `GITHUB_TOKEN` do workflow nunca tem esse nível — a
tentativa falha com *"Create Pages site failed: Resource not accessible by
integration"*. Depois de habilitar, reexecute o workflow em **Actions → Publicar
no GitHub Pages → Re-run**.

### Depois disso

O deploy é automático: qualquer push na branch da apresentação ou na `main` roda
`.github/workflows/pages.yml` e publica o repositório como está — não há build.
