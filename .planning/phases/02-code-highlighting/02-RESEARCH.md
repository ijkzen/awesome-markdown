# Phase 2: Code Highlighting - Research

**Researched:** 2026-03-01
**Domain:** Code Syntax Highlighting with highlight.js
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

**CRITICAL:** Locked decisions from discussion:

### Locked Decisions
- Use highlight.js for syntax highlighting
- Language label in top-left of code blocks
- Default to "text" when no language specified
- Auto-detect language when specified

### Claude's Discretion
- Exact CSS styling for language label
- Which highlight.js theme to use
- Positioning of label within code block

### Deferred Ideas (OUT OF SCOPE)
- Copy button functionality (Phase 3)
- Theme switching in demo app (Phase 4)

</user_constraints>

<research_summary>
## Summary

Integrate highlight.js for syntax highlighting using `marked-highlight` package. This is the official marked extension for code highlighting. Key findings:

- **marked-highlight** is the recommended way to integrate highlight.js with marked
- Use custom renderer to add language labels to code blocks
- Default language is "text" when no language specified
- highlight.js auto-detects when language is specified

**Primary recommendation:** Use `marked-highlight` with highlight.js, implement custom renderer for language labels.

</research_summary>

<standard_stack>
## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| marked-highlight | ^2.1.0 | Marked extension for highlighting | Official marked extension |
| highlight.js | ^11.9.0 | Syntax highlighting | 190+ languages |
| marked | ^15.0.0 | Already installed in Phase 1 | Required |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| marked-highlight | Custom renderer | More work, less maintainable |
| highlight.js | Prism.js | Less auto-detection |

**Installation:**
```bash
npm install marked-highlight highlight.js
```

</standard_stack>

<architecture_patterns>
## Architecture Patterns

### Basic highlight.js Integration
```typescript
import { marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';

marked.use(markedHighlight({
  langPrefix: 'hljs language-',
  highlight(code, lang) {
    const language = hljs.getLanguage(lang) ? lang : 'plaintext';
    return hljs.highlight(code, { language }).value;
  }
}));
```

### Language Label with Custom Renderer
```typescript
import { marked, Renderer } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';

const renderer = new Renderer();

renderer.code = function({ text, lang }) {
  const language = lang || 'text';
  const highlighted = hljs.getLanguage(language) 
    ? hljs.highlight(text, { language }).value 
    : hljs.highlight(text, { language: 'plaintext' }).value;
  
  return `<div class="code-block">
    <span class="code-lang">${language}</span>
    <pre><code class="hljs language-${language}">${highlighted}</code></pre>
  </div>`;
};

marked.use({ renderer });
```

</architecture_patterns>

<dont_hand_roll>
## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Code highlighting | Custom regex tokenizer | marked-highlight | Edge cases, language support |
| Language detection | Custom heuristics | highlight.js auto-detect | 190+ languages |

</dont_hand_roll>

<common_pitfalls>
## Common Pitfalls

### Pitfall 1: Language Not Found
**What goes wrong:** Code doesn't highlight when language is invalid
**Why it happens:** Passing unknown language to highlight.js
**How to avoid:** Use `hljs.getLanguage(lang) ? lang : 'plaintext'`
**Warning signs:** No highlighting applied

### Pitfall 2: Theme Conflicts
**What goes wrong:** Code blocks look wrong with github-markdown-css
**Why it happens:** highlight.js theme clashes with markdown CSS
**How to avoid:** Use compatible theme, check both light/dark
**Warning signs:** Code block styling looks broken

### Pitfall 3: Empty Language Label
**What goes wrong:** Language label shows empty or undefined
**Why it happens:** Not handling undefined/null language
**How to avoid:** Default to "text" when no language specified

</common_pitfalls>

<code_examples>

## Complete Integration Example

```typescript
import { Component, input, computed, ViewEncapsulation, Renderer2, RendererStyleFlags2 } from '@angular/core';
import { marked, Renderer } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import 'github-markdown-css/github-markdown.css';
import 'highlight.js/styles/github.css'; // or your preferred theme

@Component({
  selector: 'lib-ngx-mkd',
  standalone: true,
  encapsulation: ViewEncapsulation.Emulated,
  imports: [],
  template: `<div class="markdown-body" [innerHTML]="safeHtml()"></div>`,
  styles: [`
    :host { display: block; }
    .code-block { position: relative; }
    .code-lang {
      position: absolute;
      top: 0;
      left: 0;
      padding: 4px 8px;
      font-size: 12px;
      color: #6e7781;
      background: #f6f8fa;
      border-bottom-right-radius: 4px;
    }
  `]
})
export class NgxMkdComponent {
  markdown = input.required<string>();

  constructor(private sanitizer: DomSanitizer) {
    // Configure marked with highlight.js
    marked.use(markedHighlight({
      langPrefix: 'hljs language-',
      highlight(code, lang) {
        const language = lang && hljs.getLanguage(lang) ? lang : 'plaintext';
        const result = hljs.highlight(code, { language });
        return result.value;
      }
    }));
  }

  renderedHtml = computed(() => {
    return marked.parse(this.markdown(), { gfm: true, breaks: true }) as string;
  });

  safeHtml(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.renderedHtml());
  }
}
```

### Language Label Approach (Alternative)

To add language labels, we need a custom renderer that wraps code blocks:

```typescript
// Custom renderer for language labels
const renderer = new Renderer();

renderer.code = function({ text, lang }) {
  const language = lang || 'text';
  const highlighted = hljs.highlight(text, { 
    language: hljs.getLanguage(language) ? language : 'plaintext' 
  }).value;
  
  return `<div class="code-block-wrapper">
    <div class="code-lang-label">${language}</div>
    <pre><code class="hljs language-${language}">${highlighted}</code></pre>
  </div>`;
};

marked.use({ renderer });
```

</code_examples>

---

*Research completed: 2026-03-01*
