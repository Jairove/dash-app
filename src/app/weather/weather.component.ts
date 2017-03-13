import { Component, OnInit } from '@angular/core';
import { WeatherService } from './weather.service';
import { Weather } from './weather';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css'],
  providers: [ WeatherService ]
})
export class WeatherComponent implements OnInit {
  public forecast: Weather = new Weather();

  constructor(private weatherService: WeatherService) {
      this.refreshWeather();
  }

  ngOnInit() {
     this.refreshWeather();
  }

  private refreshWeather() {
    this.weatherService.getContent()
        .subscribe(
            data => {
              //this.forecast = data;
            },
            error => console.log(error));
  }

}
