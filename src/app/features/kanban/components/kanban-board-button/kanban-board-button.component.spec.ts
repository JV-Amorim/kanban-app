import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanBoardButtonComponent } from './kanban-board-button.component';

describe('KanbanBoardButtonComponent', () => {

  let component: KanbanBoardButtonComponent;
  let fixture: ComponentFixture<KanbanBoardButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanbanBoardButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KanbanBoardButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('create the component', () => {
    expect(component).toBeTruthy();
  });

});
