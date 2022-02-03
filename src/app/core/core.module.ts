import { CommonModule } from "@angular/common";
import { HttpClientModule } from "@angular/common/http";
import { NgModule, } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EnsureModuleLoadedOnce } from "./guards/ensureModuleLoadedOnce.guard";

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
    ],
    exports: [],
    declarations: [],
    providers: [],
})
export class CoreModule extends EnsureModuleLoadedOnce {
    constructor(parentModule: CoreModule){
        super(parentModule, 'CoreModule')
    }
}