# Stack Research: ngx-mkd

## Technology Choices

### Markdown Parser

**marked** (v12+)
- Status: Recommended
- Rationale: Fast, extensible, full GFM support, widely used
- Alternatives considered: markdown-it, remark
- Confidence: High

### Styling

**github-markdown-css** (v3+)
- Status: Recommended
- Rationale: Official GitHub styling, theme support via CSS variables
- Alternatives: Custom CSS, other markdown CSS libraries
- Confidence: High

### Syntax Highlighting

**highlight.js** (v11+)
- Status: Recommended
- Rationale: 190+ languages, auto-detection, multiple themes
- Alternatives: Prism.js, Shiki
- Confidence: High

### Angular Integration

- Standalone components (Angular 14+)
- Component input for markdown source
- OnPush change detection for performance
- Sanitize HTML output

## Version Recommendations

```json
{
  "marked": "^12.0.0",
  "github-markdown-css": "^3.0.0",
  "highlight.js": "^11.9.0"
}
```

## What NOT to Use

- **remark/remark-parse**: Too complex for simple GFM needs
- **Prism.js**: Less auto-detection, fewer languages than highlight.js
- **marked-extensions**: Not needed for core GFM functionality

---
*Research completed: 2026-03-01*
