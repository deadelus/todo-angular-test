import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import * as todosActions from './todo.actions';
import { map, catchError, concatMap, switchMap, debounceTime } from 'rxjs/operators';
import { TodoService } from '../../services/todo.service';

@Injectable()
export class TodoEffects {

  constructor(
    private actions$: Actions,
    private todosService: TodoService
  ) {}

  @Effect()
  getTodo$ = this.actions$.pipe(
    ofType(todosActions.GetTodo),
    concatMap((payload) => this.todosService
      .getTodo(payload.id)
      .pipe(
        switchMap(todo => [
          (todosActions.GetTodoSuccess({todo}))
        ]),
        catchError(error => of(todosActions.ErrorTodo(error)))
      )
    )
  );

  @Effect()
  getAllTodo$ = this.actions$.pipe(
    ofType(todosActions.GetAllTodos),
    concatMap(() => this.todosService
      .getTodos()
      .pipe(
        switchMap(todolist => [
          (todosActions.GetAllTodosSuccess({todolist})),
          (todosActions.SortAllTodos()),
        ]),
        catchError(error => of(todosActions.ErrorTodo(error)))
      )
    )
  );

  @Effect()
  createTodo$ = this.actions$.pipe(
    ofType(todosActions.CreateTodo),
    concatMap((payload) => this.todosService
      .createTodo(payload.todo)
      .pipe(
        map(todo => (todosActions.CreateTodoSuccess({todo}))),
        catchError(error => of(todosActions.ErrorTodo(error)))
      )
    )
  );

  @Effect()
  updateTodo$ = this.actions$.pipe(
    ofType(todosActions.UpdateTodo),
    concatMap((payload) => this.todosService
      .updateTodo(payload.todo)
      .pipe(
        switchMap(todo => [
          (todosActions.UpdateTodoSuccess({todo})),
          (todosActions.SortAllTodos())
        ]),
        catchError(error => of(todosActions.ErrorTodo(error)))
      )
    )
  );

  @Effect()
  removeTodo$ = this.actions$.pipe(
    // debounceTime(1000),
    ofType(todosActions.DeleteTodo),
    concatMap((payload) => this.todosService
      .deleteTodo(payload.todo)
      .pipe(
        map(todo => (todosActions.DeleteTodoSuccess({todo}))),
        catchError(error => of(todosActions.ErrorTodo(error)))
      )
    )
  );
}
