import { NgModule } from "@angular/core";
import { AgGridModule } from "ag-grid-angular";

import { SharedModule } from "src/app/shared/shared.module";
import { ReportsDetailComponent } from "./components/reports-detail.component";
import { ReportsRoutingModule } from "./reports-routing.module";
import { ReportsComponent } from "./reports.component";
import { MasterDetailModule } from '@ag-grid-enterprise/all-modules';
import { ReportsActionCellComponent } from "./components/reports-action-cell.component";

@NgModule({
    declarations: [
        ReportsComponent,
        ReportsDetailComponent,
        ReportsActionCellComponent
    ],
    imports: [
        SharedModule,
        AgGridModule,
        ReportsRoutingModule,
    ],
    exports: [

    ]
})
export class ReportsModule {

}