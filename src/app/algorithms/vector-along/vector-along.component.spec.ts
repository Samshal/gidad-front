import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VectorAlongComponent } from './vector-along.component';

describe('VectorAlongComponent', () => {
  let component: VectorAlongComponent;
  let fixture: ComponentFixture<VectorAlongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VectorAlongComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VectorAlongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
