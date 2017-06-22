import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Todo } from './todo';

@Injectable()
export class TodoDataService {

  private todosUrl = 'api/todos';
  private currentUser;
  private headers;

  constructor(private http: Http) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.currentUser.token
    });
  }

  /**
  * Gets the todos of a given widget
  * @param widgetid The id of the widget
  * @returns An Observable of a Todos array
  */
  public getTodos(widgetid): Observable<Todo[]> {
    let options = new RequestOptions({ headers: this.headers });
    return this.http.get(this.todosUrl + '/' + widgetid, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  /**
  * Adds a todo to a given widget
  * @param todo The todo to be added
  * @param widgetid The id of the widget
  * @returns A Todo Observable
  */
  public addTodo(todo: Todo, idwidget: string): Observable<Todo> {
    let options = new RequestOptions({ headers: this.headers });

    return this.http.put(this.todosUrl + '/' + idwidget, todo, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  /**
  * Removes a todo from the system
  * @param id The id of the todo
  * @returns A Todo Observable
  */
  public deleteTodoById(id): Observable<Todo> {
    let options = new RequestOptions({ headers: this.headers });

    return this.http.delete(this.todosUrl + '/' + id, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  /**
  * Changes the completion state of a widget
  * @param id The id of the widget
  * @returns A Todo Observable
  */
  public toggleTodoComplete(todo: Todo): Observable<Todo> {
    todo.complete = !todo.complete;
    let options = new RequestOptions({ headers: this.headers });

    return this.http.post(this.todosUrl, todo, options)
                    .map(this.extractData)
                    .catch(this.handleError);
  }

  private extractData(res: Response) {
    const body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
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

}
