import { Component, OnInit, OnDestroy } from '@angular/core';
import * as TodoActions from 'src/app/store/todo/todo.actions';
import { ActivatedRoute } from '@angular/router';
import { Todo } from 'src/app/todo';
import { TodoState } from 'src/app/state.enum';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.styl']
})
export class TodoDetailComponent implements OnInit, OnDestroy {

  todo$: Observable<Todo>;
  state = TodoState;
  subscriptionCollector: Subscription[] = [];

  constructor(
    private store: Store<{ todo: Todo }>,
    private route: ActivatedRoute,
  ) {
    this.todo$ = this.store.pipe(select('todo', 'todo'));
  }

  ngOnInit() {
    const sub = this.route.params.subscribe((param) => {
      if (param.id) {
        this.getTodo(param.id);
      }
    });
    this.subscriptionCollector.push(sub);
  }

  getTodo(id): void {
    this.store.dispatch(TodoActions.GetTodo({id}));
  }

  ngOnDestroy() {
    this.subscriptionCollector.forEach(sub => sub.unsubscribe());
  }
}
