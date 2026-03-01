import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxMkd } from './ngx-mkd';

describe('NgxMkd', () => {
  let component: NgxMkd;
  let fixture: ComponentFixture<NgxMkd>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NgxMkd]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxMkd);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
