import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { TodoEffects } from './todo.effects';
import * as TodosActions from './todo.actions';
import { Todo } from '../../todo';
import { TodoState } from '../../state.enum';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TodoService } from 'src/app/services/todo.service';
import { cold, hot } from 'jasmine-marbles';

describe('TodoEffects', () => {
  let todoListServiceMock: jasmine.SpyObj<TodoService>;
  let actions: Observable<any>;
  let effects: TodoEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
      providers: [
        TodoEffects,
        provideMockActions(() => actions),
        {
          provide: TodoService,
          useValue: {
            getTodos: jasmine.createSpy(),
            getTodo: jasmine.createSpy(),
            createTodo: jasmine.createSpy(),
            updateTodo: jasmine.createSpy(),
            deleteTodo: jasmine.createSpy(),
          }
        }
      ],
    });
    effects = TestBed.get(TodoEffects);
    todoListServiceMock = TestBed.get(TodoService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should return a stream with todo list loaded action', (done: DoneFn) => {
    const todolistMock: Todo[] = [
      {
          id: 1,
          state: TodoState.undone,
          title: 'ex cupidatat',
          description: 'Excepteur ipsum elit dolore ut excepteur ipsum voluptate consectetur proident in.\r\n'
      },
      {
          id: 2,
          state: TodoState.done,
          title: 'ex cupidatat',
          description: 'Excepteur ipsum elit dolore ut excepteur ipsum voluptate consectetur proident in.\r\n'
      },
    ];
    const action = TodosActions.GetAllTodos();
    const outcome = TodosActions.GetAllTodosSuccess({todolist: todolistMock});
    const outcome2 = TodosActions.SortAllTodos();

    actions = hot('-a', { a: action });
    const response = cold('-a|', { a: todolistMock});

    todoListServiceMock.getTodos.and.returnValue(response);

    const expected = cold('--(bc)', {
      b: outcome,
      c: outcome2
     });

    expect(effects.getAllTodo$).toBeObservable(expected);

    done();
  });

  it('should return a stream with a todo loaded action', (done: DoneFn) => {
    const todolistMock: Todo[] = [
      {
          id: 1,
          state: TodoState.undone,
          title: 'ex cupidatat',
          description: 'Excepteur ipsum elit dolore ut excepteur ipsum voluptate consectetur proident in.\r\n'
      },
      {
          id: 2,
          state: TodoState.done,
          title: 'ex cupidatat',
          description: 'Excepteur ipsum elit dolore ut excepteur ipsum voluptate consectetur proident in.\r\n'
      },
    ];
    const action = TodosActions.GetTodo({id: todolistMock[0].id});
    const outcome = TodosActions.GetTodoSuccess({todo: todolistMock[0]});

    actions = hot('-a', { a: action });
    const response = cold('-a|', { a: todolistMock[0]});

    todoListServiceMock.getTodo.and.returnValue(response);

    const expected = cold('--b', {
      b: outcome,
     });

    expect(effects.getTodo$).toBeObservable(expected);

    done();
  });

  it('should return a stream with an updated todo action', (done: DoneFn) => {
    const todolistMock: Todo[] = [
      {
          id: 1,
          state: TodoState.undone,
          title: 'ex cupidatat',
          description: 'Excepteur ipsum elit dolore ut excepteur ipsum voluptate consectetur proident in.\r\n'
      },
      {
          id: 2,
          state: TodoState.done,
          title: 'ex cupidatat',
          description: 'Excepteur ipsum elit dolore ut excepteur ipsum voluptate consectetur proident in.\r\n'
      },
    ];
    const updateTodo: Todo = {
      ...todolistMock[0],
      title: 'updated'
    };

    const action = TodosActions.UpdateTodo({todo: updateTodo});
    const outcome = TodosActions.UpdateTodoSuccess({todo: updateTodo});
    const outcome2 = TodosActions.SortAllTodos();

    actions = hot('-a', { a: action });
    const response = cold('-a|', { a: updateTodo});

    todoListServiceMock.updateTodo.and.returnValue(response);

    const expected = cold('--(bc)', {
      b: outcome,
      c: outcome2
     });

    expect(effects.updateTodo$).toBeObservable(expected);

    done();
  });

  it('should return a stream with an deleted todo action', (done: DoneFn) => {
    const todolistMock: Todo[] = [
      {
          id: 1,
          state: TodoState.undone,
          title: 'ex cupidatat',
          description: 'Excepteur ipsum elit dolore ut excepteur ipsum voluptate consectetur proident in.\r\n'
      },
      {
          id: 2,
          state: TodoState.done,
          title: 'ex cupidatat',
          description: 'Excepteur ipsum elit dolore ut excepteur ipsum voluptate consectetur proident in.\r\n'
      },
    ];
    const deleteTodo: Todo = todolistMock[0];

    const action = TodosActions.DeleteTodo({todo: deleteTodo});
    const outcome = TodosActions.DeleteTodoSuccess({todo: deleteTodo});

    actions = hot('-a', { a: action });
    const response = cold('-a|', { a: deleteTodo});

    todoListServiceMock.deleteTodo.and.returnValue(response);

    const expected = cold('--b', {
      b: outcome,
     });

    expect(effects.removeTodo$).toBeObservable(expected);

    done();
  });

  it('should fail and return an action with the error', () => {
    const error = new Error('some error') as any;
    const action = TodosActions.GetAllTodos();
    const outcome = TodosActions.ErrorTodo({error});

    actions = hot('-a', { a: action });
    const response = cold('-#|', {}, {error});
    todoListServiceMock.getTodos.and.returnValue(response);

    const expected = cold('--e', { e: outcome });
    expect(effects.getAllTodo$).toBeObservable(expected);
  });
});
