import { NewsRssComponent } from './news-rss/news-rss.component';
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
  public widgets = [{type: QuotesComponent, colSize: "col-xs-3"},{type: TodoComponent, colSize: "col-xs-8"},{type: NewsRssComponent, colSize: "col-xs-8"}];

  constructor() {
  }

}
