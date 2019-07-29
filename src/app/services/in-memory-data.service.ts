import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Injectable } from '@angular/core';
import { Todo } from '../todo';
import { TodoState } from '../state.enum';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const todos = [
      { id: 11, title: 'Dr Nice', description: 'llorem ipsum', state: TodoState.undone},
      { id: 12, title: 'Narco', description: 'llorem ipsum', state: TodoState.undone},
      { id: 13, title: 'Bombasto', description: 'llorem ipsum', state: TodoState.undone},
      { id: 14, title: 'Celeritas', description: 'llorem ipsum', state: TodoState.undone},
      { id: 15, title: 'Magneta', description: 'llorem ipsum', state: TodoState.undone},
      { id: 16, title: 'RubberMan', description: 'llorem ipsum', state: TodoState.undone},
      { id: 17, title: 'Dynama', description: 'llorem ipsum', state: TodoState.undone},
      { id: 18, title: 'Dr IQ', description: 'llorem ipsum', state: TodoState.undone},
      { id: 19, title: 'Magma', description: 'llorem ipsum', state: TodoState.done},
      { id: 20, title: 'Tornado', description: 'llorem ipsum', state: TodoState.done}
    ];
    return {todos};
  }

  genId(todos: Todo[]): number {
    return todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 11;
  }
}
