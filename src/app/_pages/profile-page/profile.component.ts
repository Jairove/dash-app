import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthenticationService } from '../../_services/authentication.service';
import { DashboardService } from '../../_services/dashboard.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [ AuthenticationService, DashboardService ]
})
export class ProfileComponent implements OnInit {

  private profile = null;
  private newPassword;
  private verifyPassword;
  private passwordFeedbackLabel;
  private profileFeedbackLabel;

  constructor(
    private route: ActivatedRoute,
    private authenticationService: AuthenticationService,
    private dashboardService: DashboardService,
  ) {
    this.getProfile();
  }

  ngOnInit() {
  }

  private getProfile() {
    this.dashboardService.getProfile()
        .subscribe(
            profile => {this.profile = profile;}
        );
  }

  private resetLabels() {
    this.passwordFeedbackLabel = null;
    this.profileFeedbackLabel = null;
  }

  private updateProfile() {
    this.resetLabels();
    this.dashboardService.updateProfile(this.profile).subscribe(
      (response: string) => {this.profileFeedbackLabel = response}
    );
  }

  private changePassword() {
    this.resetLabels();
    if(this.newPassword===this.verifyPassword) {
      var password = {password: this.newPassword};
      this.authenticationService.changePassword(password).subscribe(
        (response: string) => {this.passwordFeedbackLabel = response}
      );
    }
    else {
      this.passwordFeedbackLabel = "Passwords do not match";
    }
  }

}
