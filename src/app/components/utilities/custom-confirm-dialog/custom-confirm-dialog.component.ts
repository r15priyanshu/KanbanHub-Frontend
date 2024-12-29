import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { CustomConfirmDialogData } from '../../../helpers/custom-confirm-dialog-data';

@Component({
  selector: 'app-custom-confirm-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './custom-confirm-dialog.component.html',
  styleUrl: './custom-confirm-dialog.component.css'
})
export class CustomConfirmDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data:CustomConfirmDialogData){
  }
}
