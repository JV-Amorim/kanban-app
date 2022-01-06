import { Component, EventEmitter, OnDestroy, Output } from '@angular/core';
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
  
  @Output() onInsertList = new EventEmitter<string>();

  constructor(private kanbanService: KanbanService) {
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
    this.onInsertList.emit(this.listTitle);
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
