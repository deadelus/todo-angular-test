import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/services/todo.service';
import { ActivatedRoute } from '@angular/router';
import { Todo } from 'src/app/todo';
import { TodoState } from 'src/app/state.enum';

@Component({
  selector: 'app-todo-detail',
  templateUrl: './todo-detail.component.html',
  styleUrls: ['./todo-detail.component.styl']
})
export class TodoDetailComponent implements OnInit {

  todo: Todo;
  state = TodoState;

  constructor(
    private todoService: TodoService,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe((param) => {
      if (param.id) {
        this.getTodo(param.id);
      }
    });
  }

  ngOnInit() {}

  getTodo(id: string): void {
    this.todoService.getTodo(id).subscribe(
      (todo: Todo) => this.todo = todo,
      (error) => console.error(error),
      () => console.log(this.todo.state)
    );
  }

}
