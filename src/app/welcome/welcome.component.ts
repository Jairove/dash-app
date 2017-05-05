import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  private today: number = Date.now();
  private name = '';
  private widgetdata;

  constructor() {
      this.name = JSON.parse(localStorage.getItem('settings')).name;
  }

  ngOnInit() {
  }

}
