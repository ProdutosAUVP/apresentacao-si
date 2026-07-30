# Indicação V2 — apresentação

Apresentação de ~25 min de fala sobre a Indicação V2, em 16 slides, no formato
minimalista: **pouco texto na tela, o roteiro fica na fala**. O sistema é
demonstrado ao vivo no fim, fora do deck.

Site estático, sem build e sem dependências. Estética, cores, fontes e logos vêm do
[Design System da AUVP](https://produtosauvp.github.io/central/design-system).

**No ar:** https://produtosauvp.github.io/apresentacao-si/

---

## Regras de design

**O fundo padrão é branco.** O verde é pontual: marca só os quatro momentos de
maior peso — capa (01), a virada da solução (07), a regra de ouro (11) e o fecho
(16) — mais os painéis que emolduram os prints. Mudar o `theme` de um slide para
`"dark"` é uma decisão narrativa, não decorativa.

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
| `G` | Visão geral dos 16 slides (mostra o que ainda falta preencher) |
| `T` / `Shift+T` | Cronômetro: iniciar-pausar / zerar — fica vermelho depois de 25 min |
| `F` | Tela cheia |
| `?` | Ajuda |
| `Esc` | Fechar painéis |

Clique na direita/esquerda da tela também avança e volta, e em celular funciona
por arraste. `index.html#7` abre direto no slide 7.

O slide 09 tem **um passo interno**: o primeiro avanço revela a segunda seta, e
só o seguinte vira o slide.

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

### As imagens

Já são as definitivas. Para trocar alguma: coloque o arquivo em `assets/img/`
(png, jpg, webp ou svg) e aponte o campo `image` do slide para ele.

| Slide | Arquivo | O que mostra |
|---|---|---|
| 03 | `slide03 1.png` | planilha com os nomes soltos dos embaixadores |
| 08 | `slide 09.png` | portal: seleção de produto e o link pronto |
| 09 | `slide 10.png` + `Seta1_slide10.png` / `Seta2_slide10.png` | a tela em cima, o retorno do Salesforce embaixo |
| 10 | `slide 12.png` | portal: indicações recentes e a trilha de progresso |
| 11 | `slide 13.png` | primeira página do regulamento (miniatura) |

> Os nomes dos arquivos seguem a numeração do documento original, que não bate
> com a do deck — `slide 12.png` é a imagem do slide **10**, e `slide 09.png` e
> `slide 10.png` são o mesmo arquivo. Vá pelo campo `image` do slide, não pelo
> nome.

Prints entram **encaixados** num painel verde, com respiro em volta — é o que
mantém o rótulo branco do cabeçalho legível sobre imagens claras. O
`object-fit: contain` faz o print caber sem distorcer, inclusive ampliando um
print pequeno. Para uma **foto** que deve sangrar o painel inteiro (como no
template impresso), adicione `bleed: true`.

Se um print denso ficar pequeno demais no layout `image-top`, aumente a faixa
com `band: 800` (o padrão é 620 px).

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
| `image-left` | Print à esquerda, texto à direita | `title`, `body`, `image`, `annot`, `stat`, `quote: true` |
| `image-top` | Print em faixa no topo | `title`, `body`, `image`, `annot`, `band` |
| `image-stack` | Duas imagens empilhadas na faixa (tela + payload) | `image`, `stack[]`, `title`, `body` |
| `cards` | Faixa + cartões; verde só com `theme: "dark"` | `title`, `lead`, `cardsLabel`, `cards[{h,p}]`, `doc` |
| `video` | Demo em vídeo (disponível, sem uso hoje) | `title`, `sub`, `video`, `poster` |
| `closing` | Fecho com entregas + slogan | `title`, `deliver[]`, `slogan` |

Campos comuns: `theme` (`dark` / `light`), `section` (rótulo do cabeçalho),
`navTitle` (nome na visão geral), `marks[]` (os marcadores ⭐ 📷 🎥 ⚠️ ➡️ que
aparecem no painel de notas) e `notes` (o roteiro da fala, aceita HTML simples).

`titleHTML` existe para quando o título precisa de destaque interno —
`<span class="hl">+</span>`, `<span class="arrow">→</span>` ou um `<br>`.

### Destaque numérico, documento e passos

`stat` põe um número grande abaixo do texto, com barra dourada:

```js
stat: { n: "32%", t: "da nossa base tem registro assim — e não dá pra cruzar." },
```

`doc` põe uma miniatura de documento flutuando na faixa dos `cards` — serve para
mostrar que a peça existe, sem exigir que ninguém a leia da plateia:

```js
doc: { image: "assets/img/slide 13.png", alt: "…", caption: "Regulamento oficial" },
```

`stack` empilha camadas que são reveladas **uma por vez**, com a mesma tecla de
avançar. É o que faz as duas setas do slide 09 aparecerem em tempos diferentes:
o slide só vira depois que todas as camadas apareceram. Voltando, o slide reabre
já revelado.

```js
image: "assets/img/slide 10.png",           // camada fixa, em cima
stack: [{ image: "…Seta1…" }, { image: "…Seta2…" }],  // reveladas em ordem
```

Como as camadas ocupam a mesma célula e a de cima só acrescenta uma seta,
revelar o passo parece a seta aparecendo — não a imagem trocando.

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
- **Slide 03** — conferir a base e a data de apuração dos **32%**.
- **Slide 06** — confirmar a base e a janela dos **+5% de faturamento**.
- **Slide 15** — baseline de (1) tickets/mês sobre brinde e (2) receita atual do canal.
- **`DECK.date`** — conferir o mês no cabeçalho.
- **Demo ao vivo** — o sistema é mostrado no fim, fora do deck: deixe o ambiente
  aberto e o link à mão.

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
