# Codebase Structure

**Analysis Date:** 2025-03-01

## Directory Layout

```
awesome-markdown/
├── .github/                    # GitHub configuration
│   └── workflows/              # CI/CD workflows (GitHub Pages deployment)
├── .planning/                  # Planning documentation
│   └── codebase/               # Architecture and structure docs
├── .vscode/                    # VS Code workspace settings
├── dist/                       # Build outputs (generated)
│   ├── ngx-mkd/                # Library build artifacts
│   └── demo-ngx-mkd/           # Demo app build artifacts
├── node_modules/               # Dependencies (pnpm workspace)
├── projects/                   # Source projects (Angular monorepo)
│   ├── ngx-mkd/                # Library source
│   │   ├── src/
│   │   │   ├── lib/            # Library implementation
│   │   │   │   ├── markdown-render.service.ts
│   │   │   │   ├── markdown-render.service.spec.ts
│   │   │   │   ├── ngx-mkd.ts
│   │   │   │   ├── ngx-mkd.spec.ts
│   │   │   │   └── ngx-mkd.component.css
│   │   │   └── public-api.ts   # Public exports
│   │   ├── ng-package.json     # ng-packagr configuration
│   │   ├── package.json        # Library package manifest
│   │   └── tsconfig.*.json     # Library TypeScript configs
│   └── demo-ngx-mkd/           # Demo application
│       ├── src/
│       │   ├── app/            # Application code
│       │   │   ├── app.ts      # Root component
│       │   │   ├── app.html    # Root template
│       │   │   ├── app.css     # Root styles
│       │   │   ├── app.config.ts
│       │   │   ├── app.routes.ts
│       │   │   └── app.spec.ts
│       │   ├── environments/   # Environment configs
│       │   │   ├── environment.ts
│       │   │   └── environment.prod.ts
│       │   ├── main.ts         # Bootstrap entry
│       │   ├── index.html      # HTML template
│       │   └── styles.css      # Global styles
│       └── public/             # Static assets
├── scripts/                    # Utility scripts
│   └── benchmark-markdown-render.mjs
├── angular.json                # Angular CLI workspace config
├── package.json                # Root package manifest
├── tsconfig.json               # Root TypeScript config
└── pnpm-lock.yaml              # pnpm lockfile
```

## Directory Purposes

**projects/ngx-mkd/:**
- Purpose: Angular library source code
- Contains: Components, services, styles, tests
- Key files: `src/public-api.ts`, `src/lib/ngx-mkd.ts`, `src/lib/markdown-render.service.ts`
- Build output: `dist/ngx-mkd/`

**projects/demo-ngx-mkd/:**
- Purpose: Demo application showcasing library features
- Contains: Application components, routing, environments
- Key files: `src/main.ts`, `src/app/app.ts`, `src/environments/*.ts`
- Build output: `dist/demo-ngx-mkd/browser/`

**projects/ngx-mkd/src/lib/:**
- Purpose: Library implementation code
- Contains: Core component and service implementations
- Key files: 
  - `ngx-mkd.ts` - Main markdown component
  - `markdown-render.service.ts` - Markdown rendering service
  - `ngx-mkd.component.css` - Component structural styles

**.github/workflows/:**
- Purpose: CI/CD automation
- Contains: `deploy-pages.yml` - GitHub Pages deployment workflow

**dist/:**
- Purpose: Build artifacts (gitignored)
- Generated: Yes
- Committed: No

## Key File Locations

**Entry Points:**
- `projects/demo-ngx-mkd/src/main.ts` - Demo app bootstrap
- `projects/ngx-mkd/src/public-api.ts` - Library public API
- `projects/ngx-mkd/ng-package.json` - Library package configuration

**Configuration:**
- `angular.json` - Angular CLI workspace configuration
- `tsconfig.json` - Root TypeScript configuration
- `projects/demo-ngx-mkd/.postcssrc.json` - PostCSS configuration for Tailwind
- `projects/ngx-mkd/ng-package.json` - Library packaging config

**Core Logic:**
- `projects/ngx-mkd/src/lib/markdown-render.service.ts` - Markdown parsing and HTML generation
- `projects/ngx-mkd/src/lib/ngx-mkd.ts` - Main component with mermaid/copy features

**Testing:**
- `projects/ngx-mkd/src/lib/*.spec.ts` - Library unit tests
- `projects/demo-ngx-mkd/src/app/app.spec.ts` - Demo app tests

## Naming Conventions

**Files:**
- Components: `*.ts` (with matching `*.html`, `*.css` if separate)
- Services: `*.service.ts`
- Tests: `*.spec.ts` (co-located with source)
- Styles: `*.css`
- Config: `*.json`, `tsconfig.*.json`

**Directories:**
- Projects: kebab-case (`ngx-mkd`, `demo-ngx-mkd`)
- Source folders: `src/`
- Library code: `lib/`
- Environments: `environments/`

**Angular Specific:**
- Component selectors: `lib-ngx-mkd` (library), `app-root` (app)
- Component class names: `NgxMkdComponent`, `App`
- Service class names: `MarkdownRenderService`
- Signal inputs: lowercase (`markdown`, `theme`)
- Protected signals: `protected readonly` prefix

## Where to Add New Code

**New Library Component:**
- Implementation: `projects/ngx-mkd/src/lib/{component-name}.ts`
- Styles: `projects/ngx-mkd/src/lib/{component-name}.component.css`
- Tests: `projects/ngx-mkd/src/lib/{component-name}.spec.ts`
- Export: Add to `projects/ngx-mkd/src/public-api.ts`

**New Library Service:**
- Implementation: `projects/ngx-mkd/src/lib/{service-name}.service.ts`
- Tests: `projects/ngx-mkd/src/lib/{service-name}.service.spec.ts`
- Export: Add to `projects/ngx-mkd/src/public-api.ts`

**New Demo Feature:**
- Component: `projects/demo-ngx-mkd/src/app/features/{feature}/`
- Update: `projects/demo-ngx-mkd/src/app/app.routes.ts` for routing

**New Markdown Extension:**
- Parser configuration: `projects/ngx-mkd/src/lib/markdown-render.service.ts`
- Add marked extensions in constructor

**New External Dependency:**
- Library peer deps: `projects/ngx-mkd/package.json`
- Demo deps: root `package.json`
- Types: root `package.json` devDependencies

## Special Directories

**.angular/:**
- Purpose: Angular CLI cache
- Generated: Yes
- Committed: No

**dist/:**
- Purpose: Build outputs for both projects
- Generated: Yes
- Committed: No
- `dist/ngx-mkd/` - Library package ready for npm publish
- `dist/demo-ngx-mkd/browser/` - Static demo site for GitHub Pages

**projects/ngx-mkd/node_modules/:**
- Purpose: Library-specific dependencies (highlight.js, marked)
- Generated: Yes
- Committed: No
- Note: Separate from root node_modules due to pnpm workspace

**scripts/:**
- Purpose: Utility and benchmark scripts
- Contains: `benchmark-markdown-render.mjs`

---

*Structure analysis: 2025-03-01*
