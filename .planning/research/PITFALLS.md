# Pitfalls Research: ngx-mkd

## Common Mistakes

### 1. XSS Vulnerabilities
**Warning Signs**: User-provided markdown rendered without sanitization
**Prevention**: Always use Angular's DomSanitizer
**Phase to Address**: Phase 1

### 2. Unstyled Content Flash
**Warning Signs**: Raw HTML visible before CSS loads
**Prevention**: Use Angular's ngStyle or initial styles
**Phase to Address**: Phase 1

### 3. Highlight.js Theme Conflicts
**Warning Signs**: Code blocks look wrong with github-markdown-css
**Prevention**: Use compatible theme, scope styles properly
**Phase to Address**: Phase 2

### 4. Clipboard API Failures
**Warning Signs**: Copy button doesn't work in some browsers
**Prevention**: Fallback to execCommand, handle errors gracefully
**Phase to Address**: Phase 3

### 5. Memory Leaks
**Warning Signs**: Re-parsing large markdown repeatedly
**Prevention**: Memoize parsed content, clean up on destroy
**Phase to Address**: Phase 1

### 6. Missing Language Detection
**Warning Signs**: All code blocks show "text"
**Prevention**: Configure highlight.js with auto-detection
**Phase to Address**: Phase 2

---
*Research completed: 2026-03-01*
