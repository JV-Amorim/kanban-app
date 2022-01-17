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
import { KanbanBoard } from '@features/kanban/models';

describe('KanbanBoardComponent', () => {

  const kanbanBoardData: KanbanBoard = [
    { id: 1, title: 'My First List', childrenCards: [] },
    { id: 2, title: 'My Second List', childrenCards: [] },
    { id: 3, title: 'My Third List', childrenCards: [] }
  ];

  let component: KanbanBoardComponent;
  let fixture: ComponentFixture<KanbanBoardComponent>;
  let kanbanBoardButton: KanbanBoardButtonComponent;
  let fakeKanbanService: KanbanService;

  beforeEach(async () => {
    fakeKanbanService = jasmine.createSpyObj<KanbanService>('KanbanService', {
      getKanbanBoardSubject: new BehaviorSubject<KanbanBoard>(kanbanBoardData)
    });

    await TestBed.configureTestingModule({
      declarations: [ KanbanBoardComponent, MockComponent(KanbanBoardButtonComponent) ],
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

  describe('kanban-board-button child component', () => {

    it('renders an independent kanban-board-button', () => {
      expect(kanbanBoardButton).toBeTruthy();
    });
  
    it('listens for onInsertList events', () => {
      spyOn(component, 'handleInsertListEvent');
  
      kanbanBoardButton.onInsertList.emit('My List');
  
      expect(component.handleInsertListEvent).toHaveBeenCalledWith('My List');
    });
    
  });

  describe('kanban-list child components', () => {

    it('renders the correct quantity of kanban-list', () => {
      const kanbanListElements = TestUtils.findElementsByTagName(fixture, 'app-kanban-list');

      expect(fakeKanbanService.getKanbanBoardSubject).toHaveBeenCalled();
      expect(kanbanListElements.length).toBe(kanbanBoardData.length);
    });

    it('update the rendered kanban-lists with new data', () => {
      const newKanbanBoardData = kanbanBoardData.slice(0, 2);
      
      const kanbanBoardSubject = fakeKanbanService.getKanbanBoardSubject();
      kanbanBoardSubject.next(newKanbanBoardData);
      fixture.detectChanges();

      const kanbanListElements = TestUtils.findElementsByTagName(fixture, 'app-kanban-list');

      expect(kanbanListElements.length).toBe(newKanbanBoardData.length);
    });

  });

});
