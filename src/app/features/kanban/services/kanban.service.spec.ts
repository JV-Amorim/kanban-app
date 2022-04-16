import { TestBed } from '@angular/core/testing';
import { first } from 'rxjs';

import { BrowserStorageService } from '@core/services/browser-storage.service';
import { KanbanBoard, kanbanBoardMock, KanbanCard, KanbanList } from '../models';
import { KanbanService } from './kanban.service';

describe('KanbanService', () => {

  let service: KanbanService;
  let fakeBrowserStorageService: BrowserStorageService;

  beforeEach(async () => {
    fakeBrowserStorageService = jasmine.createSpyObj<BrowserStorageService>(
      'BrowserStorageService',
      {
        getItem: kanbanBoardMock,
        insertItem: undefined
      }
    );

    await TestBed.configureTestingModule({
      providers: [
        { provide: BrowserStorageService, useValue: fakeBrowserStorageService },
        KanbanService
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(KanbanService);
  });

  it('is created without errors', () => {
    expect(service).toBeTruthy();
  });

  it('gets and returns the initial data from browser storage', () => {
    let actualKanbanBoard: KanbanBoard | undefined;
    service.getKanbanBoardSubject()
      .pipe(first())
      .subscribe(kanbanBoard => {
        actualKanbanBoard = kanbanBoard;
      });

    expect(fakeBrowserStorageService.getItem).toHaveBeenCalled();
    expect(actualKanbanBoard).toBeTruthy();
    expect(actualKanbanBoard?.length).toBe(kanbanBoardMock.length);
  });

  it('inserts a new KanbanList', () => {
    const titleOfNewKanbanList = 'My List';
    let actualNewKanbanList: KanbanList | undefined;
    service.insertNewList(titleOfNewKanbanList)
      .subscribe(newKanbanList => actualNewKanbanList = newKanbanList);

    expect(fakeBrowserStorageService.insertItem).toHaveBeenCalled();
    expect(actualNewKanbanList).toBeTruthy();
    expect(actualNewKanbanList?.title).toBe(titleOfNewKanbanList);
    expect(actualNewKanbanList?.id).not.toBeUndefined();
    expect(actualNewKanbanList?.id).not.toBeNull();
    expect(actualNewKanbanList?.childrenCards).toEqual([]);
  });

  it('throws an error if fails to insert a new KanbanList', () => {
    fakeBrowserStorageService.insertItem = jasmine.createSpy().and.throwError('');

    let hasDetectedError = false;
    service.insertNewList('My List')
      .subscribe({
        error: () => hasDetectedError = true
      });

    expect(hasDetectedError).toBeTrue();
  });

  it('inserts a new KanbanCard', () => {    
    let parentKanbanList!: KanbanList;
    service.insertNewList('My List')
      .subscribe(kanbanList => parentKanbanList = kanbanList);

    const nameOfNewCard = 'My Card';
    let actualNewKanbanCard: KanbanCard | undefined;    
    service.insertNewCard(nameOfNewCard, parentKanbanList.id)
      .subscribe(kanbanCard => actualNewKanbanCard = kanbanCard);

    expect(fakeBrowserStorageService.insertItem).toHaveBeenCalled();
    expect(actualNewKanbanCard).toBeTruthy();
    expect(actualNewKanbanCard?.name).toEqual(nameOfNewCard);
    expect(actualNewKanbanCard?.id).not.toBeUndefined();
    expect(actualNewKanbanCard?.id).not.toBeNull();
    expect(actualNewKanbanCard?.parentList?.id).toBe(parentKanbanList.id);
  });

  it('throws an error if fails to insert a new KanbanCard', () => {
    fakeBrowserStorageService.insertItem = jasmine.createSpy().and.throwError('');

    let hasDetectedError = false;
    service.insertNewCard('My Card', 1)
      .subscribe({
        error: () => hasDetectedError = true
      });

    expect(hasDetectedError).toBeTrue();
  });
});
