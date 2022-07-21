import {Component, ElementRef, ViewChild} from '@angular/core';
import {IHeaderAngularComp} from 'ag-grid-angular'
import {IHeaderParams} from 'ag-grid-community'

@Component({
   template: `
        <span>{{params.displayName}} </span><mat-icon>{{params.matIcon}}</mat-icon>
   `,
   styles: [`
        :host{
            width: 100%;
            display: flex;
            align-items: center;
            span{
                padding-right: 4px;
            }
        }
   `]
})
export class HeaderTextIconComponent implements IHeaderAngularComp {
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