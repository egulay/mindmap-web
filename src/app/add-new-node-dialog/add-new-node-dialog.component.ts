import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-add-new-node-dialog',
  templateUrl: './add-new-node-dialog.component.html',
  styleUrls: ['./add-new-node-dialog.component.css']
})
export class AddNewNodeDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddNewNodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
