import { NgModule } from '@angular/core';

import { MaterialsModule } from './material-modules';

import { SharedComponents } from './components';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
    declarations: [
        SharedComponents,
    ],
    imports: [ 
    ],
    exports: [
        SharedComponents,
        MaterialsModule,
        NgxSpinnerModule
    ]
})
export class SharedModule{}