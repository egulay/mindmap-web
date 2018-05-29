import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatListModule,
  MatSnackBarModule,
  MatIconModule,
  MatMenuModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSelectModule,
  MatDialogModule
} from '@angular/material';

@NgModule({
  imports: [CommonModule],
  exports: [
    MatToolbarModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    MatSnackBarModule,
    MatIconModule,
    MatMenuModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSelectModule,
    MatDialogModule
  ]
})
export class AppMaterialModule {
}
