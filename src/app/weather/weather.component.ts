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
  public widgetdata;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    if(this.forecast == null && this.widgetdata!=null) {
      this.forecast = {
        weather:[{main:"Unavailable",description:"Not available"}],
        main:{temp:0,temp_min:0,temp_max:0},
        name:"Unknown",
        cod:0
      };
      this.refreshWeather();
    }
  }

  ngOnChanges() {
    if(this.widgetdata!=null) {
      this.refreshWeather();
    }
  }

  private refreshWeather() {
    this.weatherService.getContent(this.widgetdata.lat, this.widgetdata.lon, this.widgetdata.units)
        .subscribe(
            data => {
              if(data.cod==200) this.forecast = data;
            },
            error => console.log(error));
  }

}
