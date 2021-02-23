import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LayersExplorerComponent } from './layers-explorer.component';

describe('LayersExplorerComponent', () => {
  let component: LayersExplorerComponent;
  let fixture: ComponentFixture<LayersExplorerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LayersExplorerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayersExplorerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
