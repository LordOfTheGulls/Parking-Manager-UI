import {Component} from "@angular/core";
import { FormControl } from "@angular/forms";
import {ICellEditorAngularComp, ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellEditorParams, ICellRendererParams} from "ag-grid-community";

@Component({
   template: `
        <div class="24hr-example">
            <input placeholder="24hr format" aria-label="24hr format" [ngxTimepicker]="fullTime" [format]="24" readonly [formControl]="control">
            <ngx-material-timepicker #fullTime></ngx-material-timepicker>
       </div>
   `,
   styles: [`
        :host{
           display: flex;
           width: 100%;
           height: 100%;
           
            div{
                display: flex;
                width: 100%;
            }
        }
   `]
})
export class TimePickerEditorComponent implements ICellEditorAngularComp {
    private params: any;

    public control: FormControl = new FormControl();

    agInit(params: any): void {
       this.params  = params;
       this.control = params.control;
       this.control.setValue(params.value, { emitEvent: false });
    }
   // gets called whenever the cell refreshes
    refresh(params: ICellRendererParams): boolean {
       // set value into cell again
       return true;
    }

    getValue() {
        return this.control.value;
    }
}