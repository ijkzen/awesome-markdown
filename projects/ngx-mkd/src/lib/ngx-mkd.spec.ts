import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMkdComponent } from './ngx-mkd';

describe('NgxMkdComponent', () => {
  let component: NgxMkdComponent;
  let fixture: ComponentFixture<NgxMkdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxMkdComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(NgxMkdComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('markdown', '# test');
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render code block toolbar with language label and copy button', () => {
    fixture.componentRef.setInput('markdown', '```typescript\nconst value = 1;\n```');
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const language = host.querySelector('.code-block-language')?.textContent?.trim();
    const buttonText = host.querySelector('.code-copy-button')?.textContent?.trim();

    expect(language).toBe('typescript');
    expect(buttonText).toBe('Copy');
  });

  it('should use text label when language is not specified', () => {
    fixture.componentRef.setInput('markdown', '```\nhello\n```');
    fixture.detectChanges();

    const host = fixture.nativeElement as HTMLElement;
    const language = host.querySelector('.code-block-language')?.textContent?.trim();

    expect(language).toBe('text');
  });
});
