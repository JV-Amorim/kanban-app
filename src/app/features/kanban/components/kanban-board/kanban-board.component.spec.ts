import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { MockComponent } from 'ng-mocks';

import { KanbanService } from '@features/kanban/services/kanban.service';
import { KanbanBoardComponent } from './kanban-board.component';
import { KanbanBoardButtonComponent } from '../kanban-board-button/kanban-board-button.component';

describe('KanbanBoardComponent', () => {

  let component: KanbanBoardComponent;
  let fixture: ComponentFixture<KanbanBoardComponent>;
  let kanbanBoardButton: KanbanBoardButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanbanBoardComponent, MockComponent(KanbanBoardButtonComponent) ],
      imports: [ MatSnackBarModule ],
      providers: [ KanbanService ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KanbanBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    const debugElementOfKanbanBoardButton = fixture.debugElement.query(
      By.directive(KanbanBoardButtonComponent)
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
