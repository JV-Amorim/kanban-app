import { KanbanCard } from '..';

export interface KanbanList {
  id: number;
  title: string;
  childrenCards: KanbanCard[];
}
