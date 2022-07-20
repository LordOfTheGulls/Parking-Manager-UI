import {Component} from "@angular/core";
import { FormControl } from "@angular/forms";
import {ICellEditorAngularComp, ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellEditorParams, ICellRendererParams} from "ag-grid-community";

@Component({
   template: `
        <input [maxLength]="2" [formControl]="hoursControl"><span>H</span>
        <input [maxLength]="2" [formControl]="minutesControl"><span>M</span>
   `,
   styles: [`
        :host{
            display: flex;
            align-items: center;
            height: 100%;
        }

        input{
            flex: 1;
            width: 20px;
        }

        span{
            padding: 0 10px;
            font-weight: bold;
        }
   `]
})
export class RateLengthEditorComponent implements ICellEditorAngularComp {
    private params: any;

    public hoursControl:   FormControl = new FormControl();
    public minutesControl: FormControl = new FormControl();

    agInit(params: any): void {
       this.params = params;
       this.hoursControl   = params.hoursControl;
       this.minutesControl = params.minutesControl;
       
       const result = (params.value ?? 0).toFixed(2).split('.');
       
       if(result.length == 2){
          this.hoursControl.setValue(result[0], { emitEvent: false });
        this.minutesControl.setValue(result[1], { emitEvent: false });
       }
    }
   // gets called whenever the cell refreshes
    refresh(params: ICellRendererParams): boolean {
       // set value into cell again
       return true;
    }

    getValue() {
        return +`${this.hoursControl.value}.${this.minutesControl.value}`;
    }
}