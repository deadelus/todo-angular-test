import { Component, OnInit } from '@angular/core';
import { Todo } from '../../todo';
import * as TodoActions from 'src/app/store/todo/todo.actions';
import { TodoState } from '../../state.enum';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.styl']
})
export class TodoListComponent implements OnInit {

  state = TodoState;
  todolist$: Observable<Todo[]>;
  isLoading$: Observable<boolean>;
  isError$: Observable<Error>;

  constructor(
    private store: Store<{ todolist: Todo[] }>,
  ) {
    this.todolist$ = this.store.pipe(select('todo', 'todolist'));
    this.isLoading$ = this.store.pipe(select('todo', 'loading'));
    this.isError$ = this.store.pipe(select('todo', 'error'));
  }

  ngOnInit() {
    this.getTodos();
  }

  getTodos(): void {
    this.store.dispatch(TodoActions.GetAllTodos());
  }

  deleteTodo(todo: Todo): void {
    this.store.dispatch(TodoActions.DeleteTodo({todo}));
  }

  updateTodo(todo: Todo): void {
    const state = todo.state === this.state.done ? this.state.undone : this.state.done;
    const updatedTodo = {
      ...todo,
      state
    };
    this.store.dispatch(TodoActions.UpdateTodo({todo: updatedTodo}));
  }
}
