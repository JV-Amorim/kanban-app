import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanListItemComponent } from './kanban-list-item.component';

describe('KanbanListItemComponent', () => {

  let component: KanbanListItemComponent;
  let fixture: ComponentFixture<KanbanListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanbanListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KanbanListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders without errors', () => {
    expect(component).toBeTruthy();
  });

});
