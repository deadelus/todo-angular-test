import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Todo } from 'src/app/todo';
import * as TodoActions from 'src/app/store/todo/todo.actions';
import { Store } from '@ngrx/store';
import { TodoState } from 'src/app/state.enum';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.styl']
})
export class NewTodoComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<{ todo: any }>
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      title: ['', [
          Validators.required,
        ]
      ],
      description: [''],
    });
  }

  submit(): void {
    if (!this.form.valid) {
      return ;
    }

    const todo: Todo = {
      id: 0,
      title: this.form.get('title').value,
      description: this.form.get('description').value,
      state: TodoState.undone
    };

    // this.store.dispatch(TodoActions.CreateTodo(todo));
  }
}
