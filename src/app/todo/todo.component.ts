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
    this.todoDataService.addTodo(this.newTodo);
    this.todos.push(this.newTodo);
    this.newTodo = new Todo();
  }

  toggleTodoComplete(todo) {
    this.todoDataService.toggleTodoComplete(todo);
  }

  removeTodo(todo) {
    this.todos = this.todos.filter(item => item.id !== todo.id);
    this.todoDataService.deleteTodoById(todo.id);
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
