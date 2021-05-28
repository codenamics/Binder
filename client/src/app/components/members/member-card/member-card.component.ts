import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { ConfirmService } from 'src/app/_services/confirm.service';
import { MembersService } from 'src/app/_services/members.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member;
  photoUrl: string;

  constructor(private memberService: MembersService, private toastr: ToastrService,
              public presence: PresenceService, private confirmService: ConfirmService) {}

  ngOnInit(): void {
    if (this.member.photoUrl === null) {
      this.photoUrl = './assets/user.png';
    } else {
      this.photoUrl = this.member.photoUrl;
    }
  }
  addLike(member: Member){
    // this.confirmService.confrim();
    this.memberService.addLike(member.username).subscribe(()=>{
      this.toastr.success('You have liked ' + member.knownAs)
    })
  }
}
