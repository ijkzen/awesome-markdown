---
status: resolved
trigger: "Code blocks in the sample content show syntax highlighting with language labels"
created: 2026-03-01T06:30:00Z
updated: 2026-03-01T06:30:00Z
---

## Current Focus
<!-- OVERWRITE on each update - reflects NOW -->

hypothesis: Root cause identified for both issues
test: Code analysis of ngx-mkd.ts and app.css
expecting: N/A - investigation complete
next_action: Return root cause findings

## Symptoms
<!-- Written during gathering, then IMMUTABLE -->

expected: |
  1. Code blocks should show syntax highlighting that follows the theme (light/dark)
  2. Copy button should appear in the top-right corner of code blocks

actual: |
  1. Copy button appears next to the language label, not in top-right corner
  2. Syntax highlighting doesn't follow theme changes (always shows light theme colors)

errors: |
  N/A - No error messages, visual/layout issues

reproduction: Test 8 in UAT (Phase 04-demo-application)

started: Discovered during UAT testing

## Eliminated
<!-- APPEND only - prevents re-investigating -->

- hypothesis: "ViewEncapsulation prevents styles from applying to innerHTML"
  evidence: User reports copy button IS visible (just wrong position), so styles ARE applying
  timestamp: 2026-03-01T06:30:00Z

## Evidence
<!-- APPEND only - facts discovered -->

- timestamp: 2026-03-01T06:30:00Z
  checked: projects/ngx-mkd/src/lib/ngx-mkd.ts (lines 40-89)
  found: |
    Copy button CSS uses position: absolute with top: 0 and right: 0.
    Code lang CSS uses position: absolute with top: 0 and left: 0.
    Both are in .code-block-wrapper with position: relative.
  implication: CSS appears correct for top-right positioning

- timestamp: 2026-03-01T06:30:00Z
  checked: projects/ngx-mkd/src/lib/ngx-mkd.ts (line 7)
  found: |
    Import: import 'highlight.js/styles/github.css';
    This is a STATIC import - always loads the same light theme CSS.
  implication: Syntax highlighting cannot change with theme because the CSS file is hardcoded

- timestamp: 2026-03-01T06:30:00Z
  checked: projects/demo-ngx-mkd/src/app/app.ts and app.html
  found: |
    App component has theme state (isDark() signal) and applies gh-dark class.
    The ngx-mkd component is used with [class.gh-dark]="isDark()" passed via parent.
    But ngx-mkd component does NOT accept any theme-related input.
  implication: No mechanism to pass theme state to ngx-mkd for highlight.js styling

- timestamp: 2026-03-01T06:30:00Z
  checked: projects/ngx-mkd/src/lib/ngx-mkd.ts (lines 17-21)
  found: |
    HTML structure in renderer.code function:
    <div class="code-block-wrapper">
      <span class="code-lang">${language}</span>
      <button class="copy-button">Copy</button>
      <pre><code>...</code></pre>
    </div>
  implication: Both absolute elements are inside the same wrapper

## Resolution
<!-- OVERWRITE as understanding evolves -->

root_cause: |
  Issue 1 (Copy button position): CSS z-index conflict. The .code-lang element has no z-index specified while .copy-button also has no z-index. Due to DOM order, .code-lang appears on top of .copy-button, making it appear "next to" the language label when they overlap. Need to add z-index: 1 to .code-lang and z-index: 2 to .copy-button (or similar).

  Issue 2 (Theme-aware syntax highlighting): The highlight.js theme CSS is statically imported in ngx-mkd.ts (line 7): import 'highlight.js/styles/github.css'. This always loads the light theme. There is no mechanism to switch to a dark theme (e.g., 'github-dark.css') when the app theme changes.

fix: |
  Issue 1: Add z-index to CSS in ngx-mkd.ts:
  - .code-lang { z-index: 1; }
  - .copy-button { z-index: 2; }

  Issue 2: Two possible fixes:
  A) ngx-mkd accepts theme input and dynamically loads appropriate highlight.js CSS
  B) Demo app handles theme switching by adding/removing a class on lib-ngx-mkd that uses ::ng-deep to override highlight.js colors

files_changed: []
