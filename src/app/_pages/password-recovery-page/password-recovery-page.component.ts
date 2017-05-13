import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-password-recovery-page',
  templateUrl: './password-recovery-page.component.html',
  styleUrls: ['./password-recovery-page.component.css'],
  providers: [ AuthenticationService ]
})
export class PasswordRecoveryPageComponent implements OnInit {
  private newPassword;
  private verifyPassword;
  private passwordFeedbackLabel = '';
  private reseted = false;


  constructor(private authService: AuthenticationService,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }

  private resetPassword() {
    if(this.newPassword===this.verifyPassword) {

      var token = this.route.snapshot.params['token'];
      this.authService.resetPassword(token, this.newPassword).subscribe( (response: string) => {
        if(response=="ok") {
          this.reseted = true;
          this.passwordFeedbackLabel = "Your password has been changed. Please, log in.";
        }
        else {
          this.passwordFeedbackLabel = 'The password could not be reset.' + response;
        }
      });

    }
    else {
      this.passwordFeedbackLabel = "The passwords do not match. Please, try again.";
    }
  }

}
