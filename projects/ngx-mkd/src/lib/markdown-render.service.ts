import { Injectable } from '@angular/core';
import hljs from 'highlight.js';
import { Marked, Tokens } from 'marked';

@Injectable({
  providedIn: 'root'
})
export class MarkdownRenderService {
  private readonly markdownParser = new Marked({
    gfm: true,
    breaks: true,
    renderer: {
      code: ({ text, lang }: Tokens.Code) => this.renderCodeBlock(text, lang)
    }
  });

  render(markdown: string): string {
    const parsed = this.markdownParser.parse(markdown);
    return typeof parsed === 'string' ? parsed : '';
  }

  private renderCodeBlock(text: string, rawLanguage?: string): string {
    const language = this.normalizeLanguage(rawLanguage);

    if (language === 'mermaid') {
      return this.renderMermaidBlock(text);
    }

    const languageLabel = this.escapeHtml(language || 'text');
    const languageClass = this.escapeHtml(language || 'text');
    const highlightedCode = this.highlightCode(text, language);

    return `
      <div class="code-block-wrapper">
        <span class="code-block-language">${languageLabel}</span>
        <button type="button" class="code-copy-button" aria-label="Copy code block">Copy</button>
        <pre><code class="hljs language-${languageClass}">${highlightedCode}</code></pre>
      </div>
    `;
  }

  private renderMermaidBlock(text: string): string {
    const source = text.trim();
    const encodedSource = encodeURIComponent(source);

    return `
      <div class="mermaid-block-wrapper">
        <div class="mermaid" data-mermaid-source="${encodedSource}">${this.escapeHtml(source)}</div>
      </div>
    `;
  }

  private normalizeLanguage(rawLanguage?: string): string {
    const firstToken = (rawLanguage ?? '').trim().split(/\s+/)[0] ?? '';
    return firstToken.toLowerCase().replace(/[^a-z0-9_+-]/g, '');
  }

  private highlightCode(text: string, language: string): string {
    if (!language) {
      return hljs.highlightAuto(text).value;
    }

    if (hljs.getLanguage(language)) {
      return hljs.highlight(text, { language, ignoreIllegals: true }).value;
    }

    return hljs.highlightAuto(text).value;
  }

  private escapeHtml(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }
}
