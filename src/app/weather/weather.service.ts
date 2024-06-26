import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { Forecast } from './forecast';

@Injectable()
export class WeatherService {
  private apiBaseUrl = "/api/weather?";

  constructor(private http: Http) { }

    /**
    * Calls the API to get the forecast
    * @param lat The latitude of the place
    * @param lon The longitude of the place
    * @param units The disired units system (metric|imperial)
    * @returns A Forecast Observable
    **/
    public getContent(lat: String, lon: String, units: String): Observable<Forecast> {
      var apiUrl = this.apiBaseUrl + "lat=" + lat
              + "&lon=" + lon + "&units=" + units;
      return this.http.get(apiUrl)
              .map(this.extractWeather)
              .catch(this.handleError);
    }

    /**
    * Extracts a Forecast Object from a Response object
    * @param res  A Response object
    * @return A Forecast
    */
    private extractWeather(res: Response): Forecast {
      return res.json() || { };
    }

    private handleError (error: any) {
      const errMsg = (error.message) ? error.message :
        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg);
      return Observable.throw(errMsg);
    }

}
