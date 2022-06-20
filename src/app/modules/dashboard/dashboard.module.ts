import { NgModule } from "@angular/core";

import { SharedModule } from "src/app/shared/shared.module";
import { DashboardRoutingModule } from "./dashboard-routing.module";

import { DashboardComponent } from "./dashboard.component";

import { StatCardComponent } from "./components/stat-card/stat-card.component";

@NgModule({
    declarations: [
        DashboardComponent,
        StatCardComponent
    ],
    imports: [
        DashboardRoutingModule,
        SharedModule
    ],
    exports: [

    ]
})
export class DashboardModule {

}