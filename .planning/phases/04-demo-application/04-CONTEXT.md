# Phase 4: Demo Application - Context

**Gathered:** 2026-03-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Build a demo Angular application (demo-ngx-mkd) showcasing the ngx-mkd library with a split-pane layout: fixed header bar with title and theme toggle, left panel for markdown source (editable), right panel for live rendered preview. Theme toggles between light (default) and dark mode using github-markdown-css classes.

</domain>

<decisions>
## Implementation Decisions

### Theme Switching
- Toggle mechanism: Wrapper class toggle — add/remove `.gh-dark` class on the `.markdown-body` wrapper
- Toggle button: Icon only (sun/moon icons), compact and universal
- State persistence: LocalStorage to remember user's theme preference
- Initial theme: Always start light (per requirements "default theme is light mode")

### Layout Implementation
- Layout approach: Tailwind Grid — using `grid` with row template
- Panel proportions: 50/50 equal split
- Header height: 56px (h-14) — compact, standard app bar
- Scrolling: Independent scroll for each panel (per requirement LAYO-07)

### Markdown Source Panel
- Panel type: Editable textarea — users can type markdown and see live preview
- Update behavior: Debounced 300ms — waits for user to pause typing before updating preview
- Textarea styling: Monospace font — code-editor feel
- Initial content: Rich sample markdown pre-filled (not placeholder)

### Sample Content
- Content scope: Full feature demo — showcases all library capabilities
- Code blocks: Variety of programming languages (JavaScript, Python, TypeScript, HTML, CSS) to demonstrate syntax highlighting
- Additional features: Include a GFM table to show table rendering
- Length: Moderate (40-60 lines) — enough to demonstrate without being overwhelming

</decisions>

<specifics>
## Specific Ideas

- Theme toggle follows GitHub's pattern — sun icon for light, moon icon for dark
- Two-panel 50/50 split for easy side-by-side comparison
- Sample markdown includes multiple code languages to showcase highlight.js
- Editable source panel with debounce provides interactive "live preview" feel

</specifics>

<code_context>
## Existing Code Insights

### Reusable Assets
- NgxMkdComponent at `projects/ngx-mkd/src/lib/ngx-mkd.ts` — fully functional markdown rendering with code highlighting and copy button
- github-markdown-css imported and available
- highlight.js already integrated with github.css theme
- Tailwind CSS v4 configured in demo app

### Established Patterns
- Component uses Angular signals (input signals, computed)
- ViewEncapsulation.Emulated with inline styles
- Uses marked renderer for code block customization

### Integration Points
- App component at `projects/demo-ngx-mkd/src/app/app.ts` — needs layout and theme toggle added
- Styles at `projects/demo-ngx-mkd/src/styles.css` — Tailwind already imported

</code_context>

<deferred>
## Deferred Ideas

- None — all discussion stayed within phase scope

</deferred>

---

*Phase: 04-demo-application*
*Context gathered: 2026-03-01*
