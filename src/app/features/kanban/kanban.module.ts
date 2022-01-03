import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';
import { KanbanListComponent } from './components/kanban-list/kanban-list.component';
import { KanbanListItemComponent } from './components/kanban-list-item/kanban-list-item.component';
import { KanbanBoardButtonComponent } from './components/kanban-board-button/kanban-board-button.component';

@NgModule({
  declarations: [
    KanbanBoardComponent,
    KanbanListComponent,
    KanbanListItemComponent,
    KanbanBoardButtonComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    KanbanBoardComponent
  ]
})
export class KanbanModule { }
