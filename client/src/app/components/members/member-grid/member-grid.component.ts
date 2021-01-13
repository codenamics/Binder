import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-grid',
  templateUrl: './member-grid.component.html',
  styleUrls: ['./member-grid.component.css'],
})
export class MemberGridComponent implements OnInit {
  members$: Observable<Member[]>;
  constructor(private memberService: MembersService) {}

  ngOnInit(): void {
   this.members$ = this.memberService.getMembers()
  }
  
}
