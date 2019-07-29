import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, ReplaySubject } from 'rxjs';

import { TodoEffects } from './todo.effects';
import * as TodosActions from './todo.actions';
import { Todo } from '../../todo';
import { TodoService } from '../../services/todo.service';
import { State } from '../../state.enum';

describe('TodoEffects', () => {
  const testTodos: Todo[] = [
    {
        id: 1,
        state: State.undone,
        title: 'ex cupidatat',
        description: 'Excepteur ipsum elit dolore ut excepteur ipsum voluptate consectetur proident in.\r\n'
    },
    {
        id: 2,
        state: State.done,
        title: 'ex cupidatat',
        description: 'Excepteur ipsum elit dolore ut excepteur ipsum voluptate consectetur proident in.\r\n'
    },
  ];
  let actions: ReplaySubject<any>;
  let effects: TodoEffects;
  const todoServices = jasmine.createSpyObj('TodoService', ['getTodos', 'getTodo']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoEffects,
        provideMockActions(() => actions),
        { provide: TodoService, useValue: todoServices }
      ]
    });

    effects = TestBed.get(TodoEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('test get all todo', () => {
    actions = new ReplaySubject(1);
    actions.next(new TodosActions.GetAllTodos());

    effects.getAllTodo$.subscribe(result => {
      expect(result).toEqual(new TodosActions.GetAllTodos());
    });
  });

  it('test get todo by id', () => {
    const id = testTodos[0].id;
    actions = new ReplaySubject(1);
    actions.next(new TodosActions.GetTodo(id));

    effects.getAllTodo$.subscribe(result => {
      expect(result).toEqual(new TodosActions.GetTodo(id));
    });
  });
});
