# Imagens Necessárias para SEO e Compartilhamento

## Favicon e Ícones

### Arquivos necessários em `/public/`:

| Arquivo | Dimensões | Formato | Descrição |
|---------|-----------|---------|-----------|
| `favicon.ico` | 32x32 | ICO | Já existe ✅ |
| `icon.png` | 512x512 | PNG | Ícone para PWA/Android |
| `apple-icon.png` | 180x180 | PNG | Ícone para iOS/Safari |

### Como criar:
1. Use o logo "itan" em formato quadrado
2. Exporte em 512x512 para `icon.png`
3. Exporte em 180x180 para `apple-icon.png`
4. Ambos devem ter fundo transparente ou preto

## Open Graph Image (Miniatura de compartilhamento)

### Arquivo: `/public/og-image.jpg`

**Especificações:**
- Dimensões: **1200 x 630 pixels** (proporção 1.91:1)
- Formato: JPG ou PNG
- Tamanho máximo: < 1MB

**Conteúdo recomendado:**
- Logo "itan" centralizado
- Tagline: "Art × Technology × Strategy" ou "Arte × Tecnologia × Estratégia"
- Elemento visual do seu trabalho (imagem de show/projeto)
- Fundo escuro/preto (consistente com o site)

**Posicionamento do texto (safe zone):**
- Evite colocar texto nas bordas (corte em mobile)
- Centro seguro: 1000 x 500 pixels no centro

## Profile Image

### Arquivo: `/public/images/profile.jpg`

**Especificações:**
- Dimensões: recomendado 600x600 ou maior
- Formato: JPG
- Estilo: foto profissional ou arte conceitual

## Onde usar cada imagem

```
/public/
├── favicon.ico          → Aba do navegador (já existe)
├── icon.png             → Android/PWA home screen
├── apple-icon.png       → iOS home screen
├── og-image.jpg         → Facebook, LinkedIn, WhatsApp preview
└── images/
    └── profile.jpg      → Schema.org, About page
```

## Ferramentas para criar

- **Favicon generator:** https://favicon.io/ ou https://realfavicongenerator.net/
- **OG Image generator:** Canva (tamanho 1200x630)
- **Compressor:** https://tinypng.com/ ou https://squoosh.app/

## Teste após adicionar

1. **Favicon:** Abra o site e verifique a aba do navegador
2. **OG Image:** Use https://www.opengraph.xyz/ ou https://cards-dev.twitter.com/validator
3. **iOS Icon:** Adicione ao home screen no Safari iOS
