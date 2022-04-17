import { DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { KanbanBoardButtonComponent } from './kanban-board-button.component';
import { TestUtils } from '@core/utils';

const openInputPanel = (fixture: ComponentFixture<KanbanBoardButtonComponent>) => {
  TestUtils.triggerElementClick(fixture, 'kanban-board-button');
  fixture.detectChanges();
};

describe('KanbanBoardButtonComponent', () => {

  let component: KanbanBoardButtonComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<KanbanBoardButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanbanBoardButtonComponent ],
      imports: [ FormsModule ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KanbanBoardButtonComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
  });

  it('renders without errors', () => {
    expect(component).toBeTruthy();
  });

  it('opens the input panel when the button is clicked', () => {
    TestUtils.triggerElementClick(fixture, 'kanban-board-button');
    fixture.detectChanges();

    expect(component.isTheInputPanelOpen).toBe(true);
    TestUtils.expectElementToBeTruthy(fixture, 'board-input-panel');
    TestUtils.expectElementToBeFalsy(fixture, 'kanban-board-button');
  });

  it('closes the input panel when the close button is clicked', () => {
    openInputPanel(fixture);
    TestUtils.triggerElementClick(fixture, 'close-panel-button');
    fixture.detectChanges();

    expect(component.isTheInputPanelOpen).toBe(false);
    TestUtils.expectElementToBeFalsy(fixture, 'board-input-panel');
    TestUtils.expectElementToBeTruthy(fixture, 'kanban-board-button');
  });

  it('closes the input panel when the "Escape" key is pressed', () => {
    openInputPanel(fixture);
    TestUtils.triggerDocumentKeyUp('Escape');
    fixture.detectChanges();

    expect(component.isTheInputPanelOpen).toBe(false);
    TestUtils.expectElementToBeFalsy(fixture, 'board-input-panel');
    TestUtils.expectElementToBeTruthy(fixture, 'kanban-board-button');
  });

  it('closes the input panel when add button is clicked and valid input is inserted', () => {
    openInputPanel(fixture);
    TestUtils.setInputElementValue(fixture, 'list-title-input', 'My List');
    TestUtils.triggerElementClick(fixture, 'add-list-button');
    fixture.detectChanges();

    expect(component.isTheInputPanelOpen).toBe(false);
    TestUtils.expectElementToBeFalsy(fixture, 'board-input-panel');
    TestUtils.expectElementToBeTruthy(fixture, 'kanban-board-button');
  });

  it('set submitted state as true when the add button is clicked', () => {
    openInputPanel(fixture);
    TestUtils.triggerElementClick(fixture, 'add-list-button');

    expect(component.submitted).toBe(true);
  });

  it('set submitted state as false when the input panel closes', () => {
    openInputPanel(fixture);
    TestUtils.triggerElementClick(fixture, 'add-list-button');
    TestUtils.triggerElementClick(fixture, 'close-panel-button');

    expect(component.submitted).toBe(false);
  });

  it('resets the list title input when the input panel closes', () => {
    openInputPanel(fixture);  
    TestUtils.triggerElementClick(fixture, 'close-panel-button');
    fixture.detectChanges();

    expect(component.listTitle).toBe('');
  });

  it('resets the list title input when the an onInsertList event is emitted', () => {
    openInputPanel(fixture);
    TestUtils.setInputElementValue(fixture, 'list-title-input', 'My List');
    TestUtils.triggerElementClick(fixture, 'add-list-button');

    expect(component.listTitle).toBe('');
  });
  
  it('emits a single onInsertList event when the add button is clicked', () => {
    spyOn(component.onInsertList, 'emit');

    openInputPanel(fixture);
    TestUtils.setInputElementValue(fixture, 'list-title-input', 'My List');
    TestUtils.triggerElementClick(fixture, 'add-list-button');

    expect(component.onInsertList.emit).toHaveBeenCalledOnceWith('My List');
  });

  it('not emits an onInsertList event if the list title is empty', () => {
    spyOn(component.onInsertList, 'emit');

    openInputPanel(fixture);
    TestUtils.setInputElementValue(fixture, 'list-title-input', '');
    TestUtils.triggerElementClick(fixture, 'add-list-button');

    expect(component.onInsertList.emit).not.toHaveBeenCalled();
  });

  it('shows "required" error message if the list title is empty', () => {
    openInputPanel(fixture);
    TestUtils.setInputElementValue(fixture, 'list-title-input', '');
    TestUtils.triggerElementClick(fixture, 'add-list-button');
    fixture.detectChanges();

    TestUtils.expectElementToBeTruthy(fixture, 'input-required-error')
  });

  it('not emits an onInsertList event if the list title length is lesser than 3', () => {
    spyOn(component.onInsertList, 'emit');

    openInputPanel(fixture);
    TestUtils.setInputElementValue(fixture, 'list-title-input', 'ab');
    TestUtils.triggerElementClick(fixture, 'add-list-button');

    expect(component.onInsertList.emit).not.toHaveBeenCalled();
  });

  it('shows "minlength" error message if the list title length is lesser than 3', () => {
    openInputPanel(fixture);
    TestUtils.setInputElementValue(fixture, 'list-title-input', 'ab');
    TestUtils.triggerElementClick(fixture, 'add-list-button');
    fixture.detectChanges();

    TestUtils.expectElementToBeTruthy(fixture, 'input-minlength-error')
  });

});
