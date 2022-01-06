import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { KanbanBoardComponent } from './kanban-board.component';
import { KanbanService } from '@features/kanban/services/kanban.service';
import { TestUtils } from '@core/utils';

describe('KanbanBoardComponent', () => {

  let component: KanbanBoardComponent;
  let fixture: ComponentFixture<KanbanBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanbanBoardComponent ],
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
  });

  it('renders without errors', () => {
    expect(component).toBeTruthy();
  });

  it('renders an independent kanban-board-button', () => {
    const kanbanBoardButton = TestUtils.findElementByTagName(fixture, 'app-kanban-board-button');
    expect(kanbanBoardButton).toBeTruthy();
  });

  it('listens for onInsertList events', () => {
    spyOn(component, 'handleInsertListEvent');

    const kanbanBoardButton = TestUtils.findElementByTagName(fixture, 'app-kanban-board-button');
    kanbanBoardButton.triggerEventHandler('onInsertList', 'My List');

    expect(component.handleInsertListEvent).toHaveBeenCalledWith('My List');
  });

});
