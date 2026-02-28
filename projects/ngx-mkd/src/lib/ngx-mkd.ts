import { Component, input, computed, ViewEncapsulation } from '@angular/core';
import { marked } from 'marked';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import 'github-markdown-css/github-markdown.css';

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
  `]
})
export class NgxMkdComponent {
  markdown = input.required<string>();

  renderedHtml = computed(() => {
    return marked.parse(this.markdown(), { gfm: true, breaks: true }) as string;
  });

  constructor(private sanitizer: DomSanitizer) {}

  safeHtml(): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(this.renderedHtml());
  }
}
