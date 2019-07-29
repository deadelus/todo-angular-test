import { Todo } from '../../todo';
import { createReducer, on } from '@ngrx/store';
import * as TodoActions from 'src/app/store/todo/todo.actions';

export interface State {
  todolist: Todo[];
  todo: Todo;
  error: Error;
}

export const initialState: State = {
  todolist: [],
  todo: null,
  error: null,
};

export const todoReducer = createReducer(
  initialState,
  on(TodoActions.ErrorTodo, (state, { error }) => ({
    ...state,
    todolist: initialState.todolist,
    todo: initialState.todo,
    error: error
  })),
  on(TodoActions.SortAllTodos, state => ({
    ...state,
    todolist: state.todolist.sort((a, b) => b.state - a.state)
  })),
  
  on(TodoActions.GetAllTodos, state => ({ 
    ...state 
  })),
  on(TodoActions.GetAllTodosSuccess, (state, todos: Todo[]) => ({
    ...state,
    todolist: todos
  })),

  on(TodoActions.GetTodo, state => ({ 
    ...state 
  })),
  on(TodoActions.GetTodoSuccess, (state, todo: Todo) => ({
    ...state,
    todo: todo
  })),
/*
  on(TodoActions.CreateTodo, state => ({ 
    ...state 
  })),
  on(TodoActions.CreateTodoSuccess, (state, { todo, todolist }) => ({
    ...state,
    todo: todo,
    todolist: todolist
  })),

  on(TodoActions.UpdateTodo, state => ({ 
    ...state 
  })),
  on(TodoActions.UpdateTodoSuccess, (state, { todo, todolist }) => ({
    ...state,
    todo: todo,
    todolist: todolist
  })),

  on(TodoActions.DeleteTodo, (state, { todo }) => ({ 
    ...state,
    todo: todo,
  })),
  on(TodoActions.DeleteTodoSuccess, (state, { todo, todolist }) => ({
    ...state,
    todo: todo,
    todolist: todolist
  }))
  */
);


    /**
     * const todolist = state.todolist;
        todolist.unshift(state.todo);
     */

    /**
     * Update
     * const index     = state.todolist.findIndex(todo => todo.id === action.payload.id);
      const todolist  = state.todolist;
      todolist[index] = action.payload;
     */


    /**
     * Delete
     *       const todolist = state.todolist.filter(todo => todo.id !== action.payload.id);

     */

