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
import { HeaderComponent } from './header/header.component';
import {MAT_DIALOG_DEFAULT_OPTIONS, MatIconRegistry} from '@angular/material';

import {TreeModule} from 'primeng/tree';
import {ContextMenuModule} from 'primeng/contextmenu';
import { AddNewNodeDialogComponent } from './add-new-node-dialog/add-new-node-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    AddNewNodeDialogComponent,
  ],
  imports: [
    BrowserModule
    , AppMaterialModule
    , AppRoutingModule
    , HttpClientModule
    , FormsModule
    , BrowserAnimationsModule
    , ReactiveFormsModule
    , TreeModule
    , ContextMenuModule
  ],
  providers: [
    AuthService,
    AuthGuard,
    MatIconRegistry,
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}
  ],
  entryComponents: [
    AddNewNodeDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
