import { NgModule } from "@angular/core";

import { SharedModule } from "src/app/shared/shared.module";
import { UsersRoutingModule } from "./users-routing.module";

import { UsersComponent } from "./users.component";

@NgModule({
    declarations: [
        UsersComponent
    ],
    imports: [
        UsersRoutingModule,
        SharedModule
    ],
    exports: [

    ]
})
export class UsersModule {

}