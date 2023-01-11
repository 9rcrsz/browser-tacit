import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CssGroupComponent } from './css-group.component';

describe('CssGroupComponent', () => {
  let component: CssGroupComponent;
  let fixture: ComponentFixture<CssGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CssGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CssGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
