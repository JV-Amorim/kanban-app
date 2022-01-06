import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KanbanPageComponent } from './kanban-page.component';

describe('KanbanPageComponent', () => {

  let component: KanbanPageComponent;
  let fixture: ComponentFixture<KanbanPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KanbanPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KanbanPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('renders without errors', () => {
    expect(component).toBeTruthy();
  });

});
