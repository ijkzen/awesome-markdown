# External Integrations

**Analysis Date:** 2025-03-01

## APIs & External Services

**Browser APIs:**
- Clipboard API (`navigator.clipboard.writeText`) - Copy-to-clipboard functionality
  - Location: `projects/ngx-mkd/src/lib/ngx-mkd.ts:61-65`
  - Fallback: Error logged if API unavailable

- View Transitions API - Animated theme switching
  - Location: `projects/demo-ngx-mkd/src/app/app.ts:193-221`
  - Progressive enhancement with fallback

- localStorage API - Theme persistence
  - Location: `projects/demo-ngx-mkd/src/app/app.ts:139, 179-185`
  - Stores user theme preference

**CDN/External Assets:**
- None detected - All assets bundled at build time

## Data Storage

**Databases:**
- None - Client-side only application

**File Storage:**
- Local filesystem only - Static file serving

**Caching:**
- Browser caching for static assets
- No application-level caching strategy

## Authentication & Identity

**Auth Provider:**
- None - No authentication required

## Monitoring & Observability

**Error Tracking:**
- Angular `provideBrowserGlobalErrorListeners()` - Global error handling
  - Location: `projects/demo-ngx-mkd/src/app/app.config.ts:8`

**Logs:**
- Console-based logging only
- Error logging in `ngx-mkd.ts`: `console.error('Failed to render mermaid diagrams:', error)`
- Error logging in clipboard operations

## CI/CD & Deployment

**Hosting:**
- GitHub Pages
  - Workflow: `.github/workflows/deploy-pages.yml`
  - Target: `/awesome-markdown/` base path
  - Trigger: Push to master branch or manual dispatch

**CI Pipeline:**
- GitHub Actions
  - pnpm setup with caching
  - Node.js 22
  - Build: `pnpm ng build ngx-mkd && pnpm ng build demo-ngx-mkd`
  - Deploy: `actions/deploy-pages@v4`

**Build Artifacts:**
- Location: `dist/demo-ngx-mkd/browser`
- Output hashing enabled in production

## Environment Configuration

**Required env vars:**
- None - No runtime environment variables required

**Build-time Configuration:**
- `baseHref` configured per environment:
  - Development: `/`
  - Production: `/awesome-markdown/`

**Secrets location:**
- None required

## Webhooks & Callbacks

**Incoming:**
- None - Static site with no server-side processing

**Outgoing:**
- None - No external API calls made by the application

## Third-Party Libraries (Runtime)

**Rendering Libraries:**
- marked - Markdown parsing (bundled)
- highlight.js - Syntax highlighting (peer dependency)
- katex - Math formula rendering (peer dependency)
- mermaid - Diagram rendering (peer dependency, lazy loaded)

**Note on Peer Dependencies:**
The library (`ngx-mkd`) declares highlight.js, katex, and mermaid as peer dependencies. Host applications must provide these dependencies. The demo app includes them in its dependencies.

## Browser Compatibility

**Required:**
- Modern browsers with ES2022 support
- CSS custom properties support

**Progressive Enhancement:**
- View Transitions API (graceful degradation if unavailable)
- Clipboard API (graceful degradation if unavailable)
- `prefers-reduced-motion` media query respected for animations

---

*Integration audit: 2025-03-01*
