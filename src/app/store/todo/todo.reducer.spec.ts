import { todoReducer } from 'src/app/store/todo/todo.reducer';
import * as todosActions from './todo.actions';
import { createAction } from '@ngrx/store';
import { Todo } from 'src/app/todo';
import { TodoState } from 'src/app/state.enum';


describe('TodoReducer', () => {
    let initState;
    beforeEach(() => {
      initState = {
        todolist: [],
        todo: null,
        error: null,
        loading: false
      };
    });

    describe('default', () => {
      it('should return init state', () => {
        const noopAction = createAction('Action stub');
        const newState = todoReducer(undefined, noopAction);
        expect(newState.todo).toBe(null);
        expect(newState.todolist.length).toBe(0);
        expect(newState.error).toBe(null);
        expect(newState.loading).toBe(false);
        expect(newState).toEqual(initState);
      });
    });

    describe('loadTodoItems', () => {
      it('should return isLoading true', () => {
        const loadTodoItemsAction = todosActions.GetAllTodos;
        const newState = todoReducer(initState, loadTodoItemsAction);

        expect(newState.todo).toBe(null);
        expect(newState.todolist.length).toBe(0);
        expect(newState.error).toBe(null);
        expect(newState.loading).toBe(true);
      });
      it('should return todolist', () => {
        const loadTodoItemsAction = todosActions.GetAllTodos;
        const loadTodoItemsAction2 = todosActions.GetAllTodosSuccess({todolist: [{
            id: 1,
            title: 'todo 1',
            description: '',
            state: TodoState.undone,
        }, {
            id: 2,
            title: 'todo 2',
            description: '',
            state: TodoState.undone,
        }]});
        const newState = todoReducer(initState, loadTodoItemsAction);
        const newState2 = todoReducer(newState, loadTodoItemsAction2);

        expect(newState2.todo).toBe(null);
        expect(newState2.todolist.length).toBe(2);
        expect(newState2.error).toBe(null);
        expect(newState2.loading).toBe(false);
      });
      it('should return a todo', () => {
        initState.todolist = [{
            id: 1,
            title: 'todo 1',
            description: '',
            state: TodoState.undone,
        }, {
            id: 2,
            title: 'todo 2',
            description: '',
            state: TodoState.undone,
        }];
        const todo: Todo = {
            id: 1,
            title: 'todo 1',
            description: '',
            state: TodoState.undone,
        };
        const loadTodoItemsAction = todosActions.GetTodo({id: 1});
        const loadTodoItemsAction2 = todosActions.GetTodoSuccess({todo});
        const newState = todoReducer(initState, loadTodoItemsAction);
        const newState2 = todoReducer(newState, loadTodoItemsAction2);

        expect(newState2.todo).toBe(todo);
        expect(newState2.todolist.length).toBe(2);
        expect(newState2.error).toBe(null);
        expect(newState2.loading).toBe(false);
      });
    });

    describe('todoItemsLoadFailed', () => {
      it('should return isLoading false and error', () => {
        const error = new Error('http error');
        const loadTodoItemsAction = todosActions.ErrorTodo({error});
        const newState = todoReducer(initState, loadTodoItemsAction);

        expect(newState.todo).toBe(null);
        expect(newState.todolist.length).toBe(0);
        expect(newState.loading).toBe(false);
        expect(newState.error).toBe(error);
      });
    });

    describe('todoItemCreatedReducer', () => {
      it('should add new todo to todo list', () => {
        const newTodo: Todo = {
            id: null,
            title: 'new',
            description: '',
            state: TodoState.undone,
        };
        const loadTodoItemsAction = todosActions.CreateTodoSuccess({todo: newTodo});
        const newState = todoReducer(initState, loadTodoItemsAction);

        expect(newState.todo).toBe(null);
        expect(newState.loading).toBe(false);
        expect(newState.error).toBe(null);
        expect(newState.todolist.length).toBe(1);
        expect(newState.todolist[0]).toEqual(newTodo);
      });
    });

    describe('todoItemDeletedReducer', () => {
      it('should delete todo from todo list', () => {
        initState.todolist = [{
            id: 1,
            title: 'todoToDelete',
            description: '',
            state: TodoState.undone,
        }];

        expect(initState.todolist.length).toBe(1);

        const todoToDelete = initState.todolist[0];
        const loadTodoItemsAction = todosActions.DeleteTodo({todo: todoToDelete});
        const loadTodoItemsAction2 = todosActions.DeleteTodoSuccess({todo: todoToDelete});

        const newState = todoReducer(initState, loadTodoItemsAction);
        const newState2 = todoReducer(newState, loadTodoItemsAction2);

        expect(newState2.todo).toBe(null);
        expect(newState2.loading).toBe(false);
        expect(newState2.error).toBe(null);
        expect(newState2.todolist.length).toBe(0);
      });
    });

    describe('todoItemUpdatedReducer', () => {
      it('should update todo item', () => {
        initState.todolist = [{
            id: 1,
            title: 'todoToDelete',
            description: '',
            state: TodoState.undone,
        }];

        const todoToUpdate = initState.todolist[0];
        todoToUpdate.title = 'updated';
        todoToUpdate.description = 'updated desc';
        todoToUpdate.state = TodoState.done;

        const loadTodoItemsAction = todosActions.UpdateTodo({todo: todoToUpdate});
        const loadTodoItemsAction2 = todosActions.UpdateTodoSuccess({todo: todoToUpdate});

        const newState = todoReducer(initState, loadTodoItemsAction);
        const newState2 = todoReducer(newState, loadTodoItemsAction2);

        expect(newState2.todo).toBe(null);
        expect(newState2.loading).toBe(false);
        expect(newState2.error).toBe(null);
        expect(newState2.todolist.length).toBe(1);
        expect(newState2.todolist[0]).toEqual(todoToUpdate);
      });
    });
  });
