import { TestBed } from '@angular/core/testing';

import { TodoService } from './todo.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TodoRepositoryService } from './todo-repository.service';
import { Todo } from '../todo';
import { TodoState } from '../state.enum';
import { of } from 'rxjs';

describe('TodoService', () => {


  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ]
  }));

  it('should be created', () => {
    const service: TodoService = TestBed.get(TodoService);
    expect(service).toBeTruthy();
  });

  it('should return a list of todo', (done: DoneFn) => {
    const todolist: Todo[] = [
      {
          id: 1,
          state: TodoState.undone,
          title: 'ex cupidatat',
          description: 'Excepteur ipsum elit dolore ut excepteur ipsum voluptate consectetur proident in.\r\n'
      },
      {
          id: 2,
          state: TodoState.done,
          title: 'ex cupidatat lalala',
          description: 'Excepteur ipsum elit dolore ut excepteur ipsum voluptate consectetur proident in.\r\n'
      },
    ];
    const repo: TodoRepositoryService = TestBed.get(TodoRepositoryService);
    const service: TodoService = TestBed.get(TodoService);

    spyOn(repo, 'getAll').and.returnValue(of(todolist));

    service.getTodos().subscribe({
      next: (todos: Todo[]) => {
        expect(todos).toBe(todolist);
        done();
      }
    });
  });

  it('should return a todo by id', (done: DoneFn) => {
    const todolist: Todo[] = [
      {
          id: 1,
          state: TodoState.undone,
          title: 'ex cupidatat',
          description: 'Excepteur ipsum elit dolore ut excepteur ipsum voluptate consectetur proident in.\r\n'
      },
      {
          id: 2,
          state: TodoState.done,
          title: 'ex cupidatat lalala',
          description: 'Excepteur ipsum elit dolore ut excepteur ipsum voluptate consectetur proident in.\r\n'
      },
    ];
    const repo: TodoRepositoryService = TestBed.get(TodoRepositoryService);
    const service: TodoService = TestBed.get(TodoService);

    spyOn(repo, 'get').and.returnValue(of(todolist[0]));

    service.getTodo(1).subscribe({
      next: (todo: Todo) => {
        expect(todo.title).toBeTruthy();
        expect(todo.title).toBe('ex cupidatat');
        done();
      }
    });
  });

  it('create a todo', (done: DoneFn) => {
    const repo: TodoRepositoryService = TestBed.get(TodoRepositoryService);
    const service: TodoService = TestBed.get(TodoService);

    const newTodo = {
      state: TodoState.undone,
      title: 'ex cupidatat',
      description: 'Excepteur ipsum elit dolore ut excepteur ipsum voluptate consectetur proident in.\r\n'
    };

    spyOn(repo, 'post').and.returnValue(of({
      id: 3,
      ...newTodo
    }));

    service.createTodo(newTodo).subscribe({
      next: (todo: Todo) => {
        expect(todo.title).toBe('ex cupidatat');
        done();
      }
    });
  });

  it('update a todo', (done: DoneFn) => {
    const todolist: Todo[] = [
      {
          id: 1,
          state: TodoState.undone,
          title: 'ex cupidatat',
          description: 'Excepteur ipsum elit dolore ut excepteur ipsum voluptate consectetur proident in.\r\n'
      },
      {
          id: 2,
          state: TodoState.done,
          title: 'ex cupidatat lalala',
          description: 'Excepteur ipsum elit dolore ut excepteur ipsum voluptate consectetur proident in.\r\n'
      },
    ];
    const repo: TodoRepositoryService = TestBed.get(TodoRepositoryService);
    const service: TodoService = TestBed.get(TodoService);

    const updatedTodo = todolist[0];
    updatedTodo.title = 'updated';

    spyOn(repo, 'patch').and.returnValue(of(updatedTodo));

    service.updateTodo(updatedTodo).subscribe({
      next: (todo: Todo) => {
        expect(todo.title).toBe('updated');
        done();
      }
    });
  });


  it('delete a todo', (done: DoneFn) => {
    const todolist: Todo[] = [
      {
          id: 1,
          state: TodoState.undone,
          title: 'ex cupidatat',
          description: 'Excepteur ipsum elit dolore ut excepteur ipsum voluptate consectetur proident in.\r\n'
      },
      {
          id: 2,
          state: TodoState.done,
          title: 'ex cupidatat lalala',
          description: 'Excepteur ipsum elit dolore ut excepteur ipsum voluptate consectetur proident in.\r\n'
      },
    ];
    const repo: TodoRepositoryService = TestBed.get(TodoRepositoryService);
    const service: TodoService = TestBed.get(TodoService);
    const todo = todolist[0];

    spyOn(repo, 'delete').and.returnValue(of(todo));

    service.deleteTodo(todo).subscribe({
      next: (res: any) => {
        expect(res).toBe(todo);
        done();
      }
    });
  });
});
