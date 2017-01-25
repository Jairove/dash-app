import { Component } from '@angular/core';
import {NavbarComponent} from './navbar/navbar.component';
import {TodoComponent} from './todo/todo.component';
import {QuotesComponent} from './quotes/quotes.component';
import {DragulaService} from 'ng2-dragula';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  //La lista de widgets deberia recuperarse de la db y contener el orden de los widgets
  widgets = [QuotesComponent, TodoComponent, TodoComponent];

 public many: Array<string> = ['The', 'possibilities', 'are', 'endless!'];

  constructor(private dragulaService: DragulaService) {
    dragulaService.dropModel.subscribe((value) => {
      this.onDropModel(value.slice(1));
    });
    dragulaService.removeModel.subscribe((value) => {
      this.onRemoveModel(value.slice(1));
    });
  }

  private onDropModel(args) {
    let [el, target, source] = args;
    // do something else
  }

  private onRemoveModel(args) {
    let [el, source] = args;
    // do something else
  }
}
