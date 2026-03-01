---
status: investigating
trigger: "Clicking theme toggle switches between light and dark mode - right panel (preview) doesn't respond"
created: "2026-03-01T00:00:00.000Z"
updated: "2026-03-01T00:00:00.000Z"
---

## Current Focus
hypothesis: "The right panel's dark mode relies on deprecated ::ng-deep CSS selector which fails to penetrate Angular's component encapsulation"
test: "Verify that ::ng-deep styles are not being applied to the ngx-mkd component's internal .markdown-body class"
expecting: "If ::ng-deep is the issue, the .markdown-body won't receive dark mode styles when gh-dark class is applied"
next_action: "Write debug investigation to file and return root cause"

## Symptoms
expected: "Clicking theme toggle should switch BOTH left (source editor) AND right (preview) panels between light and dark modes simultaneously"
actual: "Default: light mode but right panel shows dark. Click toggle: left panel becomes dark, right panel doesn't change"
errors: []
reproduction: "Test 6 in UAT (Phase 04-demo-application) - Click theme toggle button"
started: "Discovered during UAT"

## Eliminated
- hypothesis: "isDark() signal not updating"
  evidence: "The signal updates correctly - left panel changes color, button icon changes"
  timestamp: "2026-03-01"
- hypothesis: "gh-dark class not being applied to preview-content div"
  evidence: "Template uses [class.gh-dark]=\"isDark()\" - class is applied when isDark() returns true"
  timestamp: "2026-03-01"
- hypothesis: "NgxMkdComponent has its own theme handling"
  evidence: "NgxMkdComponent has NO theme input - only 'markdown' input. Component imports github-markdown-css statically"
  timestamp: "2026-03-01"

## Evidence
- timestamp: "2026-03-01"
  checked: "app.ts - theme management"
  found: "Theme uses Angular signals: theme = signal<'light' | 'dark'>, isDark = computed(). Effect calls updateDarkClass() to add/remove gh-dark class on document.body"
  implication: "Signal-based state management works correctly"

- timestamp: "2026-03-01"
  checked: "app.html - template structure"
  found: "Left panel: <textarea class=\"markdown-input\"> - no conditional class. Right panel: <div class=\"preview-content\" [class.gh-dark]=\"isDark()\"> - uses [class.gh-dark] binding"
  implication: "CSS must drive the dark mode for both panels"

- timestamp: "2026-03-01"
  checked: "app.css - dark mode styles"
  found: "Left panel uses :host-context(.gh-dark) selectors (lines 122-133). Right panel uses .preview-content.gh-dark ::ng-deep .markdown-body (lines 140-180)"
  implication: "CRITICAL DIFFERENCE: Left panel uses :host-context which works reliably. Right panel uses deprecated ::ng-deep which fails with Angular's Emulated encapsulation"

- timestamp: "2026-03-01"
  checked: "ngx-mkd.ts - component encapsulation"
  found: "Component uses ViewEncapsulation.Emulated (line 33). Template renders <div class=\"markdown-body\">"
  implication: "Emulated encapsulation + ::ng-deep = style leakage often fails"

## Resolution
root_cause: "The right panel's dark mode styles use the deprecated ::ng-deep selector which fails to penetrate the NgxMkdComponent's Emulated view encapsulation. The component's .markdown-body is inside the lib-ngx-mkd element, and ::ng-deep styles from app.css cannot reach into it reliably. Meanwhile, the left panel works because it uses :host-context(.gh-dark) selectors which work with component encapsulation."
fix: "Add a theme input to NgxMkdComponent and pass isDark() from app.html, OR use CSS custom properties (variables) instead of ::ng-deep"
files_changed: []
