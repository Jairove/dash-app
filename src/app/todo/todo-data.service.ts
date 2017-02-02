import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Todo } from './todo';

@Injectable()
export class TodoDataService {

  private todosUrl = 'api/todos';

  constructor(private http: Http) {}

  getAllTodos(): Observable<Todo[]> {
    return this.http.get(this.todosUrl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
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

  addTodo(todo: Todo): Observable<Todo> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.put(this.todosUrl, todo, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  deleteTodoById(id): Observable<Todo> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.delete(this.todosUrl + '/' + id, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  // updateTodoById(id: number, values: Object = {}): Observable<Todo> {
  //   let headers = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: headers });

  //   return this.http.post(this.todosUrl, {id, values}, options)
  //                   .map(this.extractData)
  //                   .catch(this.handleError);
  // }

  toggleTodoComplete(todo: Todo): Observable<Todo> {
    todo.complete = !todo.complete;
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    return this.http.post(this.todosUrl, todo, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

}
