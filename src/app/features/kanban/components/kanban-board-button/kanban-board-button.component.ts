import { Component, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { fromEvent, map, Subscription } from 'rxjs';

import { KanbanService } from '@features/kanban/services/kanban.service';

@Component({
  selector: 'app-kanban-board-button',
  templateUrl: './kanban-board-button.component.html',
  styleUrls: ['./kanban-board-button.component.scss']
})
export class KanbanBoardButtonComponent implements OnDestroy {

  private keyboardEventSubscription: Subscription | undefined;

  isTheInputPanelOpen = false;
  listTitle = '';

  constructor(
    private matSnackBar: MatSnackBar,
    private kanbanService: KanbanService
  ) {
    this.subscribeToKeyboardEvents();
  }

  ngOnDestroy(): void {
    if (this.keyboardEventSubscription) {
      this.keyboardEventSubscription.unsubscribe();
    }
  }

  openTheInputPanel(): void {
    this.isTheInputPanelOpen = true;
  }

  closeTheInputPanel(): void {
    this.isTheInputPanelOpen = false;
    this.resetTheListTitle();
  }

  insertNewList(): void {
    if (!this.listTitle) {
      return;
    }

    this.kanbanService.insertNewList(this.listTitle)
      .subscribe({
        error: () => {
          this.matSnackBar.open('Unable to add the list.', 'Close', { duration: 5000 });
        }
      });

    this.resetTheListTitle();
  }

  private subscribeToKeyboardEvents(): void {
    this.keyboardEventSubscription = fromEvent(document, 'keyup')
      .pipe(
        map(event => event as KeyboardEvent)
      )
      .subscribe(event => {
        if (event.key === 'Escape') {
          this.closeTheInputPanel();
        }
      });
  }

  private resetTheListTitle(): void {
    this.listTitle = '';
  }
}
