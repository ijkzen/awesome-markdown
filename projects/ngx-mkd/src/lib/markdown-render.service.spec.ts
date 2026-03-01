import { TestBed } from '@angular/core/testing';

import { MarkdownRenderService } from './markdown-render.service';

describe('MarkdownRenderService', () => {
  let service: MarkdownRenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarkdownRenderService);
  });

  it('should render fenced code blocks with language label and copy button', () => {
    const html = service.render('```typescript\nconst value = 1;\n```');

    expect(html).toContain('class="code-block-wrapper"');
    expect(html).toContain('class="code-block-language">typescript<');
    expect(html).toContain('class="code-copy-button"');
  });

  it('should fallback to text label when no language is provided', () => {
    const html = service.render('```\nhello\n```');

    expect(html).toContain('class="code-block-language">text<');
  });

  it('should render mermaid fenced block as mermaid container', () => {
    const html = service.render('```mermaid\ngraph TD\nA-->B\n```');

    expect(html).toContain('class="mermaid-block-wrapper"');
    expect(html).toContain('class="mermaid"');
    expect(html).toContain('data-mermaid-source="');
    expect(html).toContain('graph TD');
  });
});
