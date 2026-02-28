# ngx-mkd

## What This Is

A Markdown rendering component library for Angular applications. The library (`ngx-mkd`) converts Markdown source text to HTML for display, while the demo application (`demo-ngx-mkd`) showcases its capabilities.

## Core Value

Provide a drop-in Angular component that renders Markdown with GitHub-style styling and syntax-highlighted code blocks.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] ngx-mkd: Use marked for markdown to HTML conversion with GFM enabled
- [ ] ngx-mkd: Integrate github-markdown-css for GitHub-style rendering with theme support
- [ ] ngx-mkd: Integrate highlight.js for code block syntax highlighting with theme support
- [ ] ngx-mkd: Display language label in top-left of code blocks (default to "text")
- [ ] ngx-mkd: Add Copy button to top-right of code blocks with "Copied" feedback
- [ ] demo-ngx-mkd: Layout with fixed header bar (title left, theme toggle right)
- [ ] demo-ngx-mkd: Theme toggle switches between light/dark (default light)
- [ ] demo-ngx-mkd: Left panel shows markdown source with independent scroll
- [ ] demo-ngx-mkd: Right panel shows rendered HTML with independent scroll

### Out of Scope

- Multi-file markdown support
- Custom markdown parser configurations beyond GFM
- Mobile-specific layouts (responsive only)

## Context

- Angular monorepo with two projects: `ngx-mkd` (library) and `demo-ngx-mkd` (application)
- Uses Angular with standalone components
- Dependencies to install: marked, github-markdown-css, highlight.js

## Constraints

- **Tech Stack**: Angular, marked, github-markdown-css, highlight.js
- **Angular Version**: Latest (standalone components)
- **Styling**: CSS-based theming for github-markdown-css

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Use marked for parsing | Well-maintained, GFM support, extensible | — Pending |
| Use github-markdown-css | Native GitHub look and feel | — Pending |
| Use highlight.js for code highlighting | Wide language support, auto-detection | — Pending |
| Copy button with 2s feedback | Standard UX pattern | — Pending |

---
*Last updated: 2026-03-01 after initialization*
