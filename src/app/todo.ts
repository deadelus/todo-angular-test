import { TodoState } from './state.enum';

export interface Todo {
    id: number;
    title: string;
    description: string;
    state: TodoState;
  }
