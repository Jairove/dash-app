import { Injectable } from '@angular/core';
import { Widget } from '../_models/widget';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class DashboardService {

  constructor(private http: Http, private router: Router) { }

  private currentUser = JSON.parse(localStorage.getItem('currentUser'));

  private extractData(res: Response) {
    if(res.status == 401) {
      this.router.navigate(['/login']);
    }
    else {
      const body = res.json();
      return body || { };
    }
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

  public getProfile(): Observable<any> {
    var headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.currentUser.token
    });

    let options = new RequestOptions({ headers: headers });
    return this.http.get('/api/profile', options)
                    .map(this.extractData)
                    .catch(this.handleError);

  }

  public getWidgets(): Observable<any> {
    var headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.currentUser.token
    });

    let options = new RequestOptions({ headers: headers });
    return this.http.get('/api/widgets', options)
                    .map(this.extractData)
                    .catch(this.handleError);

  }

  public updateWidget(widget): Observable<void> {
    var headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.currentUser.token
    });

    let options = new RequestOptions({ headers: headers });

    return this.http.post('/api/widget', widget, options)
                    .catch(this.handleError);

  }

  public removeWidget(widgetId): Observable<void> {
    var headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.currentUser.token
    });

    let options = new RequestOptions({ headers: headers });

    return this.http.delete('/api/widget/' + widgetId, options)
                    .catch(this.handleError);

  }

  public updateProfile(profile): Observable<string> {
    var headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.currentUser.token
    });

    let options = new RequestOptions({ headers: headers });

    return this.http.post('/api/profile', profile, options)
                    .map((response: Response) => {
                        return response.json();
                    })
                    .catch(this.handleError);

  }

}
