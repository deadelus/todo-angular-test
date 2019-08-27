import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTodoComponent } from './new-todo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatListModule, MatCheckboxModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { todoReducer } from 'src/app/store/todo/todo.reducer';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

describe('NewTodoComponent', () => {
  let component: NewTodoComponent;
  let fixture: ComponentFixture<NewTodoComponent>;
  let title: DebugElement;
  let description: DebugElement;
  let submitEl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTodoComponent ],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        MatListModule,
        MatCheckboxModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        StoreModule.forRoot({ todo: todoReducer })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTodoComponent);
    component = fixture.componentInstance;
    submitEl = fixture.debugElement.query(By.css('button'));
    title = fixture.debugElement.query(By.css('#title'));
    description = fixture.debugElement.query(By.css('#description'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get a new todo on form submit', () => {
    let newtodo;
    component.form.controls.title.setValue('New todo');
    component.form.controls.description.setValue('test');

    expect(component.form.valid).toBeTruthy();
    fixture.detectChanges();

    component.newTodo.subscribe((value) => newtodo = value);
    submitEl = fixture.debugElement.query(By.css('button'));
    submitEl.triggerEventHandler('click', null);

    expect(newtodo.title).toBe('New todo');
    expect(newtodo.description).toBe('test');
  });
});
