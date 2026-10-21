# Cloudflare Pages

Configure o projeto sem framework, deixe o comando de build vazio e use `public` como diretório de saída.

```powershell
npx wrangler pages dev public
npx wrangler pages deploy public --project-name lp-pequititos
```

Rotas publicadas:

- `/pequetitos-lp`
- `/lp/pequetitos-lp` (redireciona para `/pequetitos-lp`)
- `/lp/help`

A raiz `/` permanece sem landing page e retorna 404, como no aplicativo Flask original.
