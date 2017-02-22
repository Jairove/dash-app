import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { JsonpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap';
import { DragulaModule } from 'ng2-dragula';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TodoComponent } from './todo/todo.component';
import { QuotesComponent } from './quotes/quotes.component';
import { WidgetWrapperComponent } from './widget-wrapper/widget-wrapper.component';
import { NewsRssComponent } from './news-rss/news-rss.component';
import { LoginComponent } from './_components/login/login.component';
import { RegisterComponent } from './_components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TodoComponent,
    QuotesComponent,
    WidgetWrapperComponent,
    NewsRssComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    DragulaModule
  ],
  entryComponents: [
    TodoComponent,
    QuotesComponent,
    NewsRssComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
