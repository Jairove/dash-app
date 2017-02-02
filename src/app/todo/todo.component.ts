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

  // Ask Angular DI system to inject the dependency
  // associated with the dependency injection token `TodoDataService`
  // and assign it to a property called `todoDataService`
  constructor(private todoDataService: TodoDataService) {
  }

  // Service is now available as this.todoDataService

  addTodo() {
    this.todoDataService.addTodo(this.newTodo)
            .subscribe(
                todo  => this.todos.push(todo),
                error =>  this.errorMessage = <any>error);  
    // TODO Handle errors
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
    this.todoDataService.getAllTodos()
        .subscribe(
            todos => this.todos = todos,
            error =>  this.errorMessage = <any>error
        );
  }

  ngOnInit() {
    this.refreshTodos();
  }

}
