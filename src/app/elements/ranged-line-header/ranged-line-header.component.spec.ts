import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RangedLineHeaderComponent } from './ranged-line-header.component';

describe('RangedLineHeaderComponent', () => {
  let component: RangedLineHeaderComponent;
  let fixture: ComponentFixture<RangedLineHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RangedLineHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RangedLineHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
