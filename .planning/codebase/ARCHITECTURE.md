# Architecture

**Analysis Date:** 2025-03-01

## Pattern Overview

**Overall:** Angular Standalone Component Architecture with Service Layer

**Key Characteristics:**
- Standalone components (no NgModules)
- Signal-based reactivity (Angular 16+ signals pattern)
- Service-oriented business logic
- Library + Demo application monorepo structure
- Dependency injection with `inject()` pattern
- Lazy-loaded Mermaid library via dynamic imports

## Layers

**Presentation Layer (UI Components):**
- Purpose: Render UI and handle user interactions
- Location: `projects/ngx-mkd/src/lib/ngx-mkd.ts`, `projects/demo-ngx-mkd/src/app/app.ts`
- Contains: Angular components with standalone configuration
- Depends on: Services, DOM APIs
- Used by: End users, consuming applications

**Service Layer (Business Logic):**
- Purpose: Markdown parsing, HTML generation, external library integration
- Location: `projects/ngx-mkd/src/lib/markdown-render.service.ts`
- Contains: Injectable services with `providedIn: 'root'`
- Depends on: External libraries (marked, highlight.js, katex, mermaid)
- Used by: Components, external consumers

**Configuration Layer:**
- Purpose: Environment-specific settings and app configuration
- Location: `projects/demo-ngx-mkd/src/environments/`, `projects/demo-ngx-mkd/src/app/app.config.ts`
- Contains: Environment constants, Angular application config
- Depends on: None
- Used by: App bootstrap, feature components

## Data Flow

**Markdown Rendering Flow:**

1. **Input:** User provides markdown string via `NgxMkdComponent.markdown` input signal
2. **Process:** `NgxMkdComponent` calls `MarkdownRenderService.render()` 
3. **Parse:** `MarkdownRenderService` uses `Marked` library with KaTeX extension to parse markdown
4. **Transform:** Custom code block renderer generates HTML with syntax highlighting (highlight.js) and toolbar
5. **Sanitize:** `NgxMkdComponent` uses `DomSanitizer` to mark HTML as safe
6. **Render:** Sanitized HTML is bound to `[innerHTML]` of the template div
7. **Post-process:** Effect triggers `renderMermaid()` to process any mermaid blocks via lazy-loaded mermaid library

**Theme Switching Flow:**

1. **Trigger:** User clicks theme toggle button in demo app
2. **State Update:** `App.theme` signal is updated
3. **Side Effects:** `effect()` persists theme to localStorage, applies body classes, updates theme link elements
4. **Propagation:** Theme is passed to `NgxMkdComponent` as input, affecting mermaid diagram theme

## Key Abstractions

**MarkdownRenderService:**
- Purpose: Convert markdown strings to HTML with enhanced code blocks
- Location: `projects/ngx-mkd/src/lib/markdown-render.service.ts`
- Pattern: Singleton service with encapsulated parser configuration
- Key Methods: `render()`, `renderCodeBlock()`, `renderMermaidBlock()`, `highlightCode()`

**NgxMkdComponent:**
- Purpose: Angular component wrapper for markdown rendering with interactive features
- Location: `projects/ngx-mkd/src/lib/ngx-mkd.ts`
- Pattern: Standalone component with signal inputs and computed outputs
- Features: Copy-to-clipboard, mermaid rendering, theming support

**Theme Management:**
- Purpose: Runtime theme switching with persistence
- Location: `projects/demo-ngx-mkd/src/app/app.ts`
- Pattern: Signal-based state with localStorage persistence and ViewTransition API
- Features: Light/dark toggle, CSS injection, prefers-reduced-motion awareness

## Entry Points

**Demo Application:**
- Location: `projects/demo-ngx-mkd/src/main.ts`
- Triggers: Browser bootstrap via `bootstrapApplication()`
- Responsibilities: Initialize Angular app with config, mount root component

**Library Public API:**
- Location: `projects/ngx-mkd/src/public-api.ts`
- Triggers: Import by consuming applications
- Responsibilities: Export `NgxMkdComponent` and `MarkdownRenderService`

**Library Build Entry:**
- Location: `projects/ngx-mkd/ng-package.json` references `src/public-api.ts`
- Triggers: ng-packagr build process
- Responsibilities: Define library package structure

## Error Handling

**Strategy:** Graceful degradation with console.error logging

**Patterns:**
- Clipboard API availability checks before usage
- try/catch around async mermaid rendering
- Fallback to auto-detection for unknown languages in highlight.js
- ViewTransition API feature detection before animation

## Cross-Cutting Concerns

**Logging:** Console-based error logging for clipboard and mermaid failures

**Validation:** Language normalization (lowercase, alphanumeric sanitization) in `MarkdownRenderService.normalizeLanguage()`

**Security:**
- HTML sanitization via Angular's `DomSanitizer`
- XSS prevention through `escapeHtml()` helper
- Safe HTML binding only after sanitization

**Performance:**
- Mermaid library lazy-loaded on first use via dynamic `import()`
- Single promise cached for mermaid module
- ViewTransition API for smooth theme transitions

---

*Architecture analysis: 2025-03-01*
