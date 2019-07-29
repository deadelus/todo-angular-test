import { Component, OnInit, OnDestroy } from '@angular/core';
import { Todo } from '../../todo';
import * as TodoActions from 'src/app/store/todo/todo.actions';
import { TodoState } from '../../state.enum';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.styl']
})
export class TodoListComponent implements OnInit {

  state = TodoState;
  todos: Todo[];
  todolist$: Observable<Todo[]>;

  constructor(
    private store: Store<{ todolist: Todo[] }>,
    private todoService: TodoService,
  ) {
    this.todolist$ = this.store.select(state => state.todolist);
  }

  ngOnInit() {
    this.getTodos(); // ne fonctionne pas
    // this.getTodosAllFashionWay(); // fonctionne
  }

  getTodos(): void {
   this.store.dispatch(TodoActions.GetAllTodos());
  }

  getTodosAllFashionWay(): void {
    const sub = this.todoService.getTodos().subscribe((todos) => this.todos = todos);
  }

  toggle(todo: Todo): void {
    todo.state = todo.state === this.state.done ? this.state.undone : this.state.done;
    // this.store.dispatch(TodoActions.UpdateTodo({todo}));
  }
}
