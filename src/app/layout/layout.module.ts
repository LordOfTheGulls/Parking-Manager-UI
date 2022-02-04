import { NgModule } from "@angular/core";

import { RouterModule } from "@angular/router";
import { BrowserModule } from "@angular/platform-browser";
import { CommonModule } from "@angular/common";
import { SharedModule } from "../shared/shared.module";

import { AppLayoutComponent } from "./layout.component";
import { AppHeaderComponent } from "./header/header.component";
import { AppSideBarComponent } from "./sidebar/sidebar.component";

@NgModule({
    declarations: [
        AppLayoutComponent,
        AppHeaderComponent,
        AppSideBarComponent,
    ],
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule,
        SharedModule,
    ],
    exports: [
        AppLayoutComponent
    ]
})
export class AppLayoutModule{

}