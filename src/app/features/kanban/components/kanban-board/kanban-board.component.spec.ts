import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, of } from 'rxjs';
import { MockComponent } from 'ng-mocks';

import { TestUtils } from '@core/utils';
import { KanbanBoardComponent } from './kanban-board.component';
import { KanbanBoardButtonComponent } from '../kanban-board-button/kanban-board-button.component';
import { KanbanService } from '@features/kanban/services/kanban.service';
import { KanbanBoard, kanbanBoardMock } from '@features/kanban/models';
import { KanbanListComponent } from '../kanban-list/kanban-list.component';

describe('KanbanBoardComponent', () => {

  let component: KanbanBoardComponent;
  let fixture: ComponentFixture<KanbanBoardComponent>;
  let kanbanBoardButton: KanbanBoardButtonComponent;
  let fakeKanbanService: KanbanService;

  beforeEach(async () => {
    fakeKanbanService = jasmine.createSpyObj<KanbanService>('KanbanService', {
      getKanbanBoardSubject: new BehaviorSubject<KanbanBoard>(kanbanBoardMock),
      insertNewList: undefined
    });

    await TestBed.configureTestingModule({
      declarations: [
        KanbanBoardComponent,
        MockComponent(KanbanBoardButtonComponent),
        MockComponent(KanbanListComponent)
      ],
      imports: [ MatSnackBarModule ],
      providers: [
        { provide: KanbanService, useValue: fakeKanbanService }
      ],
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

  it('listens for onInsertList events to insert a new list', () => {
    spyOn(component, 'handleInsertListEvent').and.callThrough();

    const listName = 'My List';

    kanbanBoardButton.onInsertList.emit(listName);

    expect(component.handleInsertListEvent).toHaveBeenCalledWith(listName);
    expect(fakeKanbanService.insertNewList).toHaveBeenCalledOnceWith(listName);
  });

  it('renders the correct quantity of kanban-list', () => {
    const kanbanListElements = TestUtils.findElementsByTagName(fixture, 'app-kanban-list');

    expect(kanbanListElements.length).toBe(kanbanBoardMock.length);
  });

  it('update the rendered kanban-lists with new data', () => {
    const newKanbanBoardData = kanbanBoardMock.slice(0, 2);
    
    const kanbanBoardSubject = fakeKanbanService.getKanbanBoardSubject();
    kanbanBoardSubject.next(newKanbanBoardData);
    fixture.detectChanges();

    const kanbanListElements = TestUtils.findElementsByTagName(fixture, 'app-kanban-list');

    expect(kanbanListElements.length).toBe(newKanbanBoardData.length);
  });

  it('assigns a KanbanList object to each kanban-list child component', () => {
    const kanbanListElements = TestUtils.findElementsByTagName(fixture, 'app-kanban-list');

    for (const kanbanListElement of kanbanListElements) {
      const kanbanListComponent: KanbanListComponent = kanbanListElement.componentInstance;
      expect(kanbanListComponent.kanbanList).toBeTruthy();
    }
  });

});
