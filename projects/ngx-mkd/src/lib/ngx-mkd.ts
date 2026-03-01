import { Component, computed, input, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

// Configure marked with GFM enabled
marked.use({
  gfm: true,
  breaks: true
});

@Component({
  selector: 'lib-ngx-mkd',
  standalone: true,
  encapsulation: ViewEncapsulation.Emulated,
  imports: [],
  template: `<div class="markdown-body" [innerHTML]="safeHtml()"></div>`,
  styleUrl: 'ngx-mkd.component.css'
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