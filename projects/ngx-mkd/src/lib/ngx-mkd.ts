import { Component, input, computed, ViewEncapsulation } from '@angular/core';
import { marked, Renderer } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import 'github-markdown-css/github-markdown.css';
import 'highlight.js/styles/github.css';

// Configure marked with highlight.js and custom renderer for language labels
const renderer = new Renderer();

renderer.code = function({ text, lang }: { text: string; lang?: string }) {
  const language = lang || 'text';
  const highlighted = hljs.getLanguage(language)
    ? hljs.highlight(text, { language }).value
    : hljs.highlight(text, { language: 'plaintext' }).value;
  
  return `<div class="code-block-wrapper">
    <span class="code-lang">${language}</span>
    <pre><code class="hljs language-${language}">${highlighted}</code></pre>
  </div>`;
};

marked.use({
  renderer,
  gfm: true,
  breaks: true
});

@Component({
  selector: 'lib-ngx-mkd',
  standalone: true,
  encapsulation: ViewEncapsulation.Emulated,
  imports: [],
  template: `<div class="markdown-body" [innerHTML]="safeHtml()"></div>`,
  styles: [`
    :host {
      display: block;
    }
    .code-block-wrapper {
      position: relative;
      margin: 16px 0;
    }
    .code-lang {
      position: absolute;
      top: 0;
      left: 0;
      padding: 4px 8px;
      font-size: 11px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
      color: #6e7781;
      background: #f6f8fa;
      border-bottom-right-radius: 6px;
      border-top-left-radius: 0;
    }
    .code-block-wrapper pre {
      margin: 0;
      padding: 16px;
      background: #f6f8fa;
      border-radius: 6px;
      overflow: auto;
    }
    .code-block-wrapper code {
      font-family: ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace;
      font-size: 14px;
      line-height: 1.5;
    }
  `]
})
export class NgxMkdComponent {
  markdown = input.required<string>();

  renderedHtml = computed(() => {
    return marked.parse(this.markdown()) as string;
  });

  constructor(private sanitizer: DomSanitizer) {}

  safeHtml(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.renderedHtml());
  }
}
