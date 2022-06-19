import { NgModule } from "@angular/core";

import { SharedModule } from "src/app/shared/shared.module";
import { SettingsRoutingModule } from "./settings-routing.module";

import { SettingsComponent } from "./settings.component";

@NgModule({
    declarations: [
        SettingsComponent
    ],
    imports: [
        SettingsRoutingModule,
        SharedModule
    ],
    exports: [

    ]
})
export class SettingsModule {

}