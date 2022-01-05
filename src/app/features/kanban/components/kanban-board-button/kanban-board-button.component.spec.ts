import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanBoardButtonComponent } from './kanban-board-button.component';
import { KanbanService } from '@features/kanban/services/kanban.service';
import { TestUtils } from '@core/utils';

describe('KanbanBoardButtonComponent', () => {

  let component: KanbanBoardButtonComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<KanbanBoardButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanbanBoardButtonComponent ],
      providers: [ KanbanService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KanbanBoardButtonComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('create the component', () => {
    expect(component).toBeTruthy();
  });

  it('opens the input panel', () => {
    TestUtils.triggerElementClick(fixture, 'kanban-board-button');
    fixture.detectChanges();

    expect(component.isTheInputPanelOpen).toBe(true);
    TestUtils.expectElementToBeTruthy(fixture, 'board-input-panel');
    TestUtils.expectElementToBeFalsy(fixture, 'kanban-board-button');
  });

  it('closes the input panel when the close button is clicked', () => {
    component.isTheInputPanelOpen = true;
    fixture.detectChanges();

    TestUtils.triggerElementClick(fixture, 'close-panel-button');
    fixture.detectChanges();

    expect(component.isTheInputPanelOpen).toBe(false);
    TestUtils.expectElementToBeFalsy(fixture, 'board-input-panel');
    TestUtils.expectElementToBeTruthy(fixture, 'kanban-board-button');
  });

  it('closes the input panel when the "Escape" key is pressed', () => {
    component.isTheInputPanelOpen = true;
    fixture.detectChanges();

    TestUtils.triggerDocumentKeyUp('Escape');
    fixture.detectChanges();

    expect(component.isTheInputPanelOpen).toBe(false);
    TestUtils.expectElementToBeFalsy(fixture, 'board-input-panel');
    TestUtils.expectElementToBeTruthy(fixture, 'kanban-board-button');
  });

  it('resets the list title when the input panel closes', () => {
    component.isTheInputPanelOpen = true;
    fixture.detectChanges();   

    TestUtils.triggerElementClick(fixture, 'close-panel-button');
    fixture.detectChanges();

    expect(component.listTitle).toBe('');
  });

});
