import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Todo } from './todo';

@Injectable()
export class TodoDataService {

  //Placeholders
  lastId: number = 0;
  todos: Todo[] = [];

  private todosUrl = 'api/todos';

  constructor(private http: Http) {}

  getAllTodos(): Observable<Todo[]> {
    return this.http.get(this.todosUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

  getTodoById(id: number): Todo {
    return this.todos
      .filter(todo => todo.id === id)
      .pop();
  }

  addTodo(todo: Todo): TodoDataService {
    if(!todo.id) {
      todo.id = ++this.lastId;
    }
    this.todos.push(todo);
    return this;
  }

  deleteTodoById(id:number): TodoDataService {
    this.todos = this.todos.filter(todo => todo.id !== id);
    return this;
  }

  updateTodoById(id:number, values: Object = {}): Todo {
    let todo = this.getTodoById(id);
    if(!todo) { return null; }
    Object.assign(todo,values);
    return todo;
  }

  toggleTodoComplete(todo: Todo){
    let updatedTodo = this.updateTodoById(todo.id, {
      complete: !todo.complete
    });
    return updatedTodo;
  }

}
