import { Component, input, computed, ViewEncapsulation, AfterViewInit, ElementRef, OnDestroy, effect } from '@angular/core';
import { marked, Renderer } from 'marked';
import { markedHighlight } from 'marked-highlight';
import hljs from 'highlight.js';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import 'github-markdown-css/github-markdown.css';
import 'highlight.js/styles/github.css';

const renderer = new Renderer();

renderer.code = function({ text, lang }: { text: string; lang?: string }) {
  const language = lang || 'text';
  const highlighted = hljs.getLanguage(language)
    ? hljs.highlight(text, { language }).value
    : hljs.highlight(text, { language: 'plaintext' }).value;
  
  return `<div class="code-block-wrapper" data-code="${encodeURIComponent(text)}">
    <span class="code-lang">${language}</span>
    <button class="copy-button" data-copied="Copied!" data-original="Copy">Copy</button>
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
      color: var(--lang-color, #6e7781);
      background: var(--lang-bg, #f6f8fa);
      border-bottom-right-radius: 6px;
      border-top-left-radius: 0;
      z-index: 1;
    }
    .copy-button {
      position: absolute;
      top: 0;
      right: 0;
      padding: 4px 8px;
      font-size: 11px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
      color: var(--btn-color, #6e7781);
      background: var(--btn-bg, #f6f8fa);
      border: none;
      border-bottom-left-radius: 6px;
      cursor: pointer;
      transition: color 0.2s, background 0.2s;
      z-index: 2;
    }
    .copy-button:hover {
      color: var(--btn-hover-color, #24292f);
      background: var(--btn-hover-bg, #eaeef2);
    }
    .copy-button.copied {
      color: var(--copied-color, #1a7f37);
    }
    .code-block-wrapper pre {
      margin: 0;
      padding: 16px;
      background: var(--code-bg, #f6f8fa);
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
export class NgxMkdComponent implements AfterViewInit, OnDestroy {
  private clipboardListeners: (() => void)[] = [];
  private mutationObserver?: MutationObserver;

  markdown = input.required<string>();
  theme = input<'light' | 'dark'>('light');

  renderedHtml = computed(() => {
    return marked.parse(this.markdown()) as string;
  });

  private themeStyles = computed(() => {
    return this.theme() === 'dark' ? {
      '--lang-color': '#8b949e',
      '--lang-bg': '#21262d',
      '--btn-color': '#8b949e',
      '--btn-bg': '#21262d',
      '--btn-hover-color': '#c9d1d9',
      '--btn-hover-bg': '#30363d',
      '--copied-color': '#3fb950',
      '--code-bg': '#161b22'
    } : {
      '--lang-color': '#6e7781',
      '--lang-bg': '#f6f8fa',
      '--btn-color': '#6e7781',
      '--btn-bg': '#f6f8fa',
      '--btn-hover-color': '#24292f',
      '--btn-hover-bg': '#eaeef2',
      '--copied-color': '#1a7f37',
      '--code-bg': '#f6f8fa'
    };
  });

  constructor(private elementRef: ElementRef, private sanitizer: DomSanitizer) {
    effect(() => {
      const styles = this.themeStyles();
      const host = this.elementRef.nativeElement;
      Object.entries(styles).forEach(([key, value]) => {
        host.style.setProperty(key, value);
      });
    });
  }

  safeHtml(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.renderedHtml());
  }

  ngAfterViewInit(): void {
    this.setupCopyButtonListeners();
    this.mutationObserver = new MutationObserver(() => {
      this.setupCopyButtonListeners();
    });
    
    const hostElement = document.querySelector('lib-ngx-mkd');
    if (hostElement) {
      this.mutationObserver.observe(hostElement, { childList: true, subtree: true });
    }
  }

  ngOnDestroy(): void {
    this.clipboardListeners.forEach((unlisten) => {
      unlisten();
    });
    this.clipboardListeners = [];
    if (this.mutationObserver) {
      this.mutationObserver.disconnect();
    }
  }

  private setupCopyButtonListeners(): void {
    const hostElement = document.querySelector('lib-ngx-mkd');
    if (!hostElement) return;

    const buttons = hostElement.querySelectorAll('.copy-button:not([data-listener-attached])');
    buttons.forEach((button: Element) => {
      button.setAttribute('data-listener-attached', 'true');
      const handler = (event: Event) => {
        event.preventDefault();
        this.handleCopyClick(button as HTMLButtonElement);
      };
      button.addEventListener('click', handler);
      this.clipboardListeners.push(() => {
        button.removeEventListener('click', handler);
      });
    });
  }

  private handleCopyClick(button: HTMLButtonElement): void {
    const wrapper = button.closest('.code-block-wrapper');
    if (!wrapper) return;

    const codeData = wrapper.getAttribute('data-code');
    if (!codeData) return;

    const code = decodeURIComponent(codeData);

    navigator.clipboard.writeText(code).then(() => {
      const originalText = button.getAttribute('data-original') || 'Copy';
      button.textContent = 'Copied!';
      button.classList.add('copied');

      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('copied');
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy code to clipboard:', err);
    });
  }
}
