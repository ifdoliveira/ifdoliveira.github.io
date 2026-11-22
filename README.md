# Portfólio · Ingrid Oliveira

Site de página única (HTML, CSS e JavaScript puros) com português e inglês, fotos analógicas na Home e pop-up de apresentação para cada projeto. Não usa framework nem etapa de build: o que está nesta pasta é exatamente o que vai ao ar.

## Estrutura

```
portfolio-site/
├── index.html              ← a página inteira (Home, Sobre, Projetos, Contato)
├── README.md               ← este guia
├── .nojekyll               ← avisa o GitHub Pages para publicar os arquivos como estão
└── assets/
    ├── curriculo-ingrid-oliveira.pdf  ← arquivo baixado pelo botão Currículo
    ├── css/style.css       ← cores (variáveis no topo), tipografia e layout
    ├── js/
    │   ├── i18n.js         ← todos os textos em PT e EN (edite aqui para mudar um texto)
    │   └── main.js         ← idioma, fotos que passam, menu, pop-up dos projetos
    └── img/
        ├── hero/           ← 9 fotos analógicas que passam no fundo da Home
        ├── ingrid-oliveira.jpg
        └── projects/
            ├── capa-*.jpg      ← capa de cada card (leve, carrega na hora)
            └── slides-*.jpg    ← todos os slides de um projeto numa só imagem (carregam só ao abrir o pop-up)
```

Tipografia: DM Mono e Space Mono, carregadas do Google Fonts (precisa de internet; sem ela o navegador usa uma fonte monoespaçada padrão).

## Ver o site no seu computador

Abrir o `index.html` com duplo clique já funciona. Para ver como será na internet, use um servidor local:

```
cd portfolio-site
python3 -m http.server 8000
```

e abra http://localhost:8000 no navegador (Ctrl+C no terminal para parar).

## Como editar

| Quero mudar… | Onde |
|---|---|
| Qualquer texto (PT ou EN) | `assets/js/i18n.js` |
| Cores | variáveis `:root` no topo de `assets/css/style.css` |
| Fotos que passam na Home | trocar os arquivos de `assets/img/hero/` (mesmo nome) |
| Sua foto do Sobre | trocar `assets/img/ingrid-oliveira.jpg` |
| E-mail ou LinkedIn | final do `index.html`, seção `id="contato"` |
| Currículo (botão da seção Sobre) | substituir `assets/curriculo-ingrid-oliveira.pdf` por um PDF novo **com o mesmo nome** |

**Novo projeto:** exporte a apresentação em imagens, junte os slides em uma única imagem de 2 colunas (cada slide 1280×720) e salve como `slides-nome.jpg`; faça a capa `capa-nome.jpg` (960×540); copie um bloco `<button class="card">` no `index.html` e uma linha em `PROJECTS` no `main.js` (id, número de slides `k` e de linhas `r`). Se preferir, peça ajuda para gerar esses arquivos.

## Publicar no GitHub Pages

1. Crie uma conta em https://github.com (se ainda não tiver).
2. Clique em **New repository**. Nome sugerido: `portfolio` (ou `SEU-USUARIO.github.io` para o endereço ficar só `https://SEU-USUARIO.github.io`). Deixe **Public**.
3. Na página do repositório vazio, clique em **uploading an existing file** e arraste o **conteúdo** desta pasta (index.html, README.md e a pasta assets), não o .zip. Clique em **Commit changes**.
4. Vá em **Settings → Pages**. Em *Build and deployment*, escolha **Source: Deploy from a branch**, **Branch: main**, pasta **/ (root)** e clique em **Save**.
5. Aguarde 1 a 3 minutos. O endereço aparece no topo da página de Pages: `https://SEU-USUARIO.github.io/portfolio/`.

Não é preciso ferramenta de build nem GitHub Actions: com a fonte "Deploy from a branch", todo envio novo para a `main` republica o site sozinho.

## Publicar atualizações

Pelo navegador: abra o repositório, entre no arquivo (ou **Add file → Upload files** para trocar imagens), edite, clique em **Commit changes**. Em 1 a 3 minutos o site está atualizado (se não aparecer, atualize com Ctrl+F5).

## Domínio próprio (quando você comprar)

Nada precisa ser mudado no código: todos os caminhos são relativos e funcionam em qualquer endereço.

1. No GitHub: **Settings → Pages → Custom domain**, digite o domínio (ex.: `seudominio.com.br`) e **Save**. Isso cria um arquivo `CNAME` no repositório. Faça isso **antes** de mexer no DNS.
   - Recomendado: verifique o domínio em **Settings → Pages → Add a domain** (da sua conta), para evitar que outra pessoa o use.
2. No site onde comprou o domínio (Registro.br, GoDaddy, Hostinger…), abra o painel de **DNS** e crie:
   - 4 registros **A** para `@` (domínio sem www): `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - (opcional) 4 registros **AAAA** para `@`: `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`, `2606:50c0:8003::153`
   - 1 registro **CNAME** para `www` apontando para `SEU-USUARIO.github.io`
3. Espere a propagação (até 24 horas) e marque **Enforce HTTPS** em Settings → Pages quando a opção ficar disponível.

Confirme os valores na documentação oficial antes de usar: https://docs.github.com/pt/pages/configuring-a-custom-domain-for-your-github-pages-site

## Pendências conhecidas

- Não há favicon nem imagem de pré-visualização para redes sociais (`og:image`); podem ser adicionados depois.
- No celular, os slides do pop-up ficam pequenos; girar o aparelho ajuda.
