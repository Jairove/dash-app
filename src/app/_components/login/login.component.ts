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
     // get the return url from route parameters or go to root
     this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/dash';

     // If the user is already loged in, we must redirect
     if(this.authenticationService.isUserLoggedIn()) {
        this.router.navigate([this.returnUrl]);
     }
  }

  username: string = '';
  password: string = '';

  errorMessage: any = '';

  onSubmit() {
    this.authenticationService.login(this.username,this.password)
                      .subscribe(
                          response => {
                            console.log(response);
                            if(response==true) this.router.navigate([this.returnUrl]);
                            else this.errorMessage = response;
                          },
                          error => {
                            this.errorMessage = <any>error;

                          }
                      );
  }

}
