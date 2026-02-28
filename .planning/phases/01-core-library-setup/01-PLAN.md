---
phase: 01-core-library-setup
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - projects/ngx-mkd/src/lib/ngx-mkd.ts
  - projects/ngx-mkd/src/lib/ngx-mkd.component.css
  - projects/demo-ngx-mkd/src/app/app.component.ts
  - projects/demo-ngx-mkd/src/styles.css
autonomous: true
requirements:
  - CORE-01
  - CORE-02
  - CORE-03
must_haves:
  truths:
    - ngx-mkd component accepts markdown via @Input()
    - marked converts markdown to HTML with GFM enabled
    - CSS responsibility is on consumer, not library
    - Demo app imports github-markdown-css
  artifacts:
    - path: projects/ngx-mkd/src/lib/ngx-mkd.ts
      provides: Markdown rendering component
      exports: [NgxMkdComponent]
    - path: projects/demo-ngx-mkd/src/styles.css
      provides: CSS imports for demo app
      contains: github-markdown-css
  key_links:
    - from: demo-ngx-mkd
      to: github-markdown-css
      via: styles.css import
---

<objective>
Set up the ngx-mkd Angular component with marked for markdown parsing. Library provides structural rendering only; styling CSS is the consumer's responsibility.

Purpose: Deliver a working markdown-to-HTML component that follows proper library architecture (no internal CSS imports).
Output: Updated component with signal-based inputs, marked integration, and proper separation of styling concerns.
</objective>

<execution_context>
@~/.config/opencode/get-shit-done/workflows/execute-plan.md
@~/.config/opencode/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/phases/01-core-library-setup/01-CONTEXT.md

Key decision from CONTEXT.md:
- ngx-mkd does NOT import CSS or define color styles
- CSS (github-markdown-css) is imported by demo-ngx-mkd, not the library
- Library provides structural styles only (code block positioning, layout)
</context>

<tasks>

<task type="auto">
  <name>Task 1: Install marked dependency</name>
  <files>package.json</files>
  <action>
    Install marked package for markdown-to-HTML conversion:
    
    ```bash
    npm install marked
    ```
    
    Note: github-markdown-css will be installed by the demo app (consumer responsibility per architecture decision), not the library itself.
    
    Verify package.json includes marked dependency.
  </action>
  <verify>
    <automated>grep -q '"marked"' package.json && echo "marked installed"</automated>
  </verify>
  <done>marked package is listed in dependencies</done>
</task>

<task type="auto">
  <name>Task 2: Update NgxMkd component with marked integration</name>
  <files>projects/ngx-mkd/src/lib/ngx-mkd.ts</files>
  <action>
    Read current component at projects/ngx-mkd/src/lib/ngx-mkd.ts, then update it:
    
    1. Import required Angular modules: Component, input, computed, ViewEncapsulation, SafeHtml, DomSanitizer
    2. Import marked from 'marked'
    3. Configure marked with gfm: true and breaks: true
    4. Use signal-based input: markdown = input.required<string>()
    5. Create computed signal for rendered HTML: renderedHtml = computed(() => marked.parse(...))
    6. Use DomSanitizer for safe HTML binding
    7. Template: wrapper div with 'markdown-body' class and [innerHTML] binding
    8. ViewEncapsulation.Emulated (default)
    9. **NO CSS imports in component** — this is consumer's responsibility per architecture decision
    
    Component should be standalone with no external CSS dependencies.
  </action>
  <verify>
    <automated>cd projects/ngx-mkd && npx tsc --noEmit src/lib/ngx-mkd.ts 2>&1 | head -20</automated>
  </verify>
  <done>
    - Component compiles without errors
    - Uses marked with GFM enabled
    - Has input.required<string>() for markdown
    - Uses computed() for HTML generation
    - Template uses markdown-body class
    - NO CSS imports in the component file
  </done>
</task>

<task type="auto">
  <name>Task 3: Add structural CSS for library</name>
  <files>projects/ngx-mkd/src/lib/ngx-mkd.component.css</files>
  <action>
    Create minimal structural CSS file for the component at projects/ngx-mkd/src/lib/ngx-mkd.component.css.
    
    This CSS should ONLY include:
    - Structural/layout styles (positioning, sizing)
    - Code block container positioning (for future copy button)
    - NO color, background, or theme-related styles
    - NO github-markdown-css styles (consumer imports these)
    
    Example structural styles:
    - Code block wrapper positioning (relative, for absolute-positioned children)
    - Basic layout for the markdown-body wrapper
  </action>
  <verify>
    <automated>test -f projects/ngx-mkd/src/lib/ngx-mkd.component.css && echo "CSS file exists"</automated>
  </verify>
  <done>
    - CSS file exists
    - Contains only structural styles
    - No color/background definitions
    - No github-markdown-css imports
  </done>
</task>

<task type="auto">
  <name>Task 4: Update demo app to import CSS</name>
  <files>
    projects/demo-ngx-mkd/src/styles.css
    projects/demo-ngx-mkd/src/app/app.component.ts
  </files>
  <action>
    Since the library doesn't import CSS, the demo app (consumer) must do this:
    
    1. Install github-markdown-css in demo app:
       ```bash
       cd projects/demo-ngx-mkd && npm install github-markdown-css
       ```
    
    2. Add to projects/demo-ngx-mkd/src/styles.css:
       ```css
       @import 'github-markdown-css/github-markdown.css';
       /* Or for light theme only: @import 'github-markdown-css/github-markdown-light.css'; */
       ```
    
    3. Update projects/demo-ngx-mkd/src/app/app.component.ts:
       - Import NgxMkdComponent from 'ngx-mkd'
       - Add sample markdown content for testing
       - Use the component in template: <lib-ngx-mkd [markdown]="content" />
  </action>
  <verify>
    <automated>grep -q "github-markdown-css" projects/demo-ngx-mkd/src/styles.css && echo "CSS imported in demo"</automated>
  </verify>
  <done>
    - github-markdown-css imported in demo styles.css
    - Demo app uses NgxMkdComponent
    - Sample markdown renders correctly
  </done>
</task>

<task type="auto">
  <name>Task 5: Build and verify</name>
  <files>dist/</files>
  <action>
    Build both library and demo app to verify everything works:
    
    ```bash
    ng build ngx-mkd
    ng build demo-ngx-mkd
    ```
    
    Check for:
    - No build errors
    - CSS is properly loaded in demo app
    - Markdown renders with GitHub styling (from demo's CSS import)
    - Component doesn't bundle CSS (library is CSS-agnostic)
  </action>
  <verify>
    <automated>ng build ngx-mkd --configuration production && ng build demo-ngx-mkd --configuration production && echo "Build successful"</automated>
  </verify>
  <done>
    - ngx-mkd builds successfully
    - demo-ngx-mkd builds successfully
    - Markdown renders with proper styling
    - No CSS bundled in library output
  </done>
</task>

</tasks>

<verification>
1. Component accepts markdown via @Input() — verify input binding works
2. Marked parses with GFM — verify tables, strikethrough work
3. CSS is consumer's responsibility — verify library has no CSS imports
4. Demo app renders styled markdown — verify github-markdown-css is active
</verification>

<success_criteria>
- ngx-mkd component compiles and exports correctly
- marked converts markdown to HTML with GFM support
- Library has NO CSS imports (clean architecture)
- Demo app imports and applies github-markdown-css
- Both library and demo build successfully
- Markdown renders with GitHub-style appearance in demo
</success_criteria>

<output>
After completion, create .planning/phases/01-core-library-setup/01-01-SUMMARY.md
</output>
