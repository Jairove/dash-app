import { NewsRssComponent } from '../../news-rss/news-rss.component';
import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { TodoComponent } from '../../todo/todo.component';
import { QuotesComponent } from '../../quotes/quotes.component';
import { WeatherComponent } from '../../weather/weather.component';
import { WelcomeComponent } from '../../welcome/welcome.component';
import { DashboardService } from '../../_services/dashboard.service';
import { CoversComponent } from '../../covers/covers.component';
import { FormControl, FormGroup } from '@angular/forms';
import { Router,
         Event,
         NavigationStart,
         NavigationEnd,
         NavigationCancel,
         NavigationError} from '@angular/router';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  providers: [ DashboardService ]
})
export class DashboardComponent implements OnInit {
  private loading = true;
  private editMode = false;
  private widgets: any = [{__t: 'WelcomeComponent', colSize: "col-md-6", pos: 0, id: "init"}];
  private response: String;
  private widgetsToBeDeleted: Array<any> = [];
  private edibleWidget = { pos: null, __t: 'QuotesComponent', colSize: 'col-md-6' };

  private types = {
    'WelcomeComponent': WelcomeComponent,
    'WeatherComponent': WeatherComponent,
    'NewsRssComponent': NewsRssComponent,
    'CoversComponent': CoversComponent,
    'QuotesComponent': QuotesComponent,
    'TodoComponent': TodoComponent
  };

  constructor(private dashboardService: DashboardService, private router: Router) {
    router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }
  
  private getWidgets() {
    this.dashboardService.getWidgets()
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
        this.dashboardService.updateWidget(widget).subscribe();
      }
      else {
        this.dashboardService.updateWidget(widget).subscribe();
      }
    }

    // Remove the deleted widgets if any
    for(let widget of this.widgetsToBeDeleted) {
      this.dashboardService.removeWidget(widget._id).subscribe();
    }

    this.getWidgets();
  }

  ngOnInit() {
    this.getWidgets();
  }

  public toggleEdit() {
    this.editMode = !this.editMode;
    this.updateDash();
  }

  public setEdibleWidget(widget): void {
    this.edibleWidget = widget;
  }

  private editWidget(editedWidget) {
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

  // Shows and hides the loading spinner during RouterEvent changes
  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
        this.loading = true;
    }
    if (event instanceof NavigationEnd) {
        this.loading = false;
    }
    if (event instanceof NavigationCancel) {
        this.loading = false;
    }
    if (event instanceof NavigationError) {
        this.loading = false;
    }
  }

}
