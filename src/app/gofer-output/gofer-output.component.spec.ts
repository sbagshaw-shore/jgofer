import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoferOutputComponent } from './gofer-output.component';

describe('GoferOutputComponent', () => {
  let component: GoferOutputComponent;
  let fixture: ComponentFixture<GoferOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoferOutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoferOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
