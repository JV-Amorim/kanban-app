import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KanbanPageRoutingModule } from './kanban-page-routing.module';
import { KanbanPageComponent } from './kanban-page.component';
import { KanbanModule } from '@features/kanban/kanban.module';

@NgModule({
  declarations: [
    KanbanPageComponent
  ],
  imports: [
    CommonModule,
    KanbanPageRoutingModule,
    KanbanModule
  ]
})
export class KanbanPageModule { }
