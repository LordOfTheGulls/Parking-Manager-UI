import { NgModule } from "@angular/core";

import { SharedModule } from "src/app/shared/shared.module";
import { ParkingRoutingModule } from "./parking-routing.module";

import { ParkingComponent } from "./parking.component";

@NgModule({
    declarations: [
        ParkingComponent
    ],
    imports: [
        ParkingRoutingModule,
        SharedModule
    ],
    exports: [

    ]
})
export class ParkingModule {

}