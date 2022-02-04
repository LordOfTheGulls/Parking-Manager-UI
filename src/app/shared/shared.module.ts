import { NgModule } from '@angular/core';

import { MaterialsModule } from './material-modules';

import { SharedComponents } from './components';

@NgModule({
    declarations: [
        SharedComponents,
    ],
    imports: [ 
    ],
    exports: [
        SharedComponents,
        MaterialsModule,
    ]
})
export class SharedModule{}