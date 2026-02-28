---
phase: quick
type: execute
wave: 1
depends_on: []
files_modified:
  - projects/demo-ngx-mkd/src/styles.css
  - projects/demo-ngx-mkd/src/app/app.html
  - projects/demo-ngx-mkd/src/app/app.ts
autonomous: true
must_haves:
  truths:
    - "Theme toggle button switches between light and dark modes"
    - "Markdown preview updates immediately when theme changes"
    - "Dark mode uses github-markdown dark theme colors"
    - "Light mode uses github-markdown light theme colors"
  artifacts:
    - path: "projects/demo-ngx-mkd/src/styles.css"
      provides: "Dual theme CSS imports (light + dark)"
    - path: "projects/demo-ngx-mkd/src/app/app.html"
      provides: "Theme class binding on markdown-body element"
    - path: "projects/demo-ngx-mkd/src/app/app.ts"
      provides: "Theme class logic for markdown-body"
  key_links:
    - from: "app.ts isDark()"
      to: "app.html [class.dark]"
      via: "Angular class binding"
---

<objective>
Make github-markdown-css properly adapt to theme changes by importing both light and dark CSS files and applying the correct theme class to the markdown-body element.

Purpose: The current setup imports a single CSS file that doesn't respond to the theme toggle, making the markdown preview always appear in light mode regardless of the selected theme.
</objective>

<execution_context>
@~/.config/opencode/get-shit-done/workflows/execute-plan.md
</execution_context>

<context>
@projects/demo-ngx-mkd/src/styles.css
@projects/demo-ngx-mkd/src/app/app.ts
@projects/demo-ngx-mkd/src/app/app.html
</context>

<tasks>

<task type="auto">
  <name>Update styles.css to import both theme files</name>
  <files>projects/demo-ngx-mkd/src/styles.css</files>
  <action>
Replace the single github-markdown.css import with both light and dark theme imports:

1. Remove: `@import 'github-markdown-css/github-markdown.css';`
2. Add: `@import 'github-markdown-css/github-markdown-light.css';`
3. Add: `@import 'github-markdown-css/github-markdown-dark.css';`

This makes both theme stylesheets available. The dark theme CSS uses selectors like `.markdown-body.dark` so it won't apply until the dark class is present.

Keep the existing `.markdown-body` box-sizing rule.
  </action>
  <verify>
    <automated>grep -E "github-markdown-(light|dark)\.css" projects/demo-ngx-mkd/src/styles.css | wc -l | grep -q "2"</automated>
    <manual>Verify both light and dark CSS files are imported</manual>
  </verify>
  <done>styles.css imports both github-markdown-light.css and github-markdown-dark.css</done>
</task>

<task type="auto">
  <name>Update app.html to use theme class on markdown-body</name>
  <files>projects/demo-ngx-mkd/src/app/app.html</files>
  <action>
Update the preview panel to apply the theme class directly to the markdown-body element:

Current (lines 48-52):
```html
<div class="preview-content" [class.gh-dark]="isDark()">
  <lib-ngx-mkd [markdown]="markdownSource()"></lib-ngx-mkd>
</div>
```

Change to:
```html
<div class="preview-content">
  <lib-ngx-mkd 
    [markdown]="markdownSource()" 
    [class.light]="!isDark()"
    [class.dark]="isDark()">
  </lib-ngx-mkd>
</div>
```

The lib-ngx-mkd component renders content with the `markdown-body` class. By adding `.light` or `.dark` classes to it, the imported CSS will apply the correct theme styles.
  </action>
  <verify>
    <automated>grep -E "\[class\.(light|dark)\]" projects/demo-ngx-mkd/src/app/app.html | wc -l | grep -q "2"</automated>
    <manual>Verify light and dark class bindings are present on lib-ngx-mkd</manual>
  </verify>
  <done>lib-ngx-mkd component has [class.light] and [class.dark] bindings based on isDark()</done>
</task>

<task type="auto">
  <name>Clean up unused gh-dark class logic from app.ts</name>
  <files>projects/demo-ngx-mkd/src/app/app.ts</files>
  <action>
Remove the `updateDarkClass()` method and its call since we're now handling themes via CSS classes on the markdown-body element instead of body-level class.

Remove lines 123-130 (the updateDarkClass method) and line 111 (the call to updateDarkClass in the effect).

The effect should only persist to localStorage:
```typescript
effect(() => {
  localStorage.setItem('theme', this.theme());
});
```

Also remove the `gh-dark` class manipulation from the effect. The theme class is now handled in the template.
  </action>
  <verify>
    <automated>! grep -q "gh-dark" projects/demo-ngx-mkd/src/app/app.ts</automated>
    <manual>Verify gh-dark references are removed from app.ts</manual>
  </verify>
  <done>updateDarkClass method removed, effect only persists theme to localStorage</done>
</task>

</tasks>

<verification>
After all tasks complete:
1. Run the demo app: `cd projects/demo-ngx-mkd && ng serve`
2. Toggle the theme button in the header
3. Verify markdown preview switches between light and dark themes
4. Check that code blocks, tables, and other markdown elements have proper dark mode colors
</verification>

<success_criteria>
- Clicking theme toggle switches markdown preview between light and dark modes
- Dark mode shows proper dark background with light text
- Light mode shows proper light background with dark text
- No gh-dark class references remain in the codebase
- Both github-markdown-light.css and github-markdown-dark.css are imported
</success_criteria>

<output>
After completion, the demo app will properly switch github-markdown-css themes when the user clicks the theme toggle button.
</output>
