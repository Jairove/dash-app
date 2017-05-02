import { Component, OnInit, Input, Type } from '@angular/core';

@Component({
  selector: 'app-widget-editor',
  templateUrl: './widget-editor.component.html',
  styleUrls: ['./widget-editor.component.css']
})
export class WidgetEditorComponent implements OnInit {
  @Input() type: Type<Component>;
  @Input() idwidget: string;

  constructor() { }

  ngOnInit() {
  }

}
