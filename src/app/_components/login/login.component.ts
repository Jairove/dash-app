import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthenticationService]
})
export class LoginComponent implements OnInit {
  private returnUrl: string;

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
     // logout before login
     this.authenticationService.logout();

     // get the return url from route parameters or go to root
     this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  username: string = '';
  password: string = '';

  errorMessage: any = '';

  onSubmit() {
    this.authenticationService.login(this.username,this.password)
                      .subscribe(
                          status => { this.router.navigate([this.returnUrl]); },
                          error => { this.errorMessage = <any>error; }
                      );
  }

  // TODO: Remove this when we're done
  get diagnostic() { return JSON.stringify(this.username); }

}
