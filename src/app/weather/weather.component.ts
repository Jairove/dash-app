import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { Forecast } from './forecast';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  providers: [ WeatherService ]
})
export class WeatherComponent implements OnInit {
  private forecast;
  private units = 'metric';

  constructor(private weatherService: WeatherService) {
      this.refreshWeather();
  }

  ngOnInit() {
    if(this.forecast == null) {
      this.forecast = {
        weather:[{main:"Unavailable",description:"Not available"}],
        main:{temp:0,temp_min:0,temp_max:0},
        name:"Unknown",
        cod:0
      };
    }
  }

  private refreshWeather() {
    this.weatherService.getContent()
        .subscribe(
            data => {
              if(data.cod!=0 && data.cod!=null) this.forecast = data;
            },
            error => console.log(error));
  }

}
