import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../_services/settings.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css'],
  providers: [SettingsService]
})
export class WelcomeComponent implements OnInit {
  private today: number = Date.now();
  private name = '';
  private widgetdata;

  constructor(private settingsService: SettingsService) {
      this.getName();
  }

  private getName() {
    this.settingsService.getProfile()
        .subscribe(
            profile => {this.name = profile.name;}
        );
  }

  ngOnInit() {
  }

}
