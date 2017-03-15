import { Injectable } from '@angular/core';
import { Settings } from '../settings';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class SettingsService {

  constructor(private http: Http) { }

  private extractData(res: Response) {
    const body = res.json();
    return body || { };
  }

  // TODO This function is used in most services, i should move it to avoid repiting it
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


  public getSettings(): Observable<Settings> {
    var currentUser = JSON.parse(localStorage.getItem('currentUser'));
    var headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ currentUser.token
    });

    let options = new RequestOptions({ headers: headers });
    return this.http.get('/api/settings', options)
                    .map(this.extractData)
                    .catch(this.handleError);


  }

}
