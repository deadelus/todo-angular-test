import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatListModule } from '@angular/material/list';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule, MatIconModule, MatProgressSpinnerModule } from '@angular/material';
import { TodoListComponent } from './todo-list.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { StoreModule, Store } from '@ngrx/store';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { todoReducer } from 'src/app/store/todo/todo.reducer';
import * as todosActions from 'src/app/store/todo/todo.actions';
import { TodoState } from 'src/app/state.enum';

describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let store: Store<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TodoListComponent ],
      providers: [
        Store
      ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatListModule,
        MatCheckboxModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatProgressSpinnerModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({ todo: todoReducer })
      ]
    })
    .compileComponents();
  }));

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        StoreModule.forRoot({todo: todoReducer}),
      ],
      declarations: [TodoListComponent]
    });

    await TestBed.compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show a list of todo', () => {
    const action = todosActions.GetAllTodosSuccess({
      todolist: [{
        id: 1,
        title: 'Test',
        description: '',
        state: TodoState.undone
      }]
    });
    store.dispatch(action);
    fixture.detectChanges();
    component.todolist$.subscribe((t) => {
      expect(t.length).toEqual(1);
      expect(t[0].title).toEqual('Test');
    });
  });

  it('should dispatch a new todo create', () => {
    const action = todosActions.CreateTodoSuccess({
      todo: {
        id: 1,
        title: 'New Todo',
        description: '',
        state: TodoState.undone
      }
    });

    store.dispatch(action);

    fixture.detectChanges();

    component.todolist$.subscribe((t) => {
      expect(t.length).toEqual(1);
      expect(t[0].title).toEqual('New Todo');
    });
  });
});
