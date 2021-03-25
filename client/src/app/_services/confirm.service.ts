import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { ConfirmModalComponent } from '../components/modals/confirm-modal/confirm-modal.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmService {
  dialogRef: MatDialogRef<unknown, any>;
  constructor(private dialog: MatDialog) {}
  confrim(): Observable<boolean> {
    this.dialogRef = this.dialog.open(ConfirmModalComponent, {
     
    });
    this.dialogRef.afterClosed().subscribe((result) => {
      console.log(result);
    });
    return new Observable<boolean>(this.getResult());
  }
  private getResult() {
    return (observer) => {
      const subscription = this.dialogRef.afterClosed().subscribe((result) => {
        observer.next(result);
        observer.complete();
      });
      return {
        unsubscribe() {
         subscription.unsubscribe();
        },
      };
    };
  }
}
