import {Component} from "@angular/core";
import { FormControl } from "@angular/forms";
import {ICellEditorAngularComp, ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellEditorParams, ICellRendererParams} from "ag-grid-community";

@Component({
   template: `
        <input [style.width]="width" [formControl]="control"><span>{{label}}</span>
   `,
   styles: [`
        :host{
            display: flex;
            width: 100%;
            height: 100%;
            align-items: center;
            justify-content: center;

            input{
                width: 100%;
            }

            span{
                font-weight: bold;
                padding: 4px;
            }
        }
   `]
})
export class InputEditorComponent implements ICellEditorAngularComp {
    private params: any;

    public width: string = "100%";

    public label: string = '';

    public control: FormControl = new FormControl();

    agInit(params: any): void {
       this.params  = params;
       this.width   = params.width;
       this.label   = params.label;
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