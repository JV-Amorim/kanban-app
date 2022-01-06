import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';

import { KanbanBoard, KanbanErrors, KanbanList } from '../models';

@Injectable()
export class KanbanService {

  private kanbanBoardSubject: BehaviorSubject<KanbanBoard>;
  private lastEmittedKanbanBoard: KanbanBoard;

  constructor() {
    this.lastEmittedKanbanBoard = [];
    this.kanbanBoardSubject = new BehaviorSubject<KanbanBoard>(this.lastEmittedKanbanBoard);
  }

  getKanbanBoardSubject(): BehaviorSubject<KanbanBoard> {
    return this.kanbanBoardSubject;
  }

  insertNewList(listTitle: string): Observable<any> {
    const kanbanBoard = this.getCopyOfTheLastEmittedKanbanBoard();

    kanbanBoard.push({
      id: kanbanBoard.length + 1,
      title: listTitle,
      childrenCards: []
    });

    this.emitUpdatedKanbanBoard(kanbanBoard);

    return of(true);
  }

  insertNewCard(cardName: string, parentListId: number): Observable<any> {
    const kanbanBoard = this.getCopyOfTheLastEmittedKanbanBoard();

    const parentList = kanbanBoard.find(list => list.id === parentListId);
    if (!parentList) {
      return throwError(() => new Error(KanbanErrors.NonExistentParentList));
    }
    parentList.childrenCards.push({
      id: parentList.childrenCards.length + 1,
      name: cardName,
      parentList
    });

    this.emitUpdatedKanbanBoard(kanbanBoard);

    return of(true);
  }

  private emitUpdatedKanbanBoard(updatedKanbanBoard: KanbanBoard): void {
    this.lastEmittedKanbanBoard = updatedKanbanBoard;
    this.kanbanBoardSubject.next(this.lastEmittedKanbanBoard);
  }

  private getCopyOfTheLastEmittedKanbanBoard(): KanbanBoard {
    return [ ...this.lastEmittedKanbanBoard ];
  }
}
