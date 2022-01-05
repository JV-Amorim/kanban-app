import { TestBed } from '@angular/core/testing';

import { KanbanService } from './kanban.service';

describe('KanbanService', () => {
  let service: KanbanService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [ KanbanService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(KanbanService);
  });

  it('create the service', () => {
    expect(service).toBeTruthy();
  });
});
