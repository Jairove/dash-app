import { Component,
        ViewChild,
        ViewContainerRef,
        Input, Type,
        ComponentRef,
        ComponentFactoryResolver,
        Compiler, OnInit } from '@angular/core';

@Component({
  selector: 'widget-wrapper',
  template: `<div #target></div>`
})
export class WidgetWrapperComponent implements OnInit {
  @ViewChild('target', {read: ViewContainerRef}) target: ViewContainerRef;
  @Input() type: Type<Component>;
  @Input() idwidget: string;
  cmpRef: any;
  private isViewInitialized:boolean = false;

  constructor(private componentFactoryResolver: ComponentFactoryResolver, private compiler: Compiler) {}

  updateComponent() {
    if(!this.isViewInitialized) {
      return;
    }
    if(this.cmpRef) {
      // when the `type` input changes we destroy a previously
      // created component before creating the new one
      this.cmpRef.destroy();
    }

    let factory = this.componentFactoryResolver.resolveComponentFactory(this.type);
    this.cmpRef = this.target.createComponent(factory);
    this.cmpRef.instance.id = this.idwidget;

  }

  ngOnChanges() {
    this.updateComponent();
  }

  ngOnDestroy() {
    if(this.cmpRef) {
      this.cmpRef.destroy();
    }
  }

  ngOnInit(){
      this.isViewInitialized = true;
      this.updateComponent();
  }

}
