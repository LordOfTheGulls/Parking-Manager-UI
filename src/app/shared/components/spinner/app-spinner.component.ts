import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
  } from '@angular/core';
  import { Size, NgxSpinnerService } from 'ngx-spinner';
  
  @Component({
    selector: 'app-spinner',
    template: `
      <ngx-spinner
        [name]="_name"
        [bdColor]="options.bdColor"
        [size]="options.size"
        [color]="options.color"
        [type]="options.type"
        [fullScreen]="options.fullScreen"
        [zIndex]="options.zIndex">
      </ngx-spinner>
    `,
  })
  export class SpinnerComponent implements OnChanges, OnInit {
    @Input() showSpinner = false;
    @Input() options: {
      bdColor?: string;
      size?: Size;
      color?: string;
      type?: string;
      fullScreen?: boolean;
      zIndex?: number;
    } = {};
    _name = '';
  
    constructor(private spinner: NgxSpinnerService) {
      this._name = `${Math.random()
        .toString(36)
        .slice(2, 7)}_${new Date().getTime()}`;
    }
  
    ngOnInit() {
      this.options = Object.assign(
        {
          bdColor: 'rgb(75 106 130 / 43%)',
          size: 'large',
          color: '#5b9ef1',
          type: 'line-scale',
          fullScreen: false,
          zIndex: 99999,
        },
        this.options
      );
    }
  
    _showSpinner(name: string) {
      this.spinner.show(name);
    }
  
    _hideSpinner(name: string) {
      this.spinner.hide(name);
    }
  
    ngOnChanges(changes: SimpleChanges): void {
      const showSpinnerChange = changes['showSpinner'];
      if (showSpinnerChange) {
        showSpinnerChange.currentValue
          ? this._showSpinner(this._name)
          : this._hideSpinner(this._name);
      }
    }
  }