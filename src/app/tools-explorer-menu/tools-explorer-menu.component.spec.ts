import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolsExplorerMenuComponent } from './tools-explorer-menu.component';

describe('ToolsExplorerMenuComponent', () => {
  let component: ToolsExplorerMenuComponent;
  let fixture: ComponentFixture<ToolsExplorerMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolsExplorerMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolsExplorerMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
