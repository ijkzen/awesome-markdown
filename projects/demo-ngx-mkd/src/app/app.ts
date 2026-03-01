import { Component, computed, effect, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxMkdComponent } from 'ngx-mkd';
import { environment } from '../environments/environment';

type ViewTransitionDocument = Document & {
  startViewTransition?: (updateCallback: () => void) => ViewTransition;
};

const SAMPLE_MARKDOWN = `# ngx-mkd Demo

Welcome to the **ngx-mkd** demonstration! This demo showcases the markdown rendering capabilities.

## Features

- GitHub-Flavored Markdown (GFM) support
- Syntax highlighting for code blocks
- Copy-to-clipboard functionality

### Code Examples

Here's a JavaScript function:

\`\`\`javascript
function greet(name) {
  console.log(\`Hello, \${name}!\`);
  return \`Welcome to ngx-mkd\`;
}

greet('Developer');
\`\`\`

And some Python:

\`\`\`python
def fibonacci(n):
    """Calculate the nth Fibonacci number"""
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(10))
\`\`\`

TypeScript example:

\`\`\`typescript
interface User {
  name: string;
  email: string;
  active: boolean;
}

const users: User[] = [
  { name: 'Alice', email: 'alice@example.com', active: true },
  { name: 'Bob', email: 'bob@example.com', active: false },
];
\`\`\`

Mermaid flowchart example:

\`\`\`mermaid
graph TD
  A[Write Markdown] --> B[ngx-mkd Render]
  B --> C{Code Block Type}
  C -->|normal| D[highlight.js]
  C -->|mermaid| E[Mermaid Diagram]
\`\`\`

## Math Formulas (KaTeX)

Inline formula example: $E = mc^2$

Block formula example:

$$
\\int_{0}^{\\infty} e^{-x^2} \\, dx = \\frac{\\sqrt{\\pi}}{2}
$$

## Tables

| Feature | Status | Notes |
|---------|--------|-------|
| GFM | ✅ | Full support |
| Syntax Highlighting | ✅ | 190+ languages |
| Copy Button | ✅ | One-click copy |

## Lists

### Unordered
- First item
- Second item
  - Nested item
  - Another nested
- Third item

### Ordered
1. Step one
2. Step two
3. Step three

## Blockquotes

> This is a blockquote. It's useful for highlighting quotes or important information.
> 
> Multiple lines work too!

## Inline Formatting

You can use **bold**, *italic*, ~~strikethrough~~, and \`inline code\` within your markdown.

---

Try editing the markdown on the left and see the preview update on the right!
`;

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgxMkdComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly markdownThemeLinkId = 'markdown-theme-stylesheet';
  private readonly highlightThemeLinkId = 'highlight-theme-stylesheet';

  protected readonly title = signal('ngx-mkd');
  
  protected theme = signal<'light' | 'dark'>(this.loadTheme());
  
  protected markdownSource = signal<string>(SAMPLE_MARKDOWN);
  
  protected isDark = computed(() => this.theme() === 'dark');

  constructor() {
    // Persist and apply theme changes
    effect(() => {
      const currentTheme = this.theme();
      localStorage.setItem('theme', currentTheme);
      document.body.classList.toggle('dark', currentTheme === 'dark');
      document.body.classList.toggle('light', currentTheme === 'light');
      this.applyMarkdownTheme(currentTheme);
      this.applyHighlightTheme(currentTheme);
    });
  }

  private applyMarkdownTheme(theme: 'light' | 'dark'): void {
    const href = `${environment.baseHref}markdown-${theme}.css`;
    let themeLink = document.getElementById(this.markdownThemeLinkId) as HTMLLinkElement | null;

    if (!themeLink) {
      themeLink = document.createElement('link');
      themeLink.id = this.markdownThemeLinkId;
      themeLink.rel = 'stylesheet';
      document.head.appendChild(themeLink);
    }

    if (themeLink.getAttribute('href') !== href) {
      themeLink.setAttribute('href', href);
    }
  }

  private applyHighlightTheme(theme: 'light' | 'dark'): void {
    const href = `${environment.baseHref}hljs-${theme}.css`;
    let themeLink = document.getElementById(this.highlightThemeLinkId) as HTMLLinkElement | null;

    if (!themeLink) {
      themeLink = document.createElement('link');
      themeLink.id = this.highlightThemeLinkId;
      themeLink.rel = 'stylesheet';
      document.head.appendChild(themeLink);
    }

    if (themeLink.getAttribute('href') !== href) {
      themeLink.setAttribute('href', href);
    }
  }

  private loadTheme(): 'light' | 'dark' {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    return 'light';
  }

  protected toggleTheme(event: MouseEvent): void {
    if (!this.canAnimateThemeTransition()) {
      this.theme.update(current => current === 'light' ? 'dark' : 'light');
      return;
    }

    const transitionDocument = document as ViewTransitionDocument;
    const clickX = event.clientX;
    const clickY = event.clientY;
    const finalRadius = Math.hypot(
      Math.max(clickX, window.innerWidth - clickX),
      Math.max(clickY, window.innerHeight - clickY)
    );

    const transition = transitionDocument.startViewTransition?.(() => {
      this.theme.update(current => current === 'light' ? 'dark' : 'light');
    });

    transition?.ready.then(() => {
      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${clickX}px ${clickY}px)`,
            `circle(${finalRadius}px at ${clickX}px ${clickY}px)`
          ]
        },
        {
          duration: 480,
          easing: 'cubic-bezier(0.2, 0, 0, 1)',
          pseudoElement: '::view-transition-new(root)'
        }
      );
    }).catch(() => {
      this.theme.update(current => current === 'light' ? 'dark' : 'light');
    });
  }

  private canAnimateThemeTransition(): boolean {
    const transitionDocument = document as ViewTransitionDocument;
    if (typeof transitionDocument.startViewTransition !== 'function') {
      return false;
    }

    return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
}
