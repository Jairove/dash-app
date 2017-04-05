import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { SettingsService } from '../../_services/settings.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ SettingsService ]
})
export class ProfileComponent implements OnInit {

  private profile = null;
  private newPassword;
  private verifyPassword;
  private passwordFeedbackLabel;
  private units = "metric";

  constructor(private route: ActivatedRoute, private settingsService: SettingsService) {
    this.getProfile();
  }

  unitsform = new FormGroup({
    units: new FormControl('metric'),
  });

  ngOnInit() {
  }

  private getProfile() {
    this.settingsService.getProfile()
        .subscribe(
            profile => {this.profile = profile;}
        );
  }

  private updateProfile() {
    this.settingsService.updateProfile(this.profile).subscribe();
  }

  private changePassword() {
    if(this.newPassword===this.verifyPassword) {
      var password = this.newPassword;
      this.settingsService.changePassword(password).subscribe();
    }
    else {
      this.passwordFeedbackLabel = "Passwords do not match";
    }
  }

  private onAnchorClick() {
    this.route.fragment.subscribe(f => {
     const element = document.querySelector("#" + f)
     if (element) element.scrollIntoView(element)
   })
  }

  private onProfileSubmit() {

  }

  private resetDashboard() {

  }

  private onPasswordSubmit() {

  }

}
