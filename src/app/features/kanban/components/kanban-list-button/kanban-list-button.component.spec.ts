import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanListButtonComponent } from './kanban-list-button.component';

describe('KanbanListButtonComponent', () => {
  let component: KanbanListButtonComponent;
  let fixture: ComponentFixture<KanbanListButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanbanListButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KanbanListButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
