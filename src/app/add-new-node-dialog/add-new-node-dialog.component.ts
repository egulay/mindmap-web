import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef, MatSnackBar} from '@angular/material';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NodeService} from '../service/node.service';

@Component({
  selector: 'app-add-new-node-dialog',
  templateUrl: './add-new-node-dialog.component.html',
  styleUrls: ['./add-new-node-dialog.component.css']
})
export class AddNewNodeDialogComponent implements OnInit  {
  newLabelForm: FormGroup;

  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddNewNodeDialogComponent>, private nodeService: NodeService
    , public snackBar: MatSnackBar) { }


  onSubmit() {
    const deptId = '5b0be222f3be1b388cdc8dfd';

    this.nodeService.checkLabelIfExist(deptId, this.newLabelForm.controls['labelName'].value).then(isExist => {
        if (isExist) {
          this.snackBar.open('Label name is already exist: '.concat(this.newLabelForm.controls['labelName'].value)
            , 'Error', {duration: 2000, politeness: 'assertive'});
        } else {
          this.dialogRef.close(this.newLabelForm.controls['labelName'].value);
        }
    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.newLabelForm.get(field).valid && this.newLabelForm.get(field).touched));
  }

  ngOnInit(): void {
    this.newLabelForm = this.fb.group({
      labelName: ['', Validators.required]
    });
  }

}
