import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { KanbanBoardButtonComponent } from './kanban-board-button.component';

describe('KanbanBoardButtonComponent', () => {

  let component: KanbanBoardButtonComponent;
  let debugElement: DebugElement;
  let fixture: ComponentFixture<KanbanBoardButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanbanBoardButtonComponent ]
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
    const kanbanBoardButton = debugElement.query(By.css('[data-testid="kanban-board-button"]'));
    kanbanBoardButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.isTheInputPanelOpen).toBe(true);

    const boardInputPanel = debugElement.query(By.css('[data-testid="board-input-panel"]'));
    expect(boardInputPanel).toBeTruthy();

    const updatedKanbanBoardButton = debugElement.query(By.css('[data-testid="kanban-board-button"]'));
    expect(updatedKanbanBoardButton).toBeFalsy();
  });

  it('closes the input panel', () => {
    component.isTheInputPanelOpen = true;
    fixture.detectChanges();

    const closePanelButton = debugElement.query(By.css('[data-testid="close-panel-button"]'));
    closePanelButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.isTheInputPanelOpen).toBe(false);

    const boardInputPanel = debugElement.query(By.css('[data-testid="board-input-panel"]'));
    expect(boardInputPanel).toBeFalsy();

    const kanbanBoardButton = debugElement.query(By.css('[data-testid="kanban-board-button"]'));
    expect(kanbanBoardButton).toBeTruthy();
  });

  it('resets the list title when the input panel closes', () => {
    component.isTheInputPanelOpen = true;
    fixture.detectChanges();   

    const closePanelButton = debugElement.query(By.css('[data-testid="close-panel-button"]'));
    closePanelButton.triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(component.listTitle).toBe('');
  });

});
