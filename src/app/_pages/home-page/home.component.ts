import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../_services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [AuthenticationService]
})
export class HomeComponent implements OnInit {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit() {
    if(this.authenticationService.isUserLoggedIn()) {
      this.router.navigate(['./dash']);
    }
  }

  username: string = '';
  password: string = '';
  errorMessage: any = '';
  toggleLogin: boolean = true;

  onSubmit() {
    this.authenticationService.login(this.username,this.password)
                      .subscribe(
                          status => {
                            this.router.navigate(["/dash"]);
                          },
                          error => { this.errorMessage = <any>error; }
                      );
  }

  private showlogin() {
    this.toggleLogin = true;
  }
  
  private showregister() {
    this.toggleLogin = false;
  }

}
