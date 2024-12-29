import { Component, Inject } from '@angular/core';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import { CustomSnackbarData } from '../../../helpers/custom-snackbar-data';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-snackbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './custom-snackbar.component.html',
  styleUrl: './custom-snackbar.component.css',
})
export class CustomSnackbarComponent {

  private actionSubject = new Subject<void>();

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: CustomSnackbarData,
    private snackBarRef: MatSnackBarRef<CustomSnackbarComponent>
  ) {}

  getButtonClass() {
    return {
      'btn-success': this.data.snackbarType === 'success',
      'btn-danger': this.data.snackbarType === 'error',
      'btn-warning': this.data.snackbarType === 'warning'
    };
  }

  closeSnackBar() {
    this.snackBarRef.dismiss();
  }

  performAction() {
    //Just emmit an event , so that we can perform some action after it at the callers end.
    this.actionSubject.next();
    //Also dismiss the currently opened snackbar.
    this.snackBarRef.dismiss();
  }

  performCustomAction() {
    return this.actionSubject.asObservable();
  }
}
