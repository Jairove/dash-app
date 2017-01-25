import { Component } from '@angular/core';
import {NavbarComponent} from './navbar/navbar.component';
import {TodoComponent} from './todo/todo.component';
import {QuotesComponent} from './quotes/quotes.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  //La lista de widgets deberia recuperarse de la db y contener el orden de los widgets
  widgets = [QuotesComponent, TodoComponent];
  constructor() {
  }
}
