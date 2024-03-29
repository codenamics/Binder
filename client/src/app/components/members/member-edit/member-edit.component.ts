import { Component, HostListener, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  member: Member;
  user: User;
  photoUrl: string;
  constructor(
    private accountService: AccountService,
    private memberService: MembersService,
    private toastr: ToastrService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => {
        this.user = user
      });
  }

  ngOnInit(): void {
    this.loadMember();
  }
  ngDoCheck() {
    if (this.member?.photoUrl === this.member?.photoUrl) {
      if (this.member?.photoUrl === null) {
        this.photoUrl = './assets/user.png'
      } else {
        this.photoUrl = this.member?.photoUrl
      }
    }
  }
  loadMember() {
    this.memberService
      .getMember(this.user.username)
      .subscribe((member) => {
        this.member = member
        if (member?.photoUrl === null) {
          this.photoUrl = './assets/user.png'
        } else {
          this.photoUrl = member.photoUrl
        }
      });
  }
  updateMember() {
    this.memberService.updateMember(this.member).subscribe(() => {
      this.toastr.success('Profile updaated succesfully');
      this.editForm.reset(this.member);
    });
  }
}
