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

  constructor(private route: ActivatedRoute, private settingsService: SettingsService) {
    this.getProfile();
  }

  settingsform = new FormGroup({
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

  private saveSettings() {
    this.settingsService.saveSettings(this.settingsform.value).subscribe();
  }

  private changePassword() {
    if(this.newPassword===this.verifyPassword) {
      var password = {password: this.newPassword};
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

  private resetDashboard() {

  }

}
