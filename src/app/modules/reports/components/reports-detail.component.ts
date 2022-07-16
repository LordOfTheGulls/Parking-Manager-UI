import { OnInit, Component, ChangeDetectionStrategy, OnDestroy} from "@angular/core";
import { ICellRendererAngularComp } from "ag-grid-angular";
import { GridOptions, ICellRendererParams } from "ag-grid-community";
import { AutoUnsubscribe } from "ngx-auto-unsubscribe";

@AutoUnsubscribe()
@Component({
    template: `
        Test
    `,
    styles: [`
        
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportsDetailComponent implements ICellRendererAngularComp, OnInit, OnDestroy{
    public gridOptions: any;
    
    refresh(params: ICellRendererParams): boolean {
        return false;
    }

    agInit(params: ICellRendererParams): void {
    }

    ngOnInit() {

    }

    public loadReportsForPeriod(): void {

    }

    ngOnDestroy() {
        
    }
}