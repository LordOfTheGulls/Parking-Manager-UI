import { NgModule } from '@angular/core';

import { MaterialsModule } from './material-modules';

import { SharedComponents } from './components';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        SharedComponents,
    ],
    imports: [ 
        NgxSpinnerModule
    ],
    exports: [
        SharedComponents,
        MaterialsModule,
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule
    ]
})
export class SharedModule{}