import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {AppMaterialModule} from './app-material/app-material.module';

import {HttpClientModule} from '@angular/common/http';

import {DashboardComponent} from './dashboard/dashboard.component';

import {AppRoutingModule} from './app-routing.module';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthService} from './auth/auth.service';
import {AuthGuard} from './auth/auth.guard';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import 'hammerjs';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule
    , AppMaterialModule
    , AppRoutingModule
    , HttpClientModule
    , FormsModule
    , BrowserAnimationsModule
    , ReactiveFormsModule
  ],
  providers: [
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
