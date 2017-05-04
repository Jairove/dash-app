import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'widget-settings',
  templateUrl: './widget-settings.component.html',
  styleUrls: ['./widget-settings.component.css']
})
export class widgetSettingsComponent implements OnInit {
  @Input() type: string;
  @Input() pos: number;
  @Output() edited: EventEmitter<any> = new EventEmitter<any>();
  @Output() created: EventEmitter<any> = new EventEmitter<any>();
  private editWidgetForm = {__t: null, pos: null, colSize: null};

  private sizes = {
    'xs': 'col-md-2',
    's': 'col-md-4',
    'm': 'col-md-6',
    'l': 'col-md-8',
    'xl': 'col-md-10',
    'xxl': 'col-md-12'
  };

  constructor() {
  }

  ngOnInit() {
  }

  private saveWidget() {
    this.editWidgetForm.__t = this.type;
    this.editWidgetForm.pos = this.pos;
    if (this.editWidgetForm.colSize != null)
      this.editWidgetForm.colSize = this.sizes[this.editWidgetForm.colSize];

    if(this.editWidgetForm.pos!=null) this.edited.emit(this.editWidgetForm);
    else this.created.emit(this.editWidgetForm);
  }

}
