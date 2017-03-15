import { NewsRssComponent } from '../../news-rss/news-rss.component';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { TodoComponent } from '../../todo/todo.component';
import { QuotesComponent } from '../../quotes/quotes.component';
import { WeatherComponent } from '../../weather/weather.component';
import { WelcomeComponent } from '../../welcome/welcome.component';
import { SettingsService } from '../../_services/settings.service';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ SettingsService ]
})
export class DashboardComponent implements OnInit {
  //La lista de widgets deberia recuperarse de la db y contener el orden de los widgets
  public widgets = [{type: WelcomeComponent, colSize: "col-md-6"},{type: WeatherComponent, colSize: "col-md-6"},{type: NewsRssComponent, colSize: "col-md-8"},{type: QuotesComponent, colSize: "col-md-4"},{type: TodoComponent, colSize: "col-md-4"}];

  constructor(private settingsService: SettingsService) {
  }

  private getSettings() {
    this.settingsService.getSettings()
        .subscribe(
            settings =>  localStorage.setItem('settings', JSON.stringify( settings ))
        );
  }

  ngOnInit() {
    this.getSettings();
  }

}
