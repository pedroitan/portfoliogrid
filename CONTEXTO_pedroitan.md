# CONTEXTO — pedroitan.com
> Arquivo de referência para desenvolvimento e redesign do site. Use este documento como contexto principal no Windsurf AI antes de qualquer alteração.

---

## 1. QUEM É ITAN

Pedro Itan é diretor criativo e profissional audiovisual de alto nível, com portfólio que inclui NBA Finals halftime show, indicação ao Grammy Latino, Copa Nordeste e grandes campanhas de marcas. Seu trabalho opera na interseção de arte, tecnologia e estratégia — um perfil híbrido entre diretor criativo, produtor musical e engenheiro audiovisual.

**Posicionamento atual:** o gap principal não é qualidade de trabalho (já está no topo), mas visibilidade sistemática de mercado. O objetivo do site é fechar esse gap posicionando Itan como Key Person of Influence em direção criativa.

---

## 2. STACK TÉCNICA ATUAL

| Camada | Tecnologia |
|--------|-----------|
| Framework | Next.js (App Router) |
| Hospedagem | **Vercel** |
| DNS / CDN | Cloudflare (apenas DNS e analytics beacon) |
| Fontes | Satoshi (Fontshare) + Outfit (Google Fonts) |
| Player de vídeo | react-player |
| Vídeo hero | **Bunny.net** — `itan.b-cdn.net` (já integrado) |
| Vídeos do portfólio | YouTube + Vimeo via noembed.com ← **problema a resolver** |

---

## 3. REFERÊNCIA ESTÉTICA PRINCIPAL

**Site de referência:** [valleeduhamel.com](https://valleeduhamel.com)

### Elementos a replicar obrigatoriamente

1. **Tipografia display gigante** — título de projeto em tamanho fullscreen, dominando o viewport. Não timid, não moderado. A fonte precisa ocupar a tela.

2. **Cor de fundo sólida por projeto** — cada projeto tem uma cor sólida única que define seu "ambiente" visual. A paleta muda a cada scroll. É o elemento de maior impacto do VD e o que mais diferencia de um portfólio genérico.

3. **Parallax / fade do título sobre a imagem** — o título do projeto sobrepõe a imagem com opacity que muda no scroll. Cria profundidade sem peso técnico.

4. **Menu fullscreen com preview visual ao hover** — ao abrir o menu, cada item de navegação tem uma imagem de preview que aparece ao hover. As letras da palavra "menu" aparecem empilhadas verticalmente.

5. **Clips de vídeo autoplay sem controles visíveis** — na página de projeto, clips curtos rodam em loop sem nenhuma UI de player visível. Sem play button, sem barra de progresso.

6. **Lightbox para o filme completo** — botão de play abre o vídeo em lightbox. O clip de preview é diferente do filme completo.

7. **Wordmark em lowercase** — identidade tipográfica minimalista e própria.

### O que NÃO fazer (lição do VD)

- VD serve vídeos `.mp4` diretamente do servidor WordPress sem CDN — má prática de performance que o pedroitan.com já evita com Bunny.net
- VD usa Elementor — limita animações avançadas. pedroitan.com usa Next.js + código customizado, o que é tecnicamente superior

---

## 4. DIAGNÓSTICO DO SITE ATUAL (pedroitan.com)

### Problemas críticos a resolver

| Área | Problema atual | Solução |
|------|---------------|---------|
| **Cor** | Fundo preto uniforme em todo o site | Cor sólida única por projeto, muda no scroll |
| **Tipografia** | Wordmark pequena centralizada (~15% da tela) | Tipografia display gigante fullscreen |
| **Portfólio** | Grid de thumbnails estáticas do YouTube | Apresentação fullscreen com título sobreposto |
| **Vídeos** | Embeds YouTube/Vimeo com UI externa | Clips Bunny.net autoplay sem controles |
| **Menu** | Header fixo com hamburger convencional | Menu fullscreen com preview visual ao hover |
| **Sobre** | Texto genérico em inglês com bullet points | Texto em PT-BR, primeira pessoa, com linguagem de posicionamento |
| **Foto** | Imagem em círculo escuro quase invisível | Foto editorial de impacto |
| **Scroll** | Experiência estática, sem animação | Parallax, fade, transição de cor de fundo |
| **Animação** | Nenhuma animação de entrada ou scroll | Implementar com código customizado (não Elementor) |

### Pontos fortes a manter

- Base técnica excelente: Next.js + App Router
- Bunny.net já integrado no hero (`itan.b-cdn.net`)
- Cloudflare no DNS (performance e segurança)
- Wordmark "itan" em lowercase — manter e ampliar

---

## 5. HOSPEDAGEM DE VÍDEO — DECISÃO TOMADA

**Plataforma escolhida: Bunny.net** (já em uso para o hero)

**Subdomínio ativo:** `itan.b-cdn.net`

### Por que Bunny.net

- Custo: ~$1/mês para o volume atual (30 vídeos, 50GB, 10k visitantes)
- Player customizável via CSS — sem marca de terceiro visível
- HLS / adaptive bitrate incluído gratuitamente
- Encoding gratuito
- CDN com 119 PoPs globais, 25ms de latência média
- Suporta embed limpo sem UI externa (ideal para autoplay sem controles)

### Comparativo de custo (cenário real: 30 vídeos × 3min, 50GB, 10k visitantes)

| Plataforma | Custo mensal |
|-----------|-------------|
| Bunny.net | **$1,00** |
| Cloudflare Stream | $35,00 |
| Vimeo Pro | ~$20,00 |

### O que migrar

- Todos os vídeos do portfólio hoje em YouTube/Vimeo → upload para Bunny.net
- Usar embed Bunny sem player visível para clips de autoplay
- Lightbox para filme completo (pode manter Vimeo para o filme longo se quiser, ou usar Bunny também)

### Estrutura de embed recomendada no Next.js

```jsx
// Clip autoplay sem UI (no página de projeto)
<iframe
  src="https://iframe.mediadelivery.net/embed/[LIBRARY_ID]/[VIDEO_ID]?autoplay=true&loop=true&muted=true&controls=false"
  loading="lazy"
  style={{ border: 'none', width: '100%', height: '100%' }}
/>

// Lightbox para filme completo
// Usar biblioteca tipo yet-another-react-lightbox ou custom
```

---

## 6. CONTEÚDO DE TEXTO — DIRETRIZES

### Seção "Sobre"

**Problemas atuais:**
- Está em inglês
- Linguagem genérica ("Creative Director with expertise in...")
- Lista de bullet points não reflete o nível do trabalho
- Foto em círculo escuro quase invisível

**Como deve ser:**
- Em português (PT-BR)
- Em primeira pessoa
- Linguagem que reflete o posicionamento "Art × Technology × Strategy"
- Deve comunicar o nível do trabalho sem parecer um currículo
- Mencionar credenciais de impacto (NBA Finals, Grammy Latino) de forma natural, não como lista
- Sem bullet points — texto corrido com personalidade

**Referência de tom:** direto, confiante, autoral. Não corporativo.

### Nomenclatura dos projetos

- Manter PT-BR onde já existe
- Títulos dos projetos devem ser tratados como títulos de obras — não como labels de categoria

### Seção de contato

- Manter formulário funcional
- Simplificar texto — menos formal
- Remover "Propostas de Trabalho" como label — muito corporativo

---

## 7. INFRAESTRUTURA — DECISÕES

### Hospedagem: Vercel ✅

**Decisão tomada e implementada.** Projeto clonado do GitHub e desenvolvimento continuando no Vercel.

**Por que Vercel é a escolha certa:**
- Vercel criou o Next.js — suporte nativo ao App Router sem adapters ou camadas de compatibilidade
- Deploy preview automático por branch — essencial para redesign ativo
- Zero configuração para Next.js — detecção automática de framework
- Plano Hobby gratuito cobre portfólio pessoal

**Importante:** os vídeos no Bunny.net (`itan.b-cdn.net`) são completamente independentes da hospedagem do app — funcionam da mesma forma em qualquer plataforma.

---

## 8. PRIORIDADES DE IMPLEMENTAÇÃO

### Alta prioridade (impacto visual imediato)

1. **Cor de fundo por projeto** — implementar sistema de cor sólida por projeto com transição no scroll. É a mudança de maior impacto com menor esforço.

2. **Tipografia display** — aumentar escala dos títulos de projeto para dominar o viewport. Não precisa recriar o layout inteiro — só escalar a tipografia e posicionamento.

3. **Migrar vídeos do portfólio para Bunny.net** — substituir thumbnails do YouTube por clips de autoplay servidos pelo Bunny.

### Média prioridade (experiência de navegação)

4. **Parallax / fade no scroll** — título do projeto com opacity que muda conforme o usuário scrolla sobre a imagem.

5. **Menu fullscreen com preview** — redesign do menu hambúrguer para fullscreen com imagem de preview ao hover.

6. **Reescrever seção "Sobre"** — texto em PT-BR, primeira pessoa, com linguagem de posicionamento.

### Menor urgência (refinamento)

7. **Foto editorial** — substituir a imagem de perfil atual por foto de impacto.

8. **Animações de entrada** — implementar com Framer Motion ou CSS transitions.

---

## 9. REFERÊNCIAS TÉCNICAS PARA O WINDSURF

### Estrutura de cores por projeto (exemplo de implementação)

```js
// data/projects.js
export const projects = [
  {
    id: 'iza-uma-vida',
    title: 'IZA — Uma Vida É Pouco',
    backgroundColor: '#0A0AFF', // azul royal
    titleColor: '#CCFF00',       // verde lima
    videoId: 'bunny-video-id',
    // ...
  },
  {
    id: 'nba-finals',
    title: 'NBA Finals Halftime',
    backgroundColor: '#CC0044', // fucsia
    titleColor: '#00FF99',
    videoId: 'bunny-video-id',
    // ...
  },
  // ...
]
```

```jsx
// components/ProjectSection.jsx
// Cada seção de projeto muda a cor de fundo via CSS custom property
// controlada por Intersection Observer no scroll
```

### Parallax simples com Intersection Observer

```js
// Sem biblioteca externa — apenas Intersection Observer + CSS transform
// É o que VD faz — não usa GSAP ou biblioteca pesada
```

### Autoplay Bunny sem UI

```jsx
// muted + autoplay + controls=false + loop=true
// A propriedade `controls=false` no URL do embed do Bunny remove toda a UI
```

---

## 10. O QUE NÃO MUDAR

- **Stack Next.js** — não trocar framework
- **Wordmark "itan"** em lowercase — identidade visual principal
- **Bunny.net** para vídeos — decisão correta, só expandir
- **Cloudflare no DNS** — manter independente da hospedagem do app
- **Estrutura de categorias** (Direção Audiovisual / Produção Musical / Tecnologia) — a trifecta de posicionamento está correta

---

## 11. CONTEXTO DE MERCADO

- **Público-alvo:** produtoras, marcas, agências, artistas de alto nível no Brasil e mercado internacional
- **Competidores de referência:** Vallée Duhamel (Montreal), diretores criativos internacionais com portfólio visual-first
- **Diferencial a comunicar:** única combinação de direção criativa + produção musical + tecnologia/engenharia audiovisual no mercado brasileiro

---

*Última atualização: março 2026 — gerado a partir de sessão de análise com Claude (Sonnet 4.6)*
