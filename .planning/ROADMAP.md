# Roadmap: ngx-mkd

**Created:** 2026-03-01
**Phases:** 4

## Phase Overview

| # | Phase | Goal | Requirements | Success Criteria |
|---|-------|------|--------------|------------------|
| 1 | Core Library Setup | Set up ngx-mkd with marked and github-markdown-css | CORE-01, CORE-02, CORE-03 | 3 |
| 2 | Code Highlighting | Add highlight.js with language labels | CODE-01, CODE-02, CODE-03, CODE-04 | 4 |
| 3 | Copy Button | Implement copy-to-clipboard for code blocks | COPY-01, COPY-02, COPY-03, COPY-04, COPY-05 | 5 |
| 4 | Demo Application | Build demo-ngx-mkd with layout and theming | LAYO-01, LAYO-02, LAYO-03, LAYO-04, LAYO-05, LAYO-06, LAYO-07, THEM-01, THEM-02, THEM-03 | 10 |

---

## Phase 1: Core Library Setup

**Goal:** Set up ngx-mkd with marked and github-markdown-css

**Requirements:**
- CORE-01: Component accepts markdown source via input binding
- CORE-02: Convert markdown to HTML using marked with GFM enabled
- CORE-03: Apply github-markdown-css classes for GitHub-style rendering

**Success Criteria:**
1. MarkdownComponent can receive markdown string input
2. Marked parses markdown with GFM enabled
3. Output applies github-markdown-css body class

---

## Phase 2: Code Highlighting

**Goal:** Add highlight.js with language labels

**Requirements:**
- CODE-01: Integrate highlight.js for syntax highlighting
- CODE-02: Display language label in top-left of code blocks
- CODE-03: Default to "text" when no language specified
- CODE-04: Auto-detect language when specified

**Success Criteria:**
1. highlight.js processes code blocks
2. Language label shows in code block header
3. Unknown languages show "text"
4. Specified languages are highlighted correctly

---

## Phase 3: Copy Button

**Goal:** Implement copy-to-clipboard for code blocks

**Requirements:**
- COPY-01: Display Copy button in top-right of each code block
- COPY-02: Copy code block content to clipboard when clicked
- COPY-03: Change button text to "Copied" after successful copy
- COPY-04: Revert button text to "Copy" after 2 seconds
- COPY-05: Log error to console if copy fails

**Success Criteria:**
1. Copy button visible on all code blocks
2. Clicking copies code to clipboard
3. Button shows "Copied" feedback
4. Button reverts after 2 seconds
5. Errors logged to console

---

## Phase 4: Demo Application

**Goal:** Build demo-ngx-mkd with layout and theming

**Requirements:**
- LAYO-01: Fixed header bar at top of page
- LAYO-02: Project title displayed in header left
- LAYO-03: Theme toggle button in header right
- LAYO-04: Two-panel layout below header (left/right)
- LAYO-05: Left panel shows markdown source
- LAYO-06: Right panel shows rendered HTML
- LAYO-07: Each panel scrolls independently
- THEM-01: Default theme is light mode
- THEM-02: Click theme button toggles between light/dark
- THEM-03: github-markdown-css theme updates with toggle

**Success Criteria:**
1. Header bar is fixed at top
2. Title appears on left of header
3. Theme toggle appears on right of header
4. Two panels fill remaining space
5. Left panel scrolls independently
6. Right panel scrolls independently
7. Theme toggle switches CSS classes
8. Light theme is default
9. Dark theme applies github-markdown-css dark mode
