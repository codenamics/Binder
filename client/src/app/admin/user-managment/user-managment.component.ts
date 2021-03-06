import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RolesModalComponent } from 'src/app/components/modals/roles-modal/roles-modal.component';
import { User } from 'src/app/_models/user';
import { AdminService } from 'src/app/_services/admin.service';
export interface DialogData {
  animal: string;
  name: string;
}
@Component({
  selector: 'app-user-managment',
  templateUrl: './user-managment.component.html',
  styleUrls: ['./user-managment.component.css']
})
export class UserManagmentComponent implements OnInit {
users: Partial<User[]>

  constructor(private adminService: AdminService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUsersWithRoles()
  }
  getUsersWithRoles(){
    this.adminService.getUsersWithRoles().subscribe(users =>{
      this.users = users;
    })
  }
  openDialog(user): void {
    const dialogRef = this.dialog.open(RolesModalComponent, {
      width: '500px',
      height: '500px',
      data: {user,
      roles: this.getRolesArray(user)
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      
    
    });
  }
  private getRolesArray(user) {
    const roles = [];
    const userRoles = user.roles;
    const availableRoles: any[] = [
      { name: 'Admin', value: 'Admin' },
      { name: 'Moderator', value: 'Moderator' },
      { name: 'Member', value: 'Member' },
    ];
    availableRoles.forEach((role) => {
      let isMatch = false;
      for (const userRole of userRoles) {
        if (role.name === userRole) {
          isMatch = true;
          role.checked = true;
          roles.push(role);
          break;
        }
      }

      if (!isMatch) {
        role.checked = false;
        roles.push(role);
      }
    });
    return roles;
  }
}


