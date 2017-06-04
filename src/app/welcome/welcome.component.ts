import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../_services/dashboard.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  providers: [DashboardService]
})
export class WelcomeComponent {
  private today: number = Date.now();
  private name = '';
  private widgetdata;

  constructor(private dashboardService: DashboardService) {
      this.getName();
  }

  private getName() {
    this.dashboardService.getProfile()
        .subscribe(
            profile => {this.name = profile.name;}
        );
  }

}
