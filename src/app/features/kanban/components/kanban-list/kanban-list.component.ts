import { Component, Input, OnInit } from '@angular/core';
import { KanbanList } from '@features/kanban/models';

@Component({
  selector: 'app-kanban-list',
  templateUrl: './kanban-list.component.html',
  styleUrls: ['./kanban-list.component.scss']
})
export class KanbanListComponent implements OnInit {

  @Input() kanbanList: KanbanList | undefined;

  constructor() { }

  ngOnInit(): void { }

}
