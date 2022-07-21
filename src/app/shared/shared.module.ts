import { NgModule } from '@angular/core';

import { MaterialsModule } from './material-modules';

import { SharedComponents } from './components';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedAgGridComponents } from './ag-grid';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';

@NgModule({
    declarations: [
        SharedComponents,
        SharedAgGridComponents,
    ],
    imports: [ 
        NgxSpinnerModule,
        MaterialsModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMaterialTimepickerModule
    ],
    exports: [
        SharedComponents,
        SharedAgGridComponents,
        MaterialsModule,
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule,
        NgxMaterialTimepickerModule
    ]
})
export class SharedModule{}