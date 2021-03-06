import { Component, EventEmitter, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserManagmentComponent } from 'src/app/admin/user-managment/user-managment.component';
import { User } from 'src/app/_models/user';

export interface DialogData {
  user: Partial<User>;
  roles: any
}
@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.css'],
})
export class RolesModalComponent implements OnInit {
  @Input() updateSelectedRoles = new EventEmitter()
  roles: any[]
  constructor(
    public dialogRef: MatDialogRef<UserManagmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
   
  }

  ngOnInit(): void {
   
  }

}
