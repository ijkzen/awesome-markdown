# Architecture Research: ngx-mkd

## Component Structure

```
ngx-mkd (library)
├── markdown.component.ts    # Main rendering component
├── markdown.module.ts       # Module definition
├── services/
│   └── markdown.service.ts  # Parsing service
└── styles/
    └── markdown.css         # Component-specific styles

demo-ngx-mkd (application)
├── app.component.ts        # Main layout (header + panels)
├── pages/
│   └── home/
│       └── home.component.ts
└── themes/
    ├── light.css
    └── dark.css
```

## Data Flow

1. Markdown source → `MarkdownService.parse()` → HTML string
2. HTML string → Highlight.js → HTML with syntax classes
3. Styled HTML → Angular component → Sanitized DOM

## Suggested Build Order

1. **Phase 1**: ngx-mkd library core (marked + basic rendering)
2. **Phase 2**: Code highlighting (highlight.js + language labels)
3. **Phase 3**: Copy button functionality
4. **Phase 4**: demo-ngx-mkd layout + theme toggle

## Component Boundaries

- **Library**: Pure presentation, no app-specific logic
- **Demo App**: Theme state, layout, sample content
- Clear separation allows library to be published independently

---
*Research completed: 2026-03-01*
