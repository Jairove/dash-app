import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [ AuthenticationService ]
})
export class NavbarComponent implements OnInit {

  @Output() onEdit: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private authService: AuthenticationService) { }

  ngOnInit() {
  }

  ngOnChanges() { }

  private logout() {
    this.authService.logout();
  }

  private isUserLoggedIn() {
    return this.authService.isUserLoggedIn();
  }

  private activateEdit() {
    this.onEdit.emit(true);
  }

}
