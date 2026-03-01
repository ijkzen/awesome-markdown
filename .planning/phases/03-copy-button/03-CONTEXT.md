# Phase 3: Copy Button - Context

**Gathered:** 2026-03-01
**Status:** Ready for planning

<domain>
## Phase Boundary

Implement copy-to-clipboard functionality for code blocks in ngx-mkd. This includes displaying a Copy button in the top-right of each code block, copying the code content when clicked, showing "Copied!" feedback for 2 seconds, and logging errors to console if copy fails.

</domain>

<decisions>
## Implementation Decisions

### Button Placement
- Top-right corner of each code block
- Same horizontal row as the language label (which is at top-left)
- Positioned absolutely within the `.code-block-wrapper`

### Button Styling
- Text-only button showing "Copy"
- Positioned in top-right corner
- Follows similar styling to language label (font, colors)

### Button States & Feedback
- Default state: Shows "Copy" text
- After click: Changes to "Copied!" for 2 seconds
- After 2 seconds: Reverts back to "Copy" text
- Uses setTimeout to handle the revert

### Error Handling
- Log error to console if clipboard API fails
- User can view errors in dev tools

### Claude's Discretion
- Exact CSS styling for the button (colors, padding, hover effects)
- Button visibility (always visible or on hover)
- Animation/transitions for state changes

</decisions>

<specifics>
## Specific Ideas

- Button in top-right, aligned with language label at top-left
- "Copy" → "Copied!" for 2 seconds, then revert
- Console log on error (as per requirements COPY-05)

</specifics>

# Existing Code Insights

### Reusable Assets
- NgxMkdComponent exists at `projects/ngx-mkd/src/lib/ngx-mkd.ts`
- Uses signal-based `computed()` for reactive rendering
- Already wraps code blocks in `.code-block-wrapper` with language label at top-left
- Current styling uses absolute positioning for `.code-lang` - copy button can use similar approach

### Established Patterns
- Signal-based computed values for derived state
- Component uses ViewEncapsulation.Emulated with inline styles
- Uses marked renderer to modify code block output

### Integration Points
- Add copy button HTML to the renderer.code function in ngx-mkd.ts
- Add button click handler (can be done via global document event listener or inline onclick)
- Add CSS for button positioning and states in component styles

</code_context>

<deferred>
## Deferred Ideas

- Theme switching in demo app (Phase 4)
- Demo application layout (Phase 4)

</deferred>

---

*Phase: 03-copy-button*
*Context gathered: 2026-03-01*
