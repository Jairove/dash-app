import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';

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

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authService.register(this.user.username, this.user.password, this.user.name)
            .subscribe(
              status => {
                this.status = status;
              },
            );
  }

}
