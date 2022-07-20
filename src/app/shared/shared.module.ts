import { NgModule } from '@angular/core';

import { MaterialsModule } from './material-modules';

import { SharedComponents } from './components';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedAgGridComponents } from './ag-grid';

@NgModule({
    declarations: [
        SharedComponents,
        SharedAgGridComponents,
    ],
    imports: [ 
        NgxSpinnerModule,
        MaterialsModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        SharedComponents,
        SharedAgGridComponents,
        MaterialsModule,
        FormsModule,
        ReactiveFormsModule,
        NgxSpinnerModule
    ]
})
export class SharedModule{}