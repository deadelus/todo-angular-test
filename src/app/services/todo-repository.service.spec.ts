import { TestBed } from '@angular/core/testing';

import { TodoRepositoryService } from './todo-repository.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TodoRepositoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: TodoRepositoryService = TestBed.get(TodoRepositoryService);
    expect(service).toBeTruthy();
  });
});
