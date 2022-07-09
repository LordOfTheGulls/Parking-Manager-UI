import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/layout.module';

import { AppComponent } from './app.component';

import { StoreModule } from '@ngrx/store';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { AuthCallbackComponent } from './auth-callback.component';
import { AuthGuard } from './core/guards/auth.guard';
import { NgxSpinnerModule } from "ngx-spinner";

@NgModule({
  declarations: [
    AppComponent,
    AuthCallbackComponent,
  ],
  imports: [
    CoreModule,
    HttpClientModule,
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppLayoutModule,
    AppRoutingModule,
    StoreModule.forRoot([]),
  ],
  exports: [
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
