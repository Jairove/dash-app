import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Weather } from './weather';

@Injectable()
export class WeatherService {
  private apiBaseUrl = "http://api.openweathermap.org/data/2.5/forecast/";
  private key = "7fa9b10c5a391cccf5aa4196888b33e8";
  private city = "524901";
  private apiUrl = this.apiBaseUrl + "city?id=" + this.city + "&APPID=" + this.key;

  constructor(private http: Http) { }

  getContent(): Observable<Weather> {
    return this.http.get(this.apiUrl)
            .map(this.extractWeather)
            .catch(this.handleError);
  }

  private extractWeather(res: Response): Weather {
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
