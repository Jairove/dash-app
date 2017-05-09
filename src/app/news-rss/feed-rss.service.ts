import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Feed } from './feed';

@Injectable()
export class FeedRssService {

  // rss2json API is used to retrieve an rss feed in JSON format
  private rssToJsonServiceBaseUrl: string = 'https://api.rss2json.com/v1/api.json?&api_key=8lx7mka8fpf5dtbvwbzsxphlvq6kcq6hbuo7rb1g&rss_url=';

  constructor(private http: Http) { }

  getContent(url: String): Observable<Feed> {
    return this.http.get(this.rssToJsonServiceBaseUrl + url)
            .map(this.extractFeeds)
            .catch(this.handleError);
  }

  private extractFeeds(res: Response): Feed {
    return res.json() || { };
  }

  // TODO: Maybe I should use a remote logging infrastructure
  private handleError (error: any) {
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
