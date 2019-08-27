import { Todo } from '../../todo';
import { Action, createReducer, on } from '@ngrx/store';
import * as TodoActions from 'src/app/store/todo/todo.actions';

export interface State {
  todolist: Todo[];
  todo: Todo;
  loading: boolean;
  error: Error;
}

export const InitialState: State = {
  todolist: [],
  todo: null,
  error: null,
  loading: false
};

const reducer = createReducer(
  InitialState,

  on(TodoActions.ErrorTodo, (state, { error }) => ({
    ...state,
    error,
    loading: false
  })),

  on(TodoActions.SortAllTodos, (state) => {
    const todolist = state.todolist.slice().sort((a, b) => b.state - a.state);
    return {
      ...state,
      todolist
    };
  }),

  on(TodoActions.GetAllTodos, state => ({
    ...state,
    error: null,
    loading: true
  })),
  on(TodoActions.GetAllTodosSuccess, (state, { todolist }) => ({
    ...state,
    todolist,
    error: null,
    loading: false
  })),

  on(TodoActions.GetTodo, state => ({
    ...state,
    todo: null,
    error: null,
    loading: true
  })),
  on(TodoActions.GetTodoSuccess, (state, { todo }) => ({
    ...state,
    todo,
    error: null,
    loading: false
  })),

  on(TodoActions.CreateTodo, state => ({
    ...state,
    error: null,
    loading: true
  })),
  on(TodoActions.CreateTodoSuccess, (state, { todo }) => {
    const todolist = state.todolist.slice();
    todolist.unshift(todo);
    return {
      ...state,
      error: null,
      loading: false,
      todolist
    };
  }),

  on(TodoActions.UpdateTodo, state => ({
    ...state,
    loading: true
  })),
  on(TodoActions.UpdateTodoSuccess, (state, { todo }) => {
    const index     = state.todolist.findIndex(t => t.id === todo.id);
    const todolist  = state.todolist.slice();
    todolist[index] = todo;
    return {
      ...state,
      todolist,
      error: null,
      loading: false
    };
  }),

  on(TodoActions.DeleteTodo, (state, { todo }) => ({
    ...state,
    todo,
    error: null,
    loading: true,
  })),
  on(TodoActions.DeleteTodoSuccess, (state) => {
    const todolist = state.todolist.slice().filter(t => t.id !== state.todo.id);
    return {
      ...state,
      todolist,
      todo: null,
      error: null,
      loading: false
    };
  })
);

export function todoReducer(
  state: State | undefined,
  action: Action) {
  return reducer(state, action);
}
