import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import * as todosActions from './todo.actions';
import { map, catchError, concatMap } from 'rxjs/operators';
import { TodoService } from '../../services/todo.service';
import { Todo } from 'src/app/todo';

@Injectable()
export class TodoEffects {

  constructor(
    private actions$: Actions,
    private todosService: TodoService
  ) {}

  @Effect()
  getAllTodo$ = this.actions$.pipe(
    ofType(todosActions.GetAllTodos),
    concatMap(() => this.todosService
        .getTodos()
        .pipe(
          map(todolist => (todosActions.GetAllTodosSuccess(todolist))),
          // map(() => (todosActions.SortAllTodos())),
          // catchError(error => of(todosActions.ErrorTodo(error)))
        )
    )
  );
/*
  @Effect()
  getTodo$ = this.actions$.pipe(
    ofType(todosActions.GetTodo),
    concatMap((id) => this.todosService
        .getTodo(id)
        .pipe(
          map(todo => (todosActions.GetTodoSuccess({todo}))),
          catchError(error => of(todosActions.ErrorTodo(error)))
        )
    )
  );
/*
  @Effect()
  updateTodo$ = this.actions$.pipe(
    ofType(todosActions.UpdateTodo),
    concatMap((todo) => this.todosService
        .updateTodo(todo)
        .pipe(
          map(todo => (todosActions.UpdateTodoSuccess(todo)),
          catchError(error => of(todosActions.ErrorTodo(error)))
        )
    )
  );

  @Effect()
  updateTodo$ = this.actions$.pipe(
    ofType(todosActions.ActionTypes.UpdateTodo),
    map((action: todosActions.UpdateTodo) => action.payload),
    mergeMap((todo) => this.todosService.updateTodo(todo)
        .pipe(
          map(todo => ({ type: todosActions.ActionTypes.UpdateTodoSuccess, payload: todo })),
          map(() => ({ type: todosActions.ActionTypes.SortAllTodos })),
          catchError(() => of({ type: todosActions.ActionTypes.ErrorTodo }))
        ))
  );

  @Effect()
  createTodo$ = this.actions$.pipe(
    ofType(todosActions.ActionTypes.CreateTodo),
    map((action: todosActions.CreateTodo) => action.payload),
    mergeMap((todo) => this.todosService.createTodo(todo)
        .pipe(
          map(todo => ({ type: todosActions.ActionTypes.CreateTodoSuccess, payload: todo })),
          catchError(() => of({ type: todosActions.ActionTypes.ErrorTodo }))
        ))
  );

  @Effect()
  removeTodo$ = this.actions$.pipe(
    ofType(todosActions.ActionTypes.DeleteTodo),
    map((action: todosActions.DeleteTodo) => action.payload),
    mergeMap((todo) => this.todosService.deleteTodo(todo)
    .pipe(
      map(todo => ({ type: todosActions.ActionTypes.DeleteTodoSuccess, payload: todo })),
      catchError(() => of({ type: todosActions.ActionTypes.ErrorTodo }))
    ))
  );
  */
}
