import { Component, OnDestroy } from '@angular/core';
import { fromEvent, map, Subscription } from 'rxjs';

@Component({
  selector: 'app-kanban-board-button',
  templateUrl: './kanban-board-button.component.html',
  styleUrls: ['./kanban-board-button.component.scss']
})
export class KanbanBoardButtonComponent implements OnDestroy {

  private keyboardEventSubscription: Subscription | undefined;

  isTheInputPanelOpen = false;
  listTitle = '';

  constructor() {
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
    // TODO - Insert the new list by calling a service method.
    console.log(this.listTitle);
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
