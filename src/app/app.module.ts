import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { JsonpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap';
import { DragulaModule } from 'ng2-dragula';
import { RouterModule }   from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TodoComponent } from './todo/todo.component';
import { QuotesComponent } from './quotes/quotes.component';
import { WidgetWrapperComponent } from './widget-wrapper/widget-wrapper.component';
import { NewsRssComponent } from './news-rss/news-rss.component';
import { HomeComponent } from './_components/home/home.component';
import { RegisterComponent } from './_components/register/register.component';
import { DashboardComponent } from './_components/dashboard/dashboard.component';
import { LoginComponent } from './_components/login/login.component';
import { LoginGuard } from './_services/login-guard.service';
import { AuthenticationService } from './_services/authentication.service';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TodoComponent,
    QuotesComponent,
    WidgetWrapperComponent,
    NewsRssComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent
  ],
  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    DragulaModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: 'dash',
        component: DashboardComponent,
        canActivate: [LoginGuard]
      },
    ])
  ],
  entryComponents: [
    TodoComponent,
    QuotesComponent,
    NewsRssComponent
  ],
  providers: [
    LoginGuard,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
