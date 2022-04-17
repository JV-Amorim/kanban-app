import { Component, Input, OnInit } from '@angular/core';

import { KanbanCard } from '@features/kanban/models';

@Component({
  selector: 'app-kanban-list-item',
  templateUrl: './kanban-list-item.component.html',
  styleUrls: ['./kanban-list-item.component.scss']
})
export class KanbanListItemComponent implements OnInit {

  @Input() kanbanCard: KanbanCard | undefined;

  constructor() { }

  ngOnInit(): void { }

}
