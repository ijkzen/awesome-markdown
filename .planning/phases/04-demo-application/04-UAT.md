---
status: diagnosed
phase: 04-demo-application
source: 04-01-SUMMARY.md
started: 2026-03-01T06:15:00Z
updated: 2026-03-01T06:35:00Z
---

## Current Test

[testing complete]

## Tests

### 1. Split-pane layout renders
expected: Two panels side-by-side: left shows markdown source, right shows rendered HTML preview
result: pass

### 2. Fixed header with title
expected: Header bar is fixed at top, title "ngx-mkd" appears on the left side of header
result: pass

### 3. Theme toggle button
expected: Theme toggle button appears on the right side of header (sun/moon icon)
result: pass

### 4. Editable source panel
expected: Left panel is an editable textarea where you can type markdown
result: pass

### 5. Live preview updates
expected: Typing in the left panel updates the preview in the right panel in real-time
result: pass

### 6. Theme toggle works
expected: Clicking theme toggle switches between light and dark mode
result: issue
reported: "默认情况是亮色模式,但是右边显示暗色;点击按钮切换主题左边变暗,但是右侧没有变化"
severity: major

### 7. Theme persistence
expected: Refreshing the page remembers your theme preference (if previously toggled)
result: pass

### 8. Code highlighting
expected: Code blocks in the sample content show syntax highlighting with language labels
result: issue
reported: "copy 按钮并没展示在代码块的右上角,它展示在语言标签旁边;代码高亮也没有跟随主题变化"
severity: major

### 9. GFM table renders
expected: Sample content includes a table that renders correctly in the preview
result: pass

### 10. Independent scrolling
expected: Each panel scrolls independently without affecting the other
result: pass

## Summary

total: 10
passed: 8
issues: 2
pending: 0
skipped: 0

## Gaps

- truth: "Clicking theme toggle switches between light and dark mode"
  status: failed
  reason: "User reported: 默认情况是亮色模式,但是右边显示暗色;点击按钮切换主题左边变暗,但是右侧没有变化"
  severity: major
  test: 6
  root_cause: "::ng-deep fails to penetrate NgxMkdComponent's ViewEncapsulation.Emulated. The right panel uses .preview-content.gh-dark ::ng-deep .markdown-body which cannot reach the component's internal DOM."
  artifacts:
    - path: "projects/demo-ngx-mkd/src/app/app.css"
      issue: "Uses deprecated ::ng-deep selector that fails with Emulated encapsulation"
    - path: "projects/ngx-mkd/src/lib/ngx-mkd.ts"
      issue: "Uses ViewEncapsulation.Emulated, no theme input to receive dark mode state"
  missing:
    - "Add theme input to NgxMkdComponent"
    - "Use CSS custom properties (CSS variables) instead of ::ng-deep"
  debug_session: .planning/debug/theme-toggle-issue.md

- truth: "Code blocks in the sample content show syntax highlighting with language labels"
  status: failed
  reason: "User reported: copy 按钮并没展示在代码块的右上角,它展示在语言标签旁边;代码高亮也没有跟随主题变化"
  severity: major
  test: 8
  root_cause: "Two issues: 1) CSS z-index conflict - copy-button lacks z-index so appears next to language label; 2) Static highlight.js import (github.css) with no theme switching mechanism"
  artifacts:
    - path: "projects/ngx-mkd/src/lib/ngx-mkd.ts"
      issue: "Line 7: static import of highlight.js styles/github.css, no theme switching"
      issue: "Lines 44-68: Missing z-index on .copy-button and .code-lang"
  missing:
    - "Add z-index: 2 to .copy-button, z-index: 1 to .code-lang"
    - "Add theme input to ngx-mkd OR use CSS overrides in demo for dark syntax colors"
  debug_session: .planning/debug/code-highlighting-issue.md
