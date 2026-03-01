# Requirements: ngx-mkd

**Defined:** 2026-03-01
**Core Value:** Provide a drop-in Angular component that renders Markdown with GitHub-style styling and syntax-highlighted code blocks.

## v1 Requirements

### ngx-mkd Library

#### Core Rendering

- [x] **CORE-01**: Component accepts markdown source via input binding
- [x] **CORE-02**: Convert markdown to HTML using marked with GFM enabled
- [x] **CORE-03**: Apply github-markdown-css classes for GitHub-style rendering

#### Code Highlighting

- [ ] **CODE-01**: Integrate highlight.js for syntax highlighting
- [ ] **CODE-02**: Display language label in top-left of code blocks
- [ ] **CODE-03**: Default to "text" when no language specified
- [ ] **CODE-04**: Auto-detect language when specified

#### Copy Functionality

- [x] **COPY-01**: Display Copy button in top-right of each code block
- [x] **COPY-02**: Copy code block content to clipboard when clicked
- [x] **COPY-03**: Change button text to "Copied" after successful copy
- [x] **COPY-04**: Revert button text to "Copy" after 2 seconds
- [x] **COPY-05**: Log error to console if copy fails

### demo-ngx-mkd Application

#### Layout

- [ ] **LAYO-01**: Fixed header bar at top of page
- [ ] **LAYO-02**: Project title displayed in header left
- [ ] **LAYO-03**: Theme toggle button in header right
- [ ] **LAYO-04**: Two-panel layout below header (left/right)
- [ ] **LAYO-05**: Left panel shows markdown source
- [ ] **LAYO-06**: Right panel shows rendered HTML
- [ ] **LAYO-07**: Each panel scrolls independently

#### Theming

- [ ] **THEM-01**: Default theme is light mode
- [ ] **THEM-02**: Click theme button toggles between light/dark
- [ ] **THEM-03**: github-markdown-css theme updates with toggle

## v2 Requirements

(None currently)

## Out of Scope

| Feature | Reason |
|---------|--------|
| Real-time markdown editing | Beyond core rendering scope |
| Markdown file upload | Not in initial requirements |
| Custom highlight.js themes | Use defaults for v1 |
| Mobile-specific layouts | Responsive only |
| Markdown extensions | Stick to standard GFM |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| CORE-01 | Phase 1 | Complete |
| CORE-02 | Phase 1 | Complete |
| CORE-03 | Phase 1 | Complete |
| CODE-01 | Phase 2 | Pending |
| CODE-02 | Phase 2 | Pending |
| CODE-03 | Phase 2 | Pending |
| CODE-04 | Phase 2 | Pending |
| COPY-01 | Phase 3 | Complete |
| COPY-02 | Phase 3 | Complete |
| COPY-03 | Phase 3 | Complete |
| COPY-04 | Phase 3 | Complete |
| COPY-05 | Phase 3 | Complete |
| LAYO-01 | Phase 4 | Pending |
| LAYO-02 | Phase 4 | Pending |
| LAYO-03 | Phase 4 | Pending |
| LAYO-04 | Phase 4 | Pending |
| LAYO-05 | Phase 4 | Pending |
| LAYO-06 | Phase 4 | Pending |
| LAYO-07 | Phase 4 | Pending |
| THEM-01 | Phase 4 | Pending |
| THEM-02 | Phase 4 | Pending |
| THEM-03 | Phase 4 | Pending |

**Coverage:**
- v1 requirements: 21 total
- Mapped to phases: 21
- Unmapped: 0 ✓

---
*Requirements defined: 2026-03-01*
*Last updated: 2026-03-01 after initial definition*
