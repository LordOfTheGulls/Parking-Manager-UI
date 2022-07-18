import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { PaymentComponent } from './payment.component';

import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentRoutingModule } from './payment-routing.module';

@NgModule({
  declarations: [
    PaymentComponent,
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    PaymentRoutingModule,
    StoreModule.forRoot([]),
  ],
  exports: [
  ],
  providers: [
  
  ],
  bootstrap: [PaymentComponent]
})
export class AppModule { }
