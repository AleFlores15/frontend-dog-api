import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Facts }  from '../../models/facts';


@Component({
  selector: 'app-edit-fact-dialog',
  templateUrl: './edit-fact-dialog.component.html',
  styleUrls: ['./edit-fact-dialog.component.css']
})
export class EditFactDialogComponent {
  editedFact: string;

  constructor(
    public dialogRef: MatDialogRef<EditFactDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { fact: Facts }
  ) {
    this.editedFact = data.fact.fact;
  }

  save() {
    this.dialogRef.close(this.editedFact);
  }

}
