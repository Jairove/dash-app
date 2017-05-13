import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'widget-settings',
  templateUrl: './widget-settings.component.html',
  styleUrls: ['./widget-settings.component.css']
})
export class widgetSettingsComponent implements OnInit {
  @Input() widget;
  @Output() edited: EventEmitter<any> = new EventEmitter<any>();
  @Output() created: EventEmitter<any> = new EventEmitter<any>();
  private editWidgetForm = {__t: null, pos: null, colSize: null, feedUrls: ['']};
  private errorMessage = null;

  private sizes = {
    'xs': 'col-md-2',
    's': 'col-md-4',
    'm': 'col-md-6',
    'l': 'col-md-8',
    'xl': 'col-md-10',
    'xxl': 'col-md-12'
  };

  constructor() {}

  ngOnInit() {}

  ngOnChanges() {
    console.log('On changes');
    this.initializeWidgetForm();
  }

  ngDoCheck() {
    if(this.widget!=this.widget) this.initializeWidgetForm();
  }

  private cleanWidgetForm() {
    this.editWidgetForm = null;
    this.editWidgetForm = {__t: null, pos: null, colSize: null, feedUrls: ['']};
  }

  private initializeWidgetForm() {
    console.log(this.widget);

    // Initialize new widgets with default values
    if(this.widget.type == 'NewsRssComponent')
      if(this.widget.feedUrls.length==0)
        this.widget.feedUrls = ['http://news.ycombinator.com/rss'];

    if(this.widget.type == 'WeatherComponent')
      if(this.widget.lat == null || this.widget.lon == null || this.widget.units == null) {
        this.widget.lat = '40.712784';
        this.widget.lon = '-74.005941';
        this.widget.units = 'metric';
      }

    if(this.widget.colSize == null) {
      this.widget.colSize = 'col-md-6';
    }
  }

  private saveWidget() {
    this.editWidgetForm.__t = this.widget.__t;
    this.editWidgetForm.pos = this.widget.pos;

    if (this.editWidgetForm.colSize != null) this.editWidgetForm.colSize = this.sizes[this.editWidgetForm.colSize];
    else if(this.widget.colSize!=null && this.widget.colSize!=undefined) this.editWidgetForm.colSize = this.widget.colSize;

    if(this.editWidgetForm.pos!=null) this.edited.emit(this.editWidgetForm);
    else this.created.emit(this.editWidgetForm);
    this.cleanWidgetForm();
  }

  private addFeedUrl(url) {
    this.errorMessage = null;
    var index = this.widget.feedUrls.indexOf(url);
    if (index == -1) {
      if(this.isUrl(url)) this.widget.feedUrls.push(url);
      else this.errorMessage = 'The provided URL is invalid. Try again.';
    } else {
      this.errorMessage = 'This URL is already in your feed. Try another.'
    }
    this.editWidgetForm.feedUrls = this.widget.feedUrls;
  }

  private removeFeedUrl(url) {
    var index = this.widget.feedUrls.indexOf(url);
    if (index !== -1) {
        this.widget.feedUrls.splice(index, 1);
    }
    this.editWidgetForm.feedUrls = this.widget.feedUrls;
  }

  private isUrl(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(str);
  }

}
