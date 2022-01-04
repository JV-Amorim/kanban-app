import { Component } from '@angular/core';

@Component({
  selector: 'app-kanban-board-button',
  templateUrl: './kanban-board-button.component.html',
  styleUrls: ['./kanban-board-button.component.scss']
})
export class KanbanBoardButtonComponent {

  isTheInputPanelOpen = false;
  listTitle = '';

  constructor() { }

  openTheInputPanel(): void {
    this.resetTheListTitleInput();
    this.isTheInputPanelOpen = true;
  }

  closeTheInputPanel(): void {
    this.isTheInputPanelOpen = false;
  }

  insertNewList(): void {
    // TODO - Insert the new list by calling a service method.
    console.log(this.listTitle);
  }

  private resetTheListTitleInput(): void {
    this.listTitle = '';
  }
}
