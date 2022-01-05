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

  insertNewList(listTitle: string): Observable<boolean> {
    const kanbanBoard = this.getCopyOfTheLastEmittedKanbanBoard();

    kanbanBoard.push({
      id: kanbanBoard.length + 1,
      title: listTitle,
      childrenCards: []
    });

    this.emitUpdatedKanbanBoard(kanbanBoard);

    return of(true);
  }

  insertNewCard(cardName: string, parentListId: number): Observable<boolean> {
    const kanbanBoard = this.getCopyOfTheLastEmittedKanbanBoard();

    for (const kanbanList of kanbanBoard) {
      if (kanbanList.id === parentListId) {
        return this.insertNewCardInTheKanbanList(cardName, kanbanList);
      }
    }

    return throwError(() => new Error(KanbanErrors.NonExistentParentList));
  }

  private emitUpdatedKanbanBoard(updatedKanbanBoard: KanbanBoard): void {
    this.lastEmittedKanbanBoard = updatedKanbanBoard;
    this.kanbanBoardSubject.next(this.lastEmittedKanbanBoard);
  }

  private getCopyOfTheLastEmittedKanbanBoard(): KanbanBoard {
    return [ ...this.lastEmittedKanbanBoard ];
  }

  private insertNewCardInTheKanbanList(cardName: string, kanbanList: KanbanList): Observable<boolean> {
    kanbanList.childrenCards.push({
      id: kanbanList.childrenCards.length + 1,
      name: cardName,
      parentList: kanbanList
    });
    
    const kanbanBoard = this.getCopyOfTheLastEmittedKanbanBoard();
    const kanbanListIndex = kanbanBoard.findIndex(list => list.id === kanbanList.id);
    kanbanBoard[kanbanListIndex] = kanbanList;

    this.emitUpdatedKanbanBoard(kanbanBoard);

    return of(true);
  }
}
