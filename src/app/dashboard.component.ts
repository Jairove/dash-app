import { NewsRssComponent } from './news-rss/news-rss.component';
import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { TodoComponent } from './todo/todo.component';
import { QuotesComponent } from './quotes/quotes.component';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  //La lista de widgets deberia recuperarse de la db y contener el orden de los widgets
  public widgets = [{type: NewsRssComponent, colSize: "col-md-8"},{type: QuotesComponent, colSize: "col-md-4"},{type: TodoComponent, colSize: "col-md-4"}];

  constructor() {
  }

}
