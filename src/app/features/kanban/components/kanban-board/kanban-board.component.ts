import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';

import { KanbanService } from '@features/kanban/services/kanban.service';
import { KanbanBoard } from '@features/kanban/models';

@Component({
  selector: 'app-kanban-board',
  templateUrl: './kanban-board.component.html',
  styleUrls: ['./kanban-board.component.scss']
})
export class KanbanBoardComponent implements OnInit, OnDestroy {

  private kanbanBoardSubscription: Subscription | undefined;

  kanbanBoardData: KanbanBoard | undefined;

  constructor(
    private matSnackBar: MatSnackBar,
    private kanbanService: KanbanService
  ) { }

  ngOnInit(): void {
    this.subscribeToKanbanBoardSubject();
  }

  ngOnDestroy(): void {
    if (this.kanbanBoardSubscription) {
      this.kanbanBoardSubscription.unsubscribe();
    }
  }

  handleInsertListEvent(listTitle: string): void {
    this.kanbanService.insertNewList(listTitle)
      .subscribe({
        error: () => {
          this.matSnackBar.open('Unable to add the list.', 'Close', { duration: 5000 });
        }
      });
  }

  private subscribeToKanbanBoardSubject(): void {
    this.kanbanBoardSubscription = this.kanbanService.getKanbanBoardSubject()
      .subscribe(kanbanBoard => this.kanbanBoardData = kanbanBoard);
  }
}
