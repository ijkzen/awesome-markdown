import { Component, computed, effect, ElementRef, inject, input, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { MarkdownRenderService } from './markdown-render.service';

@Component({
  selector: 'lib-ngx-mkd',
  standalone: true,
  encapsulation: ViewEncapsulation.None,
  imports: [],
  host: {
    '(click)': 'onHostClick($event)'
  },
  template: `<div class="markdown-body" [innerHTML]="safeHtml()"></div>`,
  styleUrl: 'ngx-mkd.component.css'
})
export class NgxMkdComponent {
  private readonly sanitizer = inject(DomSanitizer);
  private readonly hostElement = inject(ElementRef<HTMLElement>);
  private readonly markdownRenderService = inject(MarkdownRenderService);
  private readonly copyTimers = new WeakMap<HTMLButtonElement, number>();
  private mermaidModulePromise: Promise<typeof import('mermaid')> | null = null;

  markdown = input.required<string>();
  theme = input<'light' | 'dark'>('light');

  renderedHtml = computed(() => this.markdownRenderService.render(this.markdown()));

  safeHtml = computed<SafeHtml>(() => this.sanitizer.bypassSecurityTrustHtml(this.renderedHtml()));

  constructor() {
    effect(() => {
      this.renderedHtml();
      const currentTheme = this.theme();

      setTimeout(() => {
        void this.renderMermaid(currentTheme);
      }, 0);
    });
  }

  protected onHostClick(event: MouseEvent): void {
    const target = event.target;
    if (!(target instanceof HTMLElement)) {
      return;
    }

    const copyButton = target.closest<HTMLButtonElement>('.code-copy-button');
    if (!copyButton) {
      return;
    }

    const wrapper = copyButton.closest('.code-block-wrapper');
    const codeElement = wrapper?.querySelector('pre code');
    const codeText = codeElement?.textContent ?? '';

    void this.copyCodeToClipboard(codeText, copyButton);
  }

  private async copyCodeToClipboard(codeText: string, button: HTMLButtonElement): Promise<void> {
    try {
      if (!navigator.clipboard?.writeText) {
        throw new Error('Clipboard API is not available.');
      }

      await navigator.clipboard.writeText(codeText);
      this.showCopiedState(button);
    } catch (error) {
      console.error('Failed to copy code block:', error);
    }
  }

  private showCopiedState(button: HTMLButtonElement): void {
    const previousTimerId = this.copyTimers.get(button);
    if (previousTimerId) {
      window.clearTimeout(previousTimerId);
    }

    button.textContent = 'Copied';

    const timerId = window.setTimeout(() => {
      if (!this.hostElement.nativeElement.contains(button)) {
        return;
      }

      button.textContent = 'Copy';
      this.copyTimers.delete(button);
    }, 2000);

    this.copyTimers.set(button, timerId);
  }

  private async renderMermaid(theme: 'light' | 'dark'): Promise<void> {
    const markdownBody = this.hostElement.nativeElement.querySelector('.markdown-body') as HTMLElement | null;
    if (!markdownBody) {
      return;
    }

    const nodes = Array.from(markdownBody.querySelectorAll('.mermaid')) as HTMLElement[];
    if (nodes.length === 0) {
      return;
    }

    try {
      const mermaidModule = await this.getMermaidModule();
      const mermaidApi = mermaidModule.default;

      mermaidApi.initialize({
        startOnLoad: false,
        theme: theme === 'dark' ? 'dark' : 'default'
      });

      for (const node of nodes) {
        const encodedSource = node.getAttribute('data-mermaid-source');
        if (encodedSource) {
          node.textContent = decodeURIComponent(encodedSource);
        }

        node.removeAttribute('data-processed');
      }

      await mermaidApi.run({ nodes });
    } catch (error) {
      console.error('Failed to render mermaid diagrams:', error);
    }
  }

  private getMermaidModule(): Promise<typeof import('mermaid')> {
    if (!this.mermaidModulePromise) {
      this.mermaidModulePromise = import('mermaid');
    }

    return this.mermaidModulePromise;
  }
}