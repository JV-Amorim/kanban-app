import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';

import { BrowserStorageService } from '@core/services/browser-storage.service';
import { KanbanBoard, KanbanCard, KanbanErrors, KanbanList } from '../models';

@Injectable()
export class KanbanService {

  private readonly browserStorageKey = 'kanban-board-data';
  private kanbanBoardSubject: BehaviorSubject<KanbanBoard>;
  private lastEmittedKanbanBoard: KanbanBoard = [];

  constructor(private browserStorageService: BrowserStorageService) {
    this.getInitialKanbanBoardData();
    this.kanbanBoardSubject = new BehaviorSubject<KanbanBoard>(this.lastEmittedKanbanBoard);
  }

  private getInitialKanbanBoardData(): void {
    let initialData: KanbanBoard | null;

    try {
      initialData = this.browserStorageService.getItem(this.browserStorageKey);
    }
    catch {
      initialData = null;
    }

    this.lastEmittedKanbanBoard = initialData ?? [];
  }

  getKanbanBoardSubject(): BehaviorSubject<KanbanBoard> {
    return this.kanbanBoardSubject;
  }

  insertNewList(listTitle: string): Observable<KanbanList> {
    const kanbanBoard = this.getCopyOfTheLastEmittedKanbanBoard();

    const newList = {
      id: kanbanBoard.length + 1,
      title: listTitle,
      childrenCards: []
    };
    
    kanbanBoard.push(newList);

    try {
      this.browserStorageService.insertItem(this.browserStorageKey, kanbanBoard);
    }
    catch (error) {
      kanbanBoard.pop();
      return throwError(() => error);
    }

    this.emitUpdatedKanbanBoard(kanbanBoard);
    
    return of(newList);
  }

  private getCopyOfTheLastEmittedKanbanBoard(): KanbanBoard {
    return [ ...this.lastEmittedKanbanBoard ];
  }

  private emitUpdatedKanbanBoard(updatedKanbanBoard: KanbanBoard): void {
    this.lastEmittedKanbanBoard = updatedKanbanBoard;
    this.kanbanBoardSubject.next(this.lastEmittedKanbanBoard);
  }

  insertNewCard(cardName: string, parentListId: number): Observable<KanbanCard> {
    const kanbanBoard = this.getCopyOfTheLastEmittedKanbanBoard();

    const parentList = kanbanBoard.find(list => list.id === parentListId);
    if (!parentList) {
      return throwError(() => new Error(KanbanErrors.NonExistentParentList));
    }

    const newCard = {
      id: parentList.childrenCards.length + 1,
      name: cardName,
      parentList
    };

    parentList.childrenCards.push(newCard);

    try {
      this.browserStorageService.insertItem(this.browserStorageKey, kanbanBoard);
    }
    catch (error) {
      parentList.childrenCards.pop();
      return throwError(() => error);
    }

    this.emitUpdatedKanbanBoard(kanbanBoard);

    return of(newCard);
  }
}
