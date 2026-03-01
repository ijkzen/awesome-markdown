# Testing Patterns

**Analysis Date:** 2025-03-01

## Test Framework

**Runner:**
- Vitest 4.0.8 (via `@angular/build:unit-test` builder)
- Config: `angular.json` test builder configuration
- TypeScript config: `tsconfig.spec.json` with Vitest globals types

**Assertion Library:**
- Jasmine-style matchers (via Angular testing utilities)
- Standard matchers: `toBeTruthy()`, `toContain()`, `toBe()`

**Run Commands:**
```bash
# Run all tests
pnpm ng test ngx-mkd --watch=false

# Run with watch mode (default)
pnpm ng test ngx-mkd

# Test demo app
pnpm ng test demo-ngx-mkd --watch=false
```

## Test File Organization

**Location:**
- Co-located with source files in `src/lib/`
- Naming: `*.spec.ts` alongside `*.ts` files

**Structure:**
```
projects/ngx-mkd/src/lib/
├── ngx-mkd.ts                 # Component
├── ngx-mkd.spec.ts            # Component tests
├── markdown-render.service.ts # Service
└── markdown-render.service.spec.ts # Service tests
```

## Test Structure

**Suite Organization:**
```typescript
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
});
```

**Setup Patterns:**
- Use `async`/`await` in `beforeEach` for component compilation
- `compileComponents()` required for standalone components
- `TestBed.configureTestingModule({ imports: [...] })` for standalone components
- Set inputs via `fixture.componentRef.setInput('name', value)`
- Call `detectChanges()` and `whenStable()` after input changes

**Teardown Patterns:**
- No explicit teardown; Angular TestBed handles cleanup
- No `afterEach` blocks observed

## Mocking

**Framework:** Angular TestBed (no dedicated mocking library)

**Patterns:**
- No mocks used for service tests; test actual implementation
- Services instantiated via `TestBed.inject(MarkdownRenderService)`
- No HTTP mocking (no HTTP client used)

**What to Mock:**
- Not applicable - tests use real implementations
- Clipboard API mocked implicitly via browser environment (jsdom)

**What NOT to Mock:**
- Services are tested directly without mocks
- Component dependencies resolved via DI

## Fixtures and Factories

**Test Data:**
- Inline markdown strings for test cases
- No shared fixtures or factory functions

**Example Pattern:**
```typescript
it('should render fenced code blocks with language label', () => {
  const html = service.render('```typescript\nconst value = 1;\n```');
  expect(html).toContain('class="code-block-wrapper"');
  expect(html).toContain('class="code-block-language">typescript<');
});
```

**Location:**
- Test data defined inline within test cases
- No dedicated fixtures directory

## Coverage

**Requirements:** Not configured/enforced

**View Coverage:**
Not configured. To add coverage, modify angular.json test builder options.

## Test Types

**Unit Tests:**
- Service tests: Direct method testing with input/output verification
- Component tests: DOM interaction and rendering verification
- No state management tests (signals tested implicitly)

**Integration Tests:**
- Component tests verify integration with service
- DOM output verified after full render cycle

**E2E Tests:**
- Not used
- Manual QA via demo app (`projects/demo-ngx-mkd`)

## Common Patterns

**Async Testing:**
```typescript
beforeEach(async () => {
  await TestBed.configureTestingModule({
    imports: [NgxMkdComponent]
  }).compileComponents();
});
```

**Component Input Testing:**
```typescript
fixture.componentRef.setInput('markdown', '```typescript\nconst value = 1;\n```');
fixture.detectChanges();
```

**DOM Query Testing:**
```typescript
const host = fixture.nativeElement as HTMLElement;
const language = host.querySelector('.code-block-language')?.textContent?.trim();
expect(language).toBe('typescript');
```

**Service Method Testing:**
```typescript
it('should render mermaid fenced block as mermaid container', () => {
  const html = service.render('```mermaid\ngraph TD\nA-->B\n```');
  expect(html).toContain('class="mermaid-block-wrapper"');
  expect(html).toContain('data-mermaid-source="');
});
```

**HTML Output Testing:**
- Verify CSS class presence
- Verify attribute values
- Verify text content
- String containment checks (not strict equality)

## Test Configuration

**Vitest Globals:**
- Enabled in `tsconfig.spec.json` via `"types": ["vitest/globals"]`
- No import needed for `describe`, `it`, `expect`, `beforeEach`

**Angular Integration:**
- Uses `@angular/build:unit-test` builder
- TypeScript project references for test configs
- jsdom environment for DOM testing

---

*Testing analysis: 2025-03-01*
