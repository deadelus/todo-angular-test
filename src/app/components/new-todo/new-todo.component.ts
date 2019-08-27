import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TodoState } from 'src/app/state.enum';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.styl']
})
export class NewTodoComponent implements OnInit {
  @Output() newTodo = new EventEmitter<any>();
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
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

    const todo = {
      title: this.form.get('title').value,
      description: this.form.get('description').value,
      state: TodoState.undone
    };

    this.newTodo.emit(todo);
  }
}
