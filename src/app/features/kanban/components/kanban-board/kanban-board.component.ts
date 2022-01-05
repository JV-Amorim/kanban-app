import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(private kanbanService: KanbanService) { }

  ngOnInit(): void {
    this.subscribeToKanbanBoardSubject();
  }

  ngOnDestroy(): void {
    if (this.kanbanBoardSubscription) {
      this.kanbanBoardSubscription.unsubscribe();
    }
  }

  private subscribeToKanbanBoardSubject(): void {
    this.kanbanBoardSubscription = this.kanbanService.getKanbanBoardSubject()
      .subscribe(kanbanBoard => this.kanbanBoardData = kanbanBoard);
  }
}
