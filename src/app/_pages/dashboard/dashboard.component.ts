import { NewsRssComponent } from '../../news-rss/news-rss.component';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { TodoComponent } from '../../todo/todo.component';
import { QuotesComponent } from '../../quotes/quotes.component';
import { WeatherComponent } from '../../weather/weather.component';
import { WelcomeComponent } from '../../welcome/welcome.component';
import { SettingsService } from '../../_services/settings.service';
import { CoversComponent } from '../../covers/covers.component';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ SettingsService ]
})
export class DashboardComponent implements OnInit {
  private editMode = false;
  private widgets: any = [{__t: 'WelcomeComponent', colSize: "col-md-6", pos: 0, id: "init"}];
  private response: String;
  private widgetsToBeDeleted: Array<any> = [];
  private edibleWidget = { pos: null, __t: TodoComponent };

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
    // Save new positions if widgets have been moved
    for(let widget of this.widgets) {
      if(widget.pos != this.widgets.indexOf(widget)) {
        widget.pos = this.widgets.indexOf(widget);
        this.settingsService.updateWidget(widget).subscribe();
      }
      else {
        this.settingsService.updateWidget(widget).subscribe();
      }
    }

    // Remove the deleted widgets if any
    for(let widget of this.widgetsToBeDeleted) {
      this.settingsService.removeWidget(widget._id).subscribe();
    }

    this.getWidgets();
  }

  ngOnInit() {
    this.getWidgets();
    this.getSettings();
  }

  public toggleEdit() {
    this.editMode = !this.editMode;
    this.updateDash();
  }

  public setEdibleWidget(widget): void {
    this.edibleWidget = widget;
  }

  private editWidget(editedWidget) {
    console.log(editedWidget);
    for(var i=0; i<this.widgets.length; i++) {
      if(this.widgets[i].pos == editedWidget.pos) {
        this.widgets[i] = Object.assign(this.widgets[i], editedWidget);
      }
    }
  }

  public createWidget(newWidget) {
    newWidget.pos = this.widgets.length;
    this.widgets.push(newWidget);
  }

  public removeWidget(position: number): void {
    // Add to array to delete it from database if user saves (it has an _id if exists in db)
     if(this.widgets[position]._id!=null) {
       this.widgetsToBeDeleted.push(this.widgets[position]);
     }

    this.widgets.splice(position, 1);

    //Update positions
    for(let widget of this.widgets) {
      if(widget.pos != this.widgets.indexOf(widget)) {
        widget.pos = this.widgets.indexOf(widget);
        break;
      }
    }

  }

}
