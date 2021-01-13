import { Component, Input, OnInit } from '@angular/core';
import { Member } from 'src/app/_models/member';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member;
  photoUrl: string

  constructor() { }

  ngOnInit(): void {
    if(this.member.photoUrl === null){
      this.photoUrl = './assets/user.png'
    }else{
      this.photoUrl = this.member.photoUrl
    }
  }

}
