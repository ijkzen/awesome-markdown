import { Component, signal, computed, effect } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxMkdComponent } from 'ngx-mkd';

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
  protected readonly title = signal('ngx-mkd');
  
  protected theme = signal<'light' | 'dark'>(this.loadTheme());
  
  protected markdownSource = signal<string>(SAMPLE_MARKDOWN);
  
  protected isDark = computed(() => this.theme() === 'dark');

  constructor() {
    // Persist theme changes to localStorage
    effect(() => {
      localStorage.setItem('theme', this.theme());
    });
  }

  private loadTheme(): 'light' | 'dark' {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark' || saved === 'light') {
      return saved;
    }
    return 'light';
  }

  protected toggleTheme(): void {
    this.theme.update(current => current === 'light' ? 'dark' : 'light');
  }
}
