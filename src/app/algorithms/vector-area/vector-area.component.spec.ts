import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VectorAreaComponent } from './vector-area.component';

describe('VectorAreaComponent', () => {
  let component: VectorAreaComponent;
  let fixture: ComponentFixture<VectorAreaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VectorAreaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VectorAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
