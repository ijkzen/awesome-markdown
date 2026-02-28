# Research Summary: ngx-mkd

## Key Findings

### Stack
- **marked** for markdown parsing (v12+) — Fast, GFM support
- **github-markdown-css** for styling (v3+) — GitHub-native look
- **highlight.js** for syntax highlighting (v11+) — 190+ languages

### Table Stakes
- GFM markdown rendering
- GitHub-style visual appearance
- Code block syntax highlighting
- Language labels on code blocks
- Copy-to-clipboard

### Watch Out For
- **XSS**: Always sanitize HTML output
- **Theme conflicts**: Highlight.js themes may clash with github-markdown-css
- **Clipboard failures**: Provide fallbacks for older browsers
- **Memory**: Don't re-parse on every change detection

## Confidence
All recommendations are high confidence based on well-established libraries.

---
*Summary generated: 2026-03-01*
