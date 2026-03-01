# Coding Conventions

**Analysis Date:** 2025-03-01

## Naming Patterns

**Files:**
- Component files: Named by selector (e.g., `ngx-mkd.ts`, not `ngx-mkd.component.ts`)
- Service files: `*.service.ts` (e.g., `markdown-render.service.ts`)
- Test files: Co-located as `*.spec.ts` (e.g., `ngx-mkd.spec.ts`)
- CSS files: Component styles use `*.component.css`
- Configuration: `tsconfig.*.json`, `*.config.ts`

**Functions/Methods:**
- Use camelCase for all function names
- Private methods prefixed with underscore not used; use `private` access modifier
- Async functions use `async` keyword (e.g., `async copyCodeToClipboard()`)
- Protected methods for template access (e.g., `protected onHostClick()`)

**Variables:**
- camelCase for variables and properties
- `readonly` for immutable properties
- Signals use descriptive names: `markdown`, `theme`, `isDark`
- Private signals/services: prefixed with descriptive name, not underscore (e.g., `private readonly markdownRenderService`)
- Constants use UPPER_SNAKE_CASE (e.g., `SAMPLE_MARKDOWN`)

**Types:**
- Classes use PascalCase (e.g., `NgxMkdComponent`, `MarkdownRenderService`)
- Interfaces use PascalCase with descriptive names
- Type aliases use PascalCase (e.g., `ViewTransitionDocument`)

## Code Style

**Formatting:**
- Tool: Prettier (configured in `package.json`)
- Print width: 100 characters
- Single quotes: enforced
- HTML parser: Angular-specific formatting
- Indent: 2 spaces (from `.editorconfig`)
- TypeScript: Single quotes enforced

**TypeScript Strictness:**
- Strict mode enabled in `tsconfig.json`
- `noImplicitOverride`: Required for overridden methods
- `noPropertyAccessFromIndexSignature`: Enforces bracket notation
- `noImplicitReturns`: All code paths must return
- `noFallthroughCasesInSwitch`: Prevents switch fallthrough
- `isolatedModules`: Ensures file can be transpiled independently

**Angular Compiler Options:**
- `strictInjectionParameters`: Enforces proper DI usage
- `strictInputAccessModifiers`: Enforces input access modifiers
- `strictTemplates`: Strict template type checking

## Import Organization

**Order (observed pattern):**
1. Angular core/framework imports
2. Third-party library imports
3. Local module/project imports
4. Relative imports (last)

**Path Aliases:**
- Library uses path mapping: `"ngx-mkd"` → `"./dist/ngx-mkd"`
- Internal imports use relative paths: `./lib/markdown-render.service`

**Import Style:**
- Prefer named imports from Angular (`import { Component } from '@angular/core'`)
- Use `import type` when only types are needed

## Error Handling

**Patterns:**
- Use `try/catch` for async operations (clipboard operations)
- Log errors to console with descriptive messages: `console.error('Failed to copy code block:', error)`
- Graceful fallbacks (e.g., auto-highlight if language not found)
- Optional chaining for safe property access: `navigator.clipboard?.writeText`
- Guard clauses for early returns

**Service Error Handling:**
```typescript
// Return empty string on parse failure (implicit - Marked returns string)
render(markdown: string): string {
  const parsed = this.markdownParser.parse(markdown);
  return typeof parsed === 'string' ? parsed : '';
}
```

## Logging

**Framework:** Native `console` (no logging library detected)

**Patterns:**
- Use `console.error()` for actual errors (clipboard failures, mermaid rendering)
- No debug/info logging in production code
- Keep error messages descriptive and actionable

## Comments

**When to Comment:**
- CSS files: Explain scope and purpose
- Complex logic: Brief explanation of "why"
- Public API: Document intent and usage

**Block Comments (CSS):**
```css
/*
 * Structural CSS for ngx-mkd library
 * 
 * This file provides ONLY structural/layout styles.
 */
```

**JSDoc/TSDoc:**
- Not heavily used in this codebase
- Public API exports documented in README files instead

## Function Design

**Size:** Keep functions focused and under 30 lines where possible

**Parameters:**
- Use destructuring for complex parameters
- Optional parameters use `?` syntax
- Default values provided where appropriate

**Return Values:**
- Explicit return types on computed signals: `computed<SafeHtml>()`
- Void returns for side-effect functions

## Module Design

**Component Structure:**
- Standalone components: `standalone: true`
- Dependency injection via `inject()` function (modern Angular pattern)
- Use signals for reactive state (`signal()`, `computed()`, `effect()`)
- `ViewEncapsulation.None` for library components with innerHTML content

**Service Structure:**
- Injectable with `providedIn: 'root'`
- Stateless services where possible
- Pure functions for rendering logic

**Exports:**
- Public API defined in `public-api.ts`
- Barrel file pattern: re-exports from lib directory

## CSS Conventions

**Selector Naming:**
- BEM-like naming: `.code-block-wrapper`, `.code-copy-button`
- Library selectors prefixed with element name: `lib-ngx-mkd .code-block-wrapper`

**File Organization:**
- Structural styles only in library CSS
- Theme/colors handled by consumer
- Host styles use `:host` selector

---

*Convention analysis: 2025-03-01*
