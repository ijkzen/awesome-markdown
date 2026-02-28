# Phase 1: Core Library Setup - Context

**Gathered:** 2026-03-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Set up the ngx-mkd Angular component with marked for markdown parsing and github-markdown-css for styling. This phase delivers a working markdown-to-HTML rendering component. Code highlighting and copy button are separate phases.

</domain>

<decisions>
## Implementation Decisions

### Input Binding
- Use `@Input() markdown: string` property binding
- Input name: `markdown`
- Type: `string` only (required)
- Re-renders when input changes

### Marked Options
- GFM enabled (tables, task lists, strikethrough)
- Breaks enabled (single newlines become `<br>`)
- Sanitize: No (Angular's DomSanitizer handles security separately)

### CSS Approach
- Apply `markdown-body` class via wrapper div
- ViewEncapsulation: Emulated
- Component imports github-markdown-css (not consumer's responsibility)

### Change Detection
- Strategy: OnPush
- Reactive: Signal-based
- HTML generation: `computed()` that re-computes when markdown signal changes

### Claude's Discretion
- Exact CSS wrapper element styling
- Where to place the import statement for github-markdown-css
- Whether to use synchronous or lazy loading for the CSS

</decisions>

<specifics>
## Specific Ideas

- "I want it to feel like GitHub's markdown preview"
- Component should be drop-in ready with minimal setup

</specifics>

# Existing Code Insights

### Reusable Assets
- NgxMkd component already exists at `projects/ngx-mkd/src/lib/ngx-mkd.ts`
- public-api.ts exports from `./lib/ngx-mkd`
- Demo app exists at `projects/demo-ngx-mkd/`

### Established Patterns
- Angular standalone components with imports array
- signal() for reactive state
- Modern Angular patterns (no NgModules needed)

### Integration Points
- Demo app can import NgxMkd directly
- Component will accept markdown via property binding: `<lib-ngx-mkd [markdown]="content" />`

</code_context>

<deferred>
## Deferred Ideas

- Code highlighting (Phase 2)
- Copy button functionality (Phase 3)
- Theme switching in demo app (Phase 4)

</deferred>

---

*Phase: 01-core-library-setup*
*Context gathered: 2026-03-01*
