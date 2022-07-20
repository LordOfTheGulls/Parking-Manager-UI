import {Component, ElementRef, ViewChild} from '@angular/core';
import {IHeaderAngularComp} from 'ag-grid-angular'
import {IHeaderParams} from 'ag-grid-community'

@Component({
   template: `
        <button mat-raised-button color="primary" id="new-btn" (click)="addNew()">
            New <mat-icon>control_point</mat-icon>
        </button>
   `,
   styles: [`
        :host{
            width: 100%;
            
            button{
                width: 100%;
            }
        }
   `]
})
export class ActionHeaderComponent implements IHeaderAngularComp {
    public params: any = {} as IHeaderParams;
   
    refresh(params: any): boolean {
       return false;
    }

    agInit(params: IHeaderParams): void {
       this.params = params;
    }

    public addNew(): void {
        this.params.action(this.params.node);
    }
}