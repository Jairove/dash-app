import { NewsRssComponent } from '../../news-rss/news-rss.component';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { TodoComponent } from '../../todo/todo.component';
import { QuotesComponent } from '../../quotes/quotes.component';
import { WeatherComponent } from '../../weather/weather.component';
import { WelcomeComponent } from '../../welcome/welcome.component';
import { SettingsService } from '../../_services/settings.service';
import { CoversComponent } from '../../covers/covers.component';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ SettingsService ]
})
export class DashboardComponent implements OnInit {
  private editMode = false;
  public widgets;
  private response: String;

  constructor(private settingsService: SettingsService) {
    this.getWidgets();
    console.log(this.widgets);
  }

  private getSettings() {
    this.settingsService.getSettings()
        .subscribe(
            settings =>  localStorage.setItem('settings', JSON.stringify( settings ))
        );
  }

  private getWidgets() {
    this.settingsService.getWidgets()
        .subscribe(
            widgets =>  this.widgets = widgets
        );
  }

  private updateDash() {
    this.settingsService.updateDash(this.widgets)
        .subscribe(
        );
  }

  ngOnInit() {
    this.getSettings();
  }

  public toggleEdit() {
    this.editMode = !this.editMode;
    this.updateDash();
  }

}
