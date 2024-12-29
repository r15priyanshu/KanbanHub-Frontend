import { Injectable } from '@angular/core';
import { CustomConfirmDialogData } from '../helpers/custom-confirm-dialog-data';
import { MatDialog } from '@angular/material/dialog';
import { CustomConfirmDialogComponent } from '../components/utilities/custom-confirm-dialog/custom-confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class UtilityComponentService {

  constructor(private matDialog:MatDialog) { }

  public openConfirmDialog(dialogData:CustomConfirmDialogData){
    return this.matDialog.open(CustomConfirmDialogComponent,{data:dialogData})
  }
}
