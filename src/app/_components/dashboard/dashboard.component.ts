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
  public widgets = [{type: 'WelcomeComponent', colSize: "col-md-6", pos: 0}];
  private response: String;

  private types = {
    'WelcomeComponent': WelcomeComponent,
    'WeatherComponent': WeatherComponent,
    'NewsRssComponent': NewsRssComponent,
    'CoversComponent': CoversComponent,
    'QuotesComponent': QuotesComponent,
    'TodoComponent': TodoComponent
  };

  constructor(private settingsService: SettingsService) { }

  private getSettings() {
    this.settingsService.getSettings()
        .subscribe(
            settings =>  localStorage.setItem('settings', JSON.stringify( settings ))
        );
  }

  private getWidgets() {
    this.settingsService.getWidgets()
        .subscribe(
            widgets =>  {
              //Sort widgets by position
              widgets.sort(
                (a,b): number => {
                  if (a.pos < b.pos)
                    return -1;
                  if (a.pos > b.pos)
                    return 1;
                  return 0;
                });

              // Assign
              this.widgets = widgets;
            }
        );
  }

  private updateDash() {
    //Save new positions
    for(let widget of this.widgets) {
      if(widget.pos != this.widgets.indexOf(widget)) {
        widget.pos = this.widgets.indexOf(widget);
        this.settingsService.updateWidget(widget).subscribe();
      }
    }
    this.getWidgets();
  }

  ngOnInit() {
    // this.widgets =
    this.getWidgets();
    this.getSettings();
  }

  public toggleEdit() {
    this.editMode = !this.editMode;
    this.updateDash();
  }

}
