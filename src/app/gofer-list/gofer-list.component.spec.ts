import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoferListComponent } from './gofer-list.component';

describe('GoferListComponent', () => {
  let component: GoferListComponent;
  let fixture: ComponentFixture<GoferListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoferListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoferListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
