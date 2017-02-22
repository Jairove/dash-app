import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {

  constructor(private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  username: string = '';
  password: string = '';

  loginSuccess: boolean = false;
  errorMessage: any = '';

  onSubmit() {
    this.authenticationService.login(this.username,this.password)
                      .subscribe(
                          status => { this.loginSuccess = status; },
                          error => { this.errorMessage = <any>error; }
                      );
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.username); }

}
