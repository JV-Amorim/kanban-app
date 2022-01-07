import { Component, EventEmitter, NO_ERRORS_SCHEMA, Output } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';

import { TestUtils } from '@core/utils';
import { KanbanService } from '@features/kanban/services/kanban.service';
import { KanbanBoardComponent } from './kanban-board.component';
import { KanbanBoardButtonComponent } from '../kanban-board-button/kanban-board-button.component';

describe('KanbanBoardComponent', () => {

  @Component({
    selector: 'app-kanban-board-button',
    template: ''
  })
  class FakeKanbanBoardButtonComponent implements Partial<KanbanBoardButtonComponent> {
    @Output() onInsertList = new EventEmitter<string>();
  }

  let component: KanbanBoardComponent;
  let fixture: ComponentFixture<KanbanBoardComponent>;
  let kanbanBoardButton: KanbanBoardButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanbanBoardComponent, FakeKanbanBoardButtonComponent ],
      imports: [ MatSnackBarModule ],
      providers: [ KanbanService ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KanbanBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const debugElementOfKanbanBoardButton = fixture.debugElement.query(
      By.directive(FakeKanbanBoardButtonComponent)
    );
    kanbanBoardButton = debugElementOfKanbanBoardButton.componentInstance;
  });

  it('renders without errors', () => {
    expect(component).toBeTruthy();
  });

  it('renders an independent kanban-board-button', () => {
    expect(kanbanBoardButton).toBeTruthy();
  });

  it('listens for onInsertList events', () => {
    spyOn(component, 'handleInsertListEvent');

    kanbanBoardButton.onInsertList.emit('My List');

    expect(component.handleInsertListEvent).toHaveBeenCalledWith('My List');
  });

});
