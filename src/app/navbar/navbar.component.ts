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

  private editLabel = "Edit";

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
    // Change the link label
    if(this.editLabel=="Edit") this.editLabel = "Save";
    else this.editLabel = "Edit";

    // Emit the event
    this.onEdit.emit(true);
  }

}
