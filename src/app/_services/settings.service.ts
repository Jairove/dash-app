import { Injectable } from '@angular/core';
import { Settings } from '../_models/settings';
import { Widget } from '../_models/widget';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class SettingsService {

  constructor(private http: Http) { }

  private currentUser = JSON.parse(localStorage.getItem('currentUser'));

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
    var headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.currentUser.token
    });

    let options = new RequestOptions({ headers: headers });
    return this.http.get('/api/settings', options)
                    .map(this.extractData)
                    .catch(this.handleError);


  }

  public saveSettings(settings): Observable<void> {
    var headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.currentUser.token
    });

    let options = new RequestOptions({ headers: headers });
    return this.http.post('/api/settings', settings, options)
                    .catch(this.handleError);


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

  public updateProfile(profile): Observable<void> {
    var headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.currentUser.token
    });

    let options = new RequestOptions({ headers: headers });

    return this.http.post('/api/profile', profile, options)
                    .catch(this.handleError);

  }

  public changePassword(password): Observable<void> {
    var headers = new Headers({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.currentUser.token
    });

    let options = new RequestOptions({ headers: headers });

    return this.http.post('/api/password', password, options)
                    .catch(this.handleError);

  }


}
