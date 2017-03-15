import { Injectable } from '@angular/core';
import { Quote } from './quote';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';

@Injectable()
export class QuotesService {

  constructor(private http: Http) { }

  getQuote(): Observable<Quote> {
    return this.http.get('/api/quote')
            .map(this.extractQuote)
            .catch(this.handleError);
  }

  private extractQuote(res: Response): Quote {
    return res.json() || { };
  }

  private handleError (error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
