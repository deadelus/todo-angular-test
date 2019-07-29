import { Injectable } from '@angular/core';
import { TodoRepositoryService } from './todo-repository.service';
import { Observable } from 'rxjs';
import { Todo } from '../todo';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private repository: TodoRepositoryService) {}

  getTodos(): Observable<Todo[]> {
    return this.repository.getAll();
  }

  getTodo(id): Observable<Todo> {
    return this.repository.get(id);
  }

  createTodo(params): Observable<Todo> {
    return this.repository.post({
      title: params.title,
      description: params.description,
      state: params.state
    });
  }

  updateTodo(todo: Todo): Observable<Todo> {
    return this.repository.patch(todo.id, {
      state: todo.state,
      title: todo.title,
      description: todo.description
    });
  }

  deleteTodo(todo: Todo): Observable<any> {
    return this.repository.delete(todo.id);
  }

}
