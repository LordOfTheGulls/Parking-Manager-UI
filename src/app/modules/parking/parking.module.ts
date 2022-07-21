import { NgModule } from "@angular/core";

import { SharedModule } from "src/app/shared/shared.module";
import { ParkingRoutingModule } from "./parking-routing.module";

import { ParkingComponent } from "./parking.component";
import { GoogleMapsModule } from '@angular/google-maps';
import { AgGridModule } from "ag-grid-angular";
import { RateLengthEditorComponent } from "./components/rate-length-cell.component";
import { ParkingSpaceComponent } from "./components/parking-space.component";

@NgModule({
    declarations: [
        ParkingComponent,
        RateLengthEditorComponent,
        ParkingSpaceComponent
    ],
    imports: [
        AgGridModule,
        GoogleMapsModule,
        ParkingRoutingModule,
        SharedModule,
    ],
    exports: [

    ]
})
export class ParkingModule {

}