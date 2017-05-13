import { Component, OnInit } from '@angular/core';
import {TodoDataService} from './todo-data.service';
import {Todo} from './todo';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
  providers: [TodoDataService]
})
export class TodoComponent implements OnInit {
  newTodo: Todo = new Todo();
  todos: Todo[] = [];
  errorMessage: string;
  public widgetdata;

  constructor(private todoDataService: TodoDataService) {
  }

  addTodo() {
    this.todoDataService.addTodo(this.newTodo,this.widgetdata._id)
            .subscribe(
                todo  => this.todos.push(todo),
                error =>  this.errorMessage = <any>error);
    this.newTodo = new Todo();
  }

  toggleTodoComplete(todo) {
    this.todoDataService.toggleTodoComplete(todo)
            .subscribe(
                todo  => { this.todos.find(item => item._id === todo._id) .complete = todo.complete; },
                error =>  this.errorMessage = <any>error);
  }

  removeTodo(todo) {
    this.todoDataService.deleteTodoById(todo._id)
            .subscribe(
              todo  => { this.todos = this.todos.filter(item => item._id !== todo._id); },
              error =>  this.errorMessage = <any>error);
  }

  refreshTodos() {
    if(this.widgetdata._id) {
      this.todoDataService.getTodos(this.widgetdata._id)
          .subscribe(
              todos => this.todos = todos,
              error =>  this.errorMessage = <any>error
          );
    }
  }

  ngOnInit() {
    this.refreshTodos();
  }

}
