import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { AuthenticationService } from '../_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  providers: [ AuthenticationService ]
})
export class NavbarComponent implements OnInit {

  @Output() onEdit: EventEmitter<boolean> = new EventEmitter<boolean>();

  private editLabel = "Edit";

  constructor(private authService: AuthenticationService, private router:Router) { }

  ngOnInit() {
  }

  ngOnChanges() { }

  private logout(): void {
    this.authService.logout();
  }

  private isUserLoggedIn(): boolean {
    return this.authService.isUserLoggedIn();
  }

  private isUserAtDash(): boolean {
    return this.router.url=='/dash';
  }

  private activateEdit(): void {
    // Change the link label
    if(this.editLabel=="Edit") this.editLabel = "Save";
    else this.editLabel = "Edit";

    // Emit the event
    this.onEdit.emit(true);
  }

}
