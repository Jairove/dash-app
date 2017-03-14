import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Forecast } from './forecast';
@Injectable()
export class WeatherService {
  private apiBaseUrl = "/api/weather?";
  private lat = "41.5696259";
  private lon = "-4.7200211";
  private units = "metric";
  private apiUrl = this.apiBaseUrl + "lat=" + this.lat
          + "&lon=" + this.lon + "&units=" + this.units;

  constructor(private http: Http) { }

  getContent(): Observable<Forecast> {
    console.log(this.apiUrl);
    return this.http.get(this.apiUrl)
            .map(this.extractWeather)
            .catch(this.handleError);
  }

  private extractWeather(res: Response): Forecast {
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
