# Phase 2: Code Highlighting - Context

**Gathered:** 2026-03-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Add highlight.js integration to ngx-mkd for syntax highlighting in code blocks. This includes displaying language labels in the top-left corner of code blocks (default to "text" when no language is specified), and auto-detecting languages when specified. Copy button is a separate phase (Phase 3).

</domain>

<decisions>
## Implementation Decisions

### Integration Approach
- Use highlight.js for syntax highlighting
- Configure marked to use highlight.js for code block rendering
- Language detection via highlight.js auto-detect when no language specified

### Language Label Display
- Show language label in top-left of each code block
- Default label: "text" when no language specified in markdown code fence
- Use marked's renderer to wrap code blocks with language label markup

### Auto-Detection
- When language is explicitly specified (e.g., ```js), use that language
- When no language specified, let highlight.js auto-detect

### Rendering Strategy
- Modify marked renderer to add language label wrapper
- Apply highlight.js classes to code element

### Claude's Discretion
- Exact CSS styling for language label
- Which highlight.js theme to use
- Positioning of label within code block

</decisions>

<specifics>
## Specific Ideas

- Code block top-left shows language label
- No language = display "text" 
- Highlight.js auto-detects when language specified

</specifics>

# Existing Code Insights

### Reusable Assets
- NgxMkdComponent exists at `projects/ngx-mkd/src/lib/ngx-mkd.ts`
- Uses signal-based `computed()` for reactive rendering
- Already has marked integration with GFM enabled

### Established Patterns
- Signal-based computed values for derived state
- Component imports CSS via import statement
- OnPush change detection

### Integration Points
- Modify the `renderedHtml` computed in NgxMkdComponent
- Add highlight.js integration to marked configuration

</code_context>

<deferred>
## Deferred Ideas

- Copy button functionality (Phase 3)
- Theme switching in demo app (Phase 4)

</deferred>

---

*Phase: 02-code-highlighting*
*Context gathered: 2026-03-01*
