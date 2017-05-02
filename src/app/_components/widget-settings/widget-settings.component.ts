import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'widget-settings',
  templateUrl: './widget-settings.component.html',
  styleUrls: ['./widget-settings.component.css']
})
export class widgetSettingsComponent implements OnInit {
  @Input() type: string;
  @Input() idwidget: string;
  private editWidgetForm = {};

  constructor() { }

  ngOnInit() {
  }

  private updateWidget() {
    console.log(this.editWidgetForm);
  }

}
