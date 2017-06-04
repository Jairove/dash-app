import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [ AuthenticationService ]
})
export class RegisterComponent implements OnInit {

  user = {
           username:"",
           password:"",
           name:""
         };
  status: string = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onSubmit() {
    if(this.user.password.length>=6) {
      this.authService.register(this.user.username, this.user.password, this.user.name)
              .subscribe(
                response => {
                  if(response==true) this.router.navigate(['./dash']);
                  else this.status = status;
                },
                error => {
                  this.status = <any>error;
                }

              );
    }
    else {
      this.status = 'The password must contain at least 6 characters.';
    }

  }

}
