# Phase 1: Core Library Setup - Research

**Researched:** 2026-03-01
**Domain:** Angular Markdown Rendering Component
**Confidence:** HIGH

<user_constraints>
## User Constraints (from CONTEXT.md)

**CRITICAL:** Locked decisions from discussion:

### Locked Decisions
- Input: `@Input() markdown: string` (required string only)
- GFM enabled, breaks enabled
- CSS: Wrapper div with `markdown-body` class
- ViewEncapsulation: Emulated
- Component imports github-markdown-css
- Change Detection: OnPush with signal-based `computed()` for HTML generation

### Claude's Discretion
- Exact CSS wrapper element styling
- Where to place import for github-markdown-css
- Whether to use synchronous or lazy loading for CSS

### Deferred Ideas (OUT OF SCOPE)
- Code highlighting (Phase 2)
- Copy button functionality (Phase 3)
- Theme switching in demo app (Phase 4)

</user_constraints>

<research_summary>
## Summary

Built ngx-mkd component using marked for parsing and github-markdown-css for styling. Key findings:

- **marked** is the standard choice - fast, extensible, full GFM support
- **github-markdown-css** provides GitHub-native styling via `markdown-body` class
- Angular best practice: use signal inputs (`input()`) with `computed()` for reactive transformations
- **Security**: marked does NOT sanitize - must use Angular's DomSanitizer
- CSS import via `@import` in component or via angular.json styles

**Primary recommendation:** Use `marked.parse()` in a `computed()` signal, apply `markdown-body` class to wrapper div, use Angular's `DomSanitizer` to bypass security for trusted content.

</research_summary>

<standard_stack>
## Standard Stack

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| marked | ^15.0.0 | Markdown to HTML parser | Fast, GFM support, extensible |
| github-markdown-css | ^3.0.0 | GitHub-native styling | Official GitHub look |
| @angular/core | Latest | Component framework | Required for Angular |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| marked | markdown-it | More features but larger bundle |
| marked | remark | AST-based, more complex |
| github-markdown-css | Custom CSS | More control but more work |
| Prism.js | highlight.js | Less auto-detection |

**Installation:**
```bash
npm install marked github-markdown-css
```

</standard_stack>

<architecture_patterns>
## Architecture Patterns

### Signal-Based Input Pattern
```typescript
import { input, computed, Component, ViewEncapsulation } from '@angular/core';
import { marked } from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'lib-ngx-mkd',
  standalone: true,
  encapsulation: ViewEncapsulation.Emulated,
  imports: [],
  template: `
    <div class="markdown-body" [innerHTML]="renderedHtml()"></div>
  `
})
export class NgxMkdComponent {
  // Signal input (Angular 17.1+)
  markdown = input.required<string>();
  
  // Computed derived value
  renderedHtml = computed(() => {
    return marked.parse(this.markdown()) as string;
  });
  
  constructor(private sanitizer: DomSanitizer) {}
  
  // For innerHTML binding
  getSafeHtml(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.renderedHtml());
  }
}
```

### Marked Configuration
```typescript
import { marked } from 'marked';

marked.use({
  gfm: true,
  breaks: true
});
```

### CSS Import Options
1. **Component-level** (recommended for library):
   ```typescript
   import 'github-markdown-css/github-markdown.css';
   ```
2. **angular.json styles array** (for app):
   ```json
   "styles": ["node_modules/github-markdown-css/github-markdown.css"]
   ```

</architecture_patterns>

<dont_hand_roll>
## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Markdown parsing | Custom regex parser | marked | Edge cases, GFM support |
| HTML sanitization | Custom escape | DomSanitizer.bypassSecurityTrustHtml | XSS prevention |
| Syntax highlighting | Custom tokenizer | highlight.js | 190+ languages |

</dont_hand_roll>

<common_pitfalls>
## Common Pitfalls

### Pitfall 1: XSS Vulnerabilities
**What goes wrong:** User-provided markdown with `<script>` tags executes
**Why it happens:** marked doesn't sanitize by default
**How to avoid:** Use DomSanitizer for trusted content, or DOMPurify for untrusted
**Warning signs:** Using innerHTML without sanitization

### Pitfall 2: CSS Not Loading
**What goes wrong:** Markdown renders without GitHub styling
**Why it happens:** github-markdown-css not imported or class not applied
**How to avoid:** Import CSS and add `markdown-body` class to wrapper div
**Warning signs:** Plain unstyled HTML output

### Pitfall 3: Signal Not Reacting
**What goes wrong:** Component doesn't re-render when input changes
**Why it happens:** Using `input()` but not `computed()` for derived values
**How to avoid:** Use `computed()` to derive HTML from input signal
**Warning signs:** Static output despite input changes

</common_pitfalls>

<code_examples>

## Complete Component Example

```typescript
import { Component, input, computed, ViewEncapsulation } from '@angular/core';
import { marked } from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import 'github-markdown-css/github-markdown.css';

@Component({
  selector: 'lib-ngx-mkd',
  standalone: true,
  encapsulation: ViewEncapsulation.Emulated,
  imports: [],
  template: `
    <div class="markdown-body" [innerHTML]="safeHtml()"></div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class NgxMkdComponent {
  // Required signal input
  markdown = input.required<string>();
  
  // Computed HTML - re-runs when markdown changes
  renderedHtml = computed(() => {
    return marked.parse(this.markdown(), {
      gfm: true,
      breaks: true
    }) as string;
  });
  
  constructor(private sanitizer: DomSanitizer) {}
  
  // Sanitize for innerHTML binding
  safeHtml(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.renderedHtml());
  }
}
```

</code_examples>

---

*Research completed: 2026-03-01*
