import { createAction, props } from '@ngrx/store';
import { Todo } from '../../todo';


export const SortAllTodos = createAction('[Todo] Sort All Todos');

export const GetAllTodos = createAction('[Todo] Get All Todos');
export const GetAllTodosSuccess = createAction('[Todo] Get All Todos Success', props<Todo[]>());

export const GetTodo = createAction('[Todo] Get Todo', props<{id: number}>());
export const GetTodoSuccess = createAction('[Todo] Get Todo Success', props<Todo>());
/*
export const CreateTodo = createAction('[Todo] Create Todo', props<Todo>());
export const CreateTodoSuccess = createAction('[Todo] Create Todos Success', props<{todo: Todo, todolist: Todo[]}>());

export const UpdateTodo = createAction('[Todo] Update Todo', props<Todo>());
export const UpdateTodoSuccess = createAction('[Todo] Update Todo Success', props<{todo: Todo, todolist: Todo[]}>());

export const DeleteTodo = createAction('[Todo] Delete Todo', props<Todo>());
export const DeleteTodoSuccess = createAction('[Todo] Delete Todo Success', props<{todo: Todo, todolist: Todo[]}>());
*/
export const ErrorTodo = createAction('[Todo] Error Todo', props<{error: Error}>());
