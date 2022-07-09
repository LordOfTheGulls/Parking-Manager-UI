import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";

import { SharedModule } from "src/app/shared/shared.module";
import { DashboardRoutingModule } from "./dashboard-routing.module";

import { DashboardComponent } from "./dashboard.component";

import { StatCardComponent } from "./components/stat-card/stat-card.component";
import { AgGridModule } from "ag-grid-angular";
import { NgxSpinnerModule } from "ngx-spinner";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

@NgModule({
    declarations: [
        DashboardComponent,
        StatCardComponent
    ],
    imports: [
        DashboardRoutingModule,
        SharedModule,
        AgGridModule,

    ],
    exports: [

    ],
    schemas:[CUSTOM_ELEMENTS_SCHEMA] 
})
export class DashboardModule {

}