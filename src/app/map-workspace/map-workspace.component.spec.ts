import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MapWorkspaceComponent } from './map-workspace.component';

describe('MapWorkspaceComponent', () => {
  let component: MapWorkspaceComponent;
  let fixture: ComponentFixture<MapWorkspaceComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MapWorkspaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
