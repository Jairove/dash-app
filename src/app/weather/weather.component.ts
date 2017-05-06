import { Component, OnInit, DoCheck } from '@angular/core';
import { WeatherService } from './weather.service';
import { Forecast } from './forecast';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  providers: [ WeatherService ]
})
export class WeatherComponent implements OnInit, DoCheck {
  private forecast;
  public widgetdata;
  private lat;
  private lon;
  private units;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    if(this.forecast == null && this.widgetdata!=null) {
      this.lat = this.widgetdata.lat;
      this.lon = this.widgetdata.lon;
      this.units = this. widgetdata.units;

      this.forecast = {
        weather:[{main:"Unavailable",description:"Not available"}],
        main:{temp:0,temp_min:0,temp_max:0},
        name:"Unknown",
        cod:0
      };
      this.refreshWeather();
    }
  }

  ngDoCheck() {
    if(this.lat!=this.widgetdata.lat || this.lon!=this.widgetdata.lon) {
      this.refreshWeather();
      this.lat = this.widgetdata.lat;
      this.lon = this.widgetdata.lon;
    }
  }

  public refreshWeather() {
    this.weatherService.getContent(this.widgetdata.lat, this.widgetdata.lon, this.widgetdata.units)
        .subscribe(
            data => {
              if(data.cod==200) this.forecast = data;
            },
            error => console.log(error));
  }

}
