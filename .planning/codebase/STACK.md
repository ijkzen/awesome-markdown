# Technology Stack

**Analysis Date:** 2025-03-01

## Languages

**Primary:**
- TypeScript 5.9.2 - All application and library code
- HTML - Component templates
- CSS - Styling (with Tailwind CSS utility classes)

**Secondary:**
- YAML - GitHub Actions CI/CD configuration
- JSON - Configuration files (package.json, tsconfig.json, angular.json)

## Runtime

**Environment:**
- Node.js 22 (specified in CI/CD workflow)
- Browser runtime (ES2022 target)

**Package Manager:**
- pnpm 10.18.0 (specified in `packageManager` field)
- Lockfile: `pnpm-lock.yaml` (expected)

## Frameworks

**Core:**
- Angular 21.1.0+ - Frontend framework with standalone components
  - Signals-based reactivity (`signal()`, `computed()`, `effect()`)
  - Standalone components (no NgModules)
  - Dependency injection with `inject()` function
  - Strict template checking enabled

**Testing:**
- Angular TestBed - Component testing framework
- Jasmine (implied by Angular testing setup)
- Vitest 4.0.8 available but not primary (devDependency with jsdom)

**Build/Dev:**
- Angular CLI 21.1.3 - Build toolchain
- `@angular/build:application` - Modern application builder
- `@angular/build:ng-packagr` - Library packaging
- ng-packagr 21.2.0 - Angular library packaging

## Key Dependencies

**Critical:**
- `marked` 17.0.3 - Markdown parser engine
- `highlight.js` 11.11.1 - Syntax highlighting for 190+ languages
- `katex` 0.16.33 - Math formula rendering (LaTeX)
- `mermaid` 11.12.3 - Diagram generation (flowcharts, sequence diagrams)
- `marked-katex-extension` 5.1.7 - KaTeX integration for Marked

**Infrastructure:**
- `rxjs` 7.8.0 - Reactive programming (minimal usage observed)
- `tslib` 2.3.0 - TypeScript runtime helpers
- `github-markdown-css` 5.9.0 - GitHub-flavored markdown styling

**Styling:**
- Tailwind CSS 4.1.12 - Utility-first CSS framework
- `@tailwindcss/postcss` 4.1.12 - PostCSS integration

## Configuration

**Environment:**
- Environment files in `projects/demo-ngx-mkd/src/environments/`
- `environment.ts` - Development configuration
- `environment.prod.ts` - Production configuration
- Configuration includes `baseHref` for deployment path

**TypeScript:**
- Strict mode enabled with multiple strict flags
- Project references setup for monorepo structure
- Target: ES2022, Module: preserve
- Experimental decorators enabled (for Angular)

**Angular:**
- `angular.json` - Workspace configuration
- Strict template checking (`strictTemplates: true`)
- Standalone component architecture

**Build:**
- PostCSS with Tailwind CSS v4
- Multiple style bundles for theme variants (markdown-light/dark, hljs-light/dark)
- Budget limits: 2MB warning, 3MB error for initial bundle

## Platform Requirements

**Development:**
- Node.js 22+
- pnpm 10.18.0+
- Modern browser with ES2022 support

**Production:**
- Static file hosting (GitHub Pages configured)
- Client-side rendering only (SPA)
- View Transitions API support (progressive enhancement)

## Project Structure

**Monorepo Layout:**
- `ngx-mkd` - Library package (`projects/ngx-mkd/`)
- `demo-ngx-mkd` - Demo application (`projects/demo-ngx-mkd/`)

**Library Characteristics:**
- Peer dependencies: highlight.js, katex, mermaid
- Side-effects free (`"sideEffects": false`)
- Published to npm as `ngx-mkd`

---

*Stack analysis: 2025-03-01*
