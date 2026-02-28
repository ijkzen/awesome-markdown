# Phase 1: Core Library Setup - Plan

**Planned:** 2026-03-01
**Phase:** 1
**Goal:** Set up ngx-mkd with marked and github-markdown-css

---

## Task 1.1: Install Dependencies

**Description:** Install marked and github-markdown-css packages

**Requirements:**
- CORE-01, CORE-02, CORE-03

**Steps:**
1. Run `npm install marked github-markdown-css` in the root directory
2. Verify packages are added to package.json

**Verification:**
- Check package.json for marked and github-markdown-css entries

---

## Task 1.2: Update NgxMkd Component

**Description:** Update the NgxMkd component with signal-based input and marked integration

**Requirements:**
- CORE-01, CORE-02, CORE-03

**Steps:**
1. Read current component at `projects/ngx-mkd/src/lib/ngx-mkd.ts`
2. Update component:
   - Add `input.required<string>()` for markdown input
   - Add `computed()` for rendered HTML
   - Configure marked with `gfm: true` and `breaks: true`
   - Add `DomSanitizer` for safe HTML binding
   - Import `github-markdown-css/github-markdown.css`
   - Use `ViewEncapsulation.Emulated`
   - Template: wrapper div with `markdown-body` class and `[innerHTML]`

**Code Structure:**
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
  template: `<div class="markdown-body" [innerHTML]="safeHtml()"></div>`
})
export class NgxMkdComponent {
  markdown = input.required<string>();
  
  renderedHtml = computed(() => {
    return marked.parse(this.markdown(), { gfm: true, breaks: true }) as string;
  });
  
  constructor(private sanitizer: DomSanitizer) {}
  
  safeHtml(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.renderedHtml());
  }
}
```

**Verification:**
- Component compiles without errors

---

## Task 1.3: Verify Component in Demo App

**Description:** Test the component in the demo application

**Requirements:**
- CORE-01, CORE-03

**Steps:**
1. Update demo-ngx-mkd to import and use NgxMkdComponent
2. Add sample markdown content to test rendering
3. Build the application to verify it works

**Verification:**
- `npm run build` or `ng build` completes successfully
- Demo app renders markdown with GitHub styling

---

## Success Criteria

1. ✓ MarkdownComponent can receive markdown string input
2. ✓ Marked parses markdown with GFM enabled
3. ✓ Output applies github-markdown-css body class

---

*Plan created: 2026-03-01*
