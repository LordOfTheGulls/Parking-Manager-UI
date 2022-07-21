import { NgModule } from "@angular/core";
import { AgGridModule } from "ag-grid-angular";

import { SharedModule } from "src/app/shared/shared.module";
import { PermissionDetailComponent } from "./components/permission-detail.component";
import { UsersRoutingModule } from "./users-routing.module";

import { UsersComponent } from "./users.component";

@NgModule({
    declarations: [
        UsersComponent,
        PermissionDetailComponent,
    ],
    imports: [
        AgGridModule,
        UsersRoutingModule,
        SharedModule
    ],
    exports: [

    ]
})
export class UsersModule {

}