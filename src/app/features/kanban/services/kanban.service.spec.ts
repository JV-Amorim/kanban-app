import { TestBed } from '@angular/core/testing';
import { first, map } from 'rxjs';

import { KanbanBoard, KanbanCard, KanbanList } from '../models';
import { KanbanService } from './kanban.service';

describe('KanbanService', () => {
  let service: KanbanService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ KanbanService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(KanbanService);
  });

  it('is created without errors', () => {
    expect(service).toBeTruthy();
  });

  it('returns a valid KanbanBoard data', () => {
    let actualKanbanBoard: KanbanBoard | undefined;
    service.getKanbanBoardSubject()
      .pipe(first())
      .subscribe(kanbanBoard => actualKanbanBoard = kanbanBoard);

    expect(actualKanbanBoard).toBeTruthy();
  });

  it('inserts a new KanbanList', () => {
    const titleOfNewKanbanList = 'My List';
    let actualNewKanbanList: KanbanList | undefined;
    service.insertNewList(titleOfNewKanbanList)
      .subscribe(newKanbanList => actualNewKanbanList = newKanbanList);

    expect(actualNewKanbanList).toBeTruthy();
    expect(actualNewKanbanList?.title).toBe(titleOfNewKanbanList);
    expect(actualNewKanbanList?.id).not.toBeUndefined();
    expect(actualNewKanbanList?.id).not.toBeNull();
    expect(actualNewKanbanList?.childrenCards).toEqual([]);
  });

  it('inserts a new KanbanCard', () => {    
    let parentKanbanList!: KanbanList;
    service.insertNewList('My List')
      .subscribe(kanbanList => parentKanbanList = kanbanList);

    const nameOfNewCard = 'My Card';
    let actualNewKanbanCard: KanbanCard | undefined;    
    service.insertNewCard(nameOfNewCard, parentKanbanList.id)
      .subscribe(kanbanCard => actualNewKanbanCard = kanbanCard);

    expect(actualNewKanbanCard).toBeTruthy();
    expect(actualNewKanbanCard?.name).toEqual(nameOfNewCard);
    expect(actualNewKanbanCard?.id).not.toBeUndefined();
    expect(actualNewKanbanCard?.id).not.toBeNull();
    expect(actualNewKanbanCard?.parentList?.id).toBe(parentKanbanList.id);
  });
});
