import { Injectable } from '@angular/core';
import { CustomConfirmDialogData } from '../helpers/custom-confirm-dialog-data';
import { MatDialog } from '@angular/material/dialog';
import {
  MatSnackBar,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { CustomConfirmDialogComponent } from '../components/utilities/custom-confirm-dialog/custom-confirm-dialog.component';
import { CustomSnackbarComponent } from '../components/utilities/custom-snackbar/custom-snackbar.component';
import { CustomSnackbarData } from '../helpers/custom-snackbar-data';

@Injectable({
  providedIn: 'root',
})
export class UtilityComponentService {
  constructor(private matDialog: MatDialog, private matSnackBar: MatSnackBar) {}

  public openConfirmDialog(dialogData: CustomConfirmDialogData) {
    return this.matDialog.open(CustomConfirmDialogComponent, {
      data: dialogData,
    });
  }

  public openCustomSnackBar(customSnackbarData:CustomSnackbarData): MatSnackBarRef<CustomSnackbarComponent> {
    return this.matSnackBar.openFromComponent(CustomSnackbarComponent, {
      data: customSnackbarData
    });
  }
}
