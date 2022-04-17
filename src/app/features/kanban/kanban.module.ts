import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { KanbanBoardComponent } from './components/kanban-board/kanban-board.component';
import { KanbanListComponent } from './components/kanban-list/kanban-list.component';
import { KanbanListItemComponent } from './components/kanban-list-item/kanban-list-item.component';
import { KanbanBoardButtonComponent } from './components/kanban-board-button/kanban-board-button.component';
import { KanbanService } from './services/kanban.service';
import { SvgIconModule } from '@shared/svg-icon/svg-icon.module';
import { KanbanListButtonComponent } from './components/kanban-list-button/kanban-list-button.component';

@NgModule({
  declarations: [
    KanbanBoardComponent,
    KanbanListComponent,
    KanbanListItemComponent,
    KanbanBoardButtonComponent,
    KanbanListButtonComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SvgIconModule,
    MatSnackBarModule
  ],
  exports: [
    KanbanBoardComponent
  ],
  providers: [
    KanbanService
  ]
})
export class KanbanModule { }
