import { Component, OnInit } from '@angular/core';
import { QuotesService } from './quotes.service';
import { Quote } from './quote';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css'],
  providers: [ QuotesService ]
})
export class QuotesComponent implements OnInit {
  public widgetdata;

  private quote: Quote = {
    text: 'Unavailable',
    author: 'Undefined'
  };

  constructor(private quotesService: QuotesService) { }

  ngOnInit() {
    this.refreshQuote();
  }

  private refreshQuote() {
    this.quotesService.getQuote()
        .subscribe(
            data => {
              this.quote = data;
            },
            error => console.log(error));
  }

}
