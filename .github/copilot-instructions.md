# Copilot Instructions for `awesome-markdown`

## Project intent and structure
- This repo is a dual-project Angular workspace: a library (`projects/ngx-mkd`) and a demo app (`projects/demo-ngx-mkd`).
- The library provides `NgxMkdComponent` + `MarkdownRenderService`; the demo is the integration reference and manual QA surface.
- Keep library logic reusable and framework-agnostic where possible (`markdown -> html` lives in service), while UI/runtime behavior stays in the component.

## Big-picture architecture (read these first)
- Render pipeline:
  1. `MarkdownRenderService.render()` parses markdown via `marked` + `marked-katex-extension`.
  2. Service custom-renders fenced code blocks (`code-block-wrapper`, language label, copy button).
  3. `NgxMkdComponent` binds service HTML via `[innerHTML]` and post-processes Mermaid blocks.
- Mermaid flow:
  - Service emits `.mermaid` nodes with `data-mermaid-source`.
  - Component (`projects/ngx-mkd/src/lib/ngx-mkd.ts`) dynamically imports `mermaid`, rehydrates source, then runs `mermaid.run({ nodes })`.
- Theme flow:
  - Demo app (`projects/demo-ngx-mkd/src/app/app.ts`) owns `theme` signal and toggles `body.dark/body.light`.
  - Demo swaps non-injected CSS bundles (`/markdown-dark.css`, `/hljs-dark.css`, etc.) by updating `<link>` tags.

## Critical workflows
- Install deps: `pnpm install`
- Run demo dev server: `pnpm start`
- Build library only: `pnpm ng build ngx-mkd`
- Build demo only: `pnpm ng build demo-ngx-mkd`
- Test library specs: `pnpm ng test ngx-mkd --watch=false`
- Performance benchmark (large markdown): `node --expose-gc scripts/benchmark-markdown-render.mjs`

## Repo-specific gotchas (important)
- `tsconfig.json` maps `"ngx-mkd"` to `./dist/ngx-mkd`; if demo fails with `TS2307: Cannot find module 'ngx-mkd'`, build library first (`pnpm ng build ngx-mkd`).
- `NgxMkdComponent` uses `ViewEncapsulation.None` intentionally so styles affect `[innerHTML]` content.
- To avoid global CSS leakage, library selectors are prefixed (e.g., `lib-ngx-mkd .code-block-wrapper`) in `projects/ngx-mkd/src/lib/ngx-mkd.component.css`.
- Keep markdown theme/highlight theme setup aligned with `angular.json` non-inject style bundles; don’t hardcode alternative paths in app code.

## Editing conventions in this codebase
- Use Angular signals (`signal`, `computed`, `effect`) as the default state pattern (see `projects/demo-ngx-mkd/src/app/app.ts`).
- Keep markdown parsing concerns in `MarkdownRenderService`; keep DOM events/runtime side effects in `NgxMkdComponent`.
- Preserve code-block DOM contract used by copy logic and tests:
  - `.code-block-wrapper`
  - `.code-block-language`
  - `.code-copy-button`
- For Mermaid changes, preserve `data-mermaid-source` behavior so re-render on theme switch remains stable.

## Validation expectations after changes
- Library changes: run `pnpm ng test ngx-mkd --watch=false` and `pnpm ng build ngx-mkd`.
- Demo/theme/UI changes: run `pnpm ng build demo-ngx-mkd` and manually verify light/dark switch in demo.
- If touching render performance, update and re-run `scripts/benchmark-markdown-render.mjs` and report p95 latency.
