# Plano de Melhorias — portfoliogrid

> Análise realizada em 23/03/2026. Itens organizados por prioridade.
> Contexto de produto: `CONTEXTO_pedroitan.md`
> Referência estética principal: **valleeduhamel.com** — replicar: cor sólida por projeto, tipografia display, parallax no scroll, clips autoplay sem UI, lightbox para filme completo.

---

## REDESIGN VISUAL — Alta Prioridade (maior impacto)

> Baseado na referência valleeduhamel.com. São as mudanças de maior impacto visual e de posicionamento.

- [ ] **Sistema de cor sólida por projeto** — cada projeto tem `backgroundColor` e `titleColor` únicos. A cor de fundo muda no scroll via Intersection Observer. Requer criar `src/data/projects.js` com estrutura:
  ```js
  { id, title, backgroundColor: '#0A0AFF', titleColor: '#CCFF00', bunnyVideoId, previewUrl }
  ```
- [ ] **Tipografia display gigante** — título do projeto domina o viewport (fullscreen). Não moderado. A fonte deve ocupar a tela inteira. Aumentar escala dos títulos drasticamente.
- [ ] **Migração de vídeos para Bunny.net** — substituir TODOS os embeds YouTube/Vimeo do portfólio por clips hospedados no Bunny.net (`itan.b-cdn.net`). Usar iframe Bunny com `autoplay=true&loop=true&muted=true&controls=false` — sem UI de player visível:
  ```jsx
  <iframe
    src="https://iframe.mediadelivery.net/embed/[LIBRARY_ID]/[VIDEO_ID]?autoplay=true&loop=true&muted=true&controls=false"
    style={{ border: 'none', width: '100%', height: '100%' }}
  />
  ```
- [ ] **Preview clip ≠ filme completo** — o clip autoplay (curto, sem UI) é diferente do filme completo. O botão de play abre o filme completo em lightbox. Atualizar `Modal.jsx` e `VideoCard.jsx` para suportar `previewUrl` (Bunny clip) e `videoUrl` (filme completo, pode ser YouTube/Vimeo/Bunny).
- [ ] **Parallax / fade do título no scroll** — o título do projeto tem opacity que muda conforme o usuário scrolla sobre a imagem. Implementar via Intersection Observer puro (sem GSAP ou biblioteca pesada).

---

## P1 — Bugs Críticos (corrigir primeiro)

- [x] **DEBUG em produção** — removido de `VideoCarousel.jsx`. ✅
- [x] **`Modal.jsx` — import SSR** — corrigido com `dynamic(() => import('react-player'), { ssr: false })`. ✅
- [x] **Vídeos com URL vazia** — filtrados em `VideoGrid.jsx` (url vazia ou instagram.com). ✅
- [x] **IDs 42 e 43 usam URLs do Instagram** — URLs limpas no `videos.js` (url: ""), já filtrados pelo `VideoGrid.jsx`. ✅
- [ ] **`profile.jpg` tem 2 bytes** — arquivo corrompido. Substituir por foto real do Itan.
- [x] **`VideoCarousel.jsx` usa `<ReactPlayer>` sem importar** — corrigido com dynamic import. ✅

---

## P2 — Arquitetura e Limpeza de Código

- [x] **Conflito Tailwind v4/v3** — cores migradas para `@theme` no `globals.css` (sintaxe v4 nativa). `tailwind.config.js` mantido apenas para compatiblidade. ✅
- [x] **`getProperUrl()` triplicado** — extraído para `src/lib/utils.js`, removido dos 3 componentes. ✅
- [ ] **Arquivos mortos** — remover/limpar:
  - `src/components/HeroLight.jsx` (0 bytes)
  - `src/data/videos_data.json` (0 bytes)
  - `src/components/ItalExpertiseNav.tsx` (duplicata do `.jsx`)
  - `src/components/HeroVideo.tsx` (comentado em `page.tsx`, não usado)
  - `src/components/ui/star-border.jsx` + `star-border.tsx` (duplicata)
- [x] **`next.config.ts` vazio** — configurado com `remotePatterns` para `itan.b-cdn.net`, `i.ytimg.com`, `vumbnail.com`, `i.vimeocdn.com`. ✅
- [x] **`Header.jsx` duplica Bio e Contact** — removidos do Header. Menu agora scrolla para as seções da página via hash. ✅
- [ ] **Hash de URL como state** — `window.location.hash` usado como mecanismo de state management em múltiplos componentes. Migrar para React state puro no `ExpertiseContext`.
- [x] **`isMobile` em `ExpertiseSwipeContainer`** — migrado para `useEffect` + `useState` com listener de resize. ✅
- [x] **`setActiveExpertise` chamado 2x no timeout** em `ItalExpertiseNav.jsx` — removido o `setTimeout`. ✅

---

## P3 — Performance

- [x] **`priority={true}` em todos os VideoCards** — corrigido: prop `priority` passada do VideoGrid, `true` apenas nos primeiros 12 itens. ✅
- [x] **62 vídeos renderizados de uma vez** — paginação implementada: 24 por vez com botão "+ N vídeos". Reset ao trocar de tag. ✅
- [x] **Self-host fontes** — Satoshi migrado para `next/font/local` (Satoshi-Bold.woff2). CDN externo removido do globals.css. Outfit não estava sendo usado e foi removido. ✅
- [ ] **Thumbnails ausentes** — a maioria dos vídeos tem `thumbnailImage: null`, fazendo o grid disparar N requests ao YouTube. Adicionar thumbnails estáticos para os principais ou usar a API do YouTube para pré-gerar.
- [x] **Hero video carrega imediatamente** — adicionado fade-in (opacity 0→1 em 1s) com `onReady` callback. Vídeo aparece suavemente ao invés de piscar. ✅

---

## P4 — Design e UI/UX

- [x] **Bio — conteúdo real** — reescrito em PT-BR (e EN), primeira pessoa, narrativa de impacto. NBA Finals, Grammy Latino, "Arte × Tecnologia × Estratégia". Sem bullet points. ✅
- [ ] **Bio — foto editorial** — substituir placeholder por foto real. Adicionar `<Image>` do Next.js com layout editorial (não círculo). _Requer arquivo do usuário._
- [x] **Contato — label corporativo** — removido na sessão de i18n; `Contact.jsx` já usa `t('infoTitle')` = "Fale Comigo" / "Get in Touch". ✅
- [ ] **Formulário de contato** — botão tem `type="button"` sem lógica de envio. Conectar a serviço de email (Resend, EmailJS, Formspree, etc.).
- [ ] **Links de redes sociais** — todos em `href="#"`. Substituir pelos links reais (Instagram, LinkedIn, etc.).
- [x] **TagFilter** — limitado a 12 tags iniciais com botão `+N` para expandir (desktop e mobile). ✅
- [x] **Header `scrolled`** — implementado `bg-black/70 backdrop-blur-md` ao rolar, transparente no topo. ✅
- [x] **`neon-button.tsx`** — ajustado para branco/neutro (removido azul). ✅
- [x] **`globals.css` — estilos de teste** — `.font-comic`, `.font-arial`, `.font-impact` removidos. ✅
- [x] **Ícone mute/unmute** — substituídos por `Volume2` / `VolumeX` do Lucide. Focus ring azul → branco. ✅
- [x] **Thumbnails do MenuOverlay** — verificado: todas as 6 imagens existem (`iza-uma-vida.jpg`, `budtalks.jpg`, `farm-oxe.jpg`, `iza-making-of.jpg`, `ludmilla-making-off.jpg`, `ludmilla-nba.jpg`). ✅
- [x] **Footer** — expandido com tagline, email (`contato@pedroitan.com`) e ícone Instagram. ✅
- [ ] **`favicon.ico` tem 14 bytes** — placeholder. Gerar favicon real com a identidade do Itan.
- [x] **Títulos dos vídeos** — `toDisplayTitle()` adicionado em `utils.js` e aplicado no `VideoCard`. Strings totalmente em maiúsculas são convertidas para Title Case; mixed-case fica intacto. ✅

---

## P5 — Thumbnails Animadas (hover preview)

### Método definido: MP4 curto no Bunny Storage + `<video>` no hover

**Fluxo de produção:**
1. Selecionar manualmente o trecho desejado de cada vídeo (10-15s)
2. Exportar como `.mp4` (H.264, resolução reduzida — ex: 640x360)
3. Subir no Bunny Storage em pasta dedicada: `itan.b-cdn.net/previews/{nome}.mp4`
4. Adicionar campo `previewUrl` no `videos.js` para cada vídeo:
   ```js
   previewUrl: "https://itan.b-cdn.net/previews/iza-uma-vida.mp4"
   ```
5. Atualizar `VideoCard.jsx`: no `mouseEnter`, trocar `<img>` por `<video autoPlay muted loop playsInline>`; no `mouseLeave`, voltar para o thumbnail estático

**Por que MP4 e não WebP animado:**
- Menor arquivo que GIF, similar ao WebP mas mais simples
- Aceleração de hardware no browser
- Sem conversão extra — exporta direto do editor
- `<video muted autoPlay loop playsInline>` funciona em todos os browsers modernos

**Bunny Storage vs Bunny Stream:**
- Usar **Bunny Storage** (já em uso em `itan.b-cdn.net`) — não precisa do Bunny Stream
- Bunny Stream só seria necessário se precisasse de encoding automático / HLS / player próprio

**Status:** Aguardando exportação manual dos clips MP4 pelo Itan. Após upload, implementar no `VideoCard.jsx`.

> **Nota:** este fluxo de preview MP4 é o pré-cursor da migração completa para Bunny.net (ver seção REDESIGN VISUAL). Os clips de preview e os filmes completos serão todos hospedados em `itan.b-cdn.net`.

---

## I18N — Internacionalização (PT-BR + EN)

> Site deve ter versão em **português (PT-BR)** e **inglês (EN)**. PT-BR é o default, EN acessível via `/en`.

### Biblioteca: `next-intl`
Melhor opção para Next.js 15 App Router — suporta Server e Client Components, roteamento por locale, type-safe.

```
npm install next-intl
```

### Estrutura de rotas resultante

```
src/
  app/
    [locale]/          ← novo — engloba todas as páginas
      page.tsx
      layout.tsx
  i18n/
    messages/
      pt.json          ← textos em português
      en.json          ← textos em inglês
    routing.ts         ← config de locales e default
```

### Tarefas de implementação

- [x] Instalar `next-intl` e configurar `middleware.ts` para detecção de locale ✅
- [x] Reorganizar `src/app/` para `src/app/[locale]/` ✅
- [x] Criar `messages/pt.json` com todos os textos do site ✅
- [x] Criar `messages/en.json` com versão em inglês ✅
- [x] Atualizar `layout.tsx` para passar `locale` ao `NextIntlClientProvider` ✅
- [x] Substituir strings hardcoded em todos os componentes por `useTranslations()` ✅
- [x] Adicionar seletor de idioma no `Header.jsx` (toggle PT / EN) ✅
- [x] Atualizar `next.config.ts` com config do `next-intl` ✅
- [x] Atualizar `metadata` em `[locale]/layout.tsx` para ser dinâmico por locale (`hreflang`) ✅

### Textos a traduzir (componentes afetados)

| Componente | Textos |
|---|---|
| `HeroVideoDynamic.tsx` | "ver portfólio" |
| `ExpertiseDescriptions.jsx` | Descrições das 3 áreas |
| `ItalExpertiseNav.jsx` | "Direção Audiovisual", "Produção Musical", "Tecnologia" |
| `Bio.jsx` | Bio completa |
| `Contact.jsx` | Labels, placeholder, botão |
| `MenuOverlay.jsx` | "Portfolio", "Bio", "Contato" |
| `VideoGrid.jsx` | Labels de seção |
| `TagFilter.jsx` | Tags (manter PT ou traduzir?) |
| `Footer` | Copyright |

### Decisão de conteúdo

- **Bio:** versão PT-BR mais emocional/narrativa; versão EN mais direta para mercado internacional
- **Tags do grid:** manter PT-BR em ambas as versões (são rótulos de trabalho, não UI)
- **Títulos dos projetos:** manter como estão (são nomes próprios de obras)
- **URL default:** `/` → PT-BR, `/en` → English. Sem redirect forçado — deixar browser preference detectar.

---

## P6 — Melhorias Futuras (nice-to-have)

- [ ] **TypeScript estrito** — `videos.js` e a maioria dos componentes são JS puro. Migrar gradualmente para `.tsx` com tipos.
- [ ] **SEO** — `layout.tsx` tem metadata básica. Adicionar Open Graph, Twitter Card, structured data.
- [ ] **Acessibilidade** — revisar `aria-label`, foco de teclado no modal, contraste de cores.
- [ ] **Animação de entrada no grid** — atualmente usa `opacity: 0 → 1` simples. Pode ter stagger animation mais refinado.
- [ ] **Modo de visualização alternativo** — além do grid, opção de lista com mais detalhes por vídeo.
- [ ] **Analytics** — integrar Vercel Analytics ou Plausible para métricas básicas.

---

## Ordem de Execução Sugerida

### Fase 1 — Base limpa (fazer agora)
1. **P1** completo — remover bugs críticos e código de debug
2. **P2** — arquivos mortos, `next.config.ts`, fix SSR do Modal
3. **P3** — self-host fontes, priority nas imagens

### Fase 2 — Conteúdo real (paralelo à Fase 1)
4. **P4** — Bio em PT-BR com guidelines do CONTEXTO + foto editorial + favicon + links reais
5. **P4** — TagFilter, footer, ícones corretos, limpar globals.css

### Fase 3 — Redesign visual (maior impacto)
6. **REDESIGN** — Sistema de cor sólida por projeto (`projects.js` + Intersection Observer)
7. **REDESIGN** — Tipografia display gigante
8. **REDESIGN** — Migração vídeos para Bunny.net (clips autoplay + lightbox filme completo)
9. **REDESIGN** — Parallax/fade título no scroll

### Fase 4 — Thumbnails animadas
10. **P5** — Após migração Bunny.net: preview MP4 no hover do grid

### Fase 5 — Internacionalização
11. **I18N** — instalar `next-intl`, reestruturar `app/[locale]/`, criar `pt.json` e `en.json`
12. **I18N** — substituir strings hardcoded nos componentes, adicionar toggle PT/EN no header
13. **I18N** — Bio EN com tom adaptado para mercado internacional, metadata `hreflang`

### Fase 6 — Refinamento
14. **P2** restante — refactor hash state, getProperUrl utils
15. **P6** — TypeScript, SEO (Open Graph, Twitter Card), acessibilidade, analytics
