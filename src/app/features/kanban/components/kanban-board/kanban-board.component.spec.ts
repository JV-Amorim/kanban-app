import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanBoardComponent } from './kanban-board.component';
import { KanbanService } from '@features/kanban/services/kanban.service';

describe('KanbanBoardComponent', () => {

  let component: KanbanBoardComponent;
  let fixture: ComponentFixture<KanbanBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanbanBoardComponent ],
      providers: [ KanbanService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KanbanBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('create the component', () => {
    expect(component).toBeTruthy();
  });

});
