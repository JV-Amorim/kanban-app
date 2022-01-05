import { KanbanList } from '..';

export interface KanbanCard {
  id: number;
  name: string;
  parentList: KanbanList;
}
