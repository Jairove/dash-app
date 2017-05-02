import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { JsonpModule } from '@angular/http';
import { AlertModule } from 'ng2-bootstrap';
import { DragulaModule } from 'ng2-dragula';
import { RouterModule }   from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TodoComponent } from './todo/todo.component';
import { QuotesComponent } from './quotes/quotes.component';
import { WidgetWrapperComponent } from './widget-wrapper/widget-wrapper.component';
import { NewsRssComponent } from './news-rss/news-rss.component';
import { HomeComponent } from './_pages/home-page/home.component';
import { RegisterComponent } from './_components/register/register.component';
import { DashboardComponent } from './_pages/dashboard/dashboard.component';
import { LoginComponent } from './_components/login/login.component';
import { LoginGuard } from './_services/login-guard.service';
import { AuthenticationService } from './_services/authentication.service';
import { WeatherComponent } from './weather/weather.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { CoversComponent } from './covers/covers.component';
import { ProfileComponent } from './_pages/profile-page/profile.component';
import { LoginPageComponent } from './_pages/login-page/login-page.component';
import { RegisterPageComponent } from './_pages/register-page/register-page.component';
import { WidgetEditorComponent } from './_components/widget-editor/widget-editor.component';


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
    DashboardComponent,
    WeatherComponent,
    WelcomeComponent,
    CoversComponent,
    ProfileComponent,
    LoginPageComponent,
    RegisterPageComponent,
    WidgetEditorComponent
  ],
  imports: [
    AlertModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    DragulaModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'login',
        component: LoginPageComponent
      },
      {
        path: 'register',
        component: RegisterPageComponent
      },
      {
        path: 'dash',
        component: DashboardComponent,
        canActivate: [LoginGuard]
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [LoginGuard]
      }
    ])
  ],
  entryComponents: [
    TodoComponent,
    QuotesComponent,
    NewsRssComponent,
    WeatherComponent,
    WelcomeComponent,
    CoversComponent
  ],
  providers: [
    LoginGuard,
    AuthenticationService
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
