import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { User } from 'src/app/_models/user';
import { UserParams } from 'src/app/_models/userParams';
import { AccountService } from 'src/app/_services/account.service';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-grid',
  templateUrl: './member-grid.component.html',
  styleUrls: ['./member-grid.component.css'],
})
export class MemberGridComponent implements OnInit {
  @Output() itemCount: EventEmitter<number> = new EventEmitter<number>();
  members: Member[];
  pagination: Pagination;
  userParams: UserParams;
  user: User;
  pageSizeOptions: number[] = [5, 10, 20, 50];
  pageEvent: PageEvent;
  lastActive = 'lastActive';
  created = 'created';
  genderList = [
    { value: 'male', display: 'Males' },
    { value: 'female', display: 'Females' },
  ];
  constructor(private memberService: MembersService) {
    this.userParams = this.memberService.getUserParams();
  }

  ngOnInit(): void {
    this.loadMembers();
  }
  loadMembers(filters?: string) {
    this.memberService.setUserParams(this.userParams);
    if (filters) {
      this.userParams.orderBy = filters;
    }
    this.memberService.getMembers(this.userParams).subscribe((response) => {
      this.members = response.result;
      this.pagination = response.pagination;
      console.log(this.pagination.totalItems);
      this.itemCount.emit(this.pagination.totalItems);
    });
  }
  resetFilter() {
    this.userParams = this.memberService.resetUserParams();
    this.loadMembers();
  }
  pageChanged(event: any) {
    this.userParams.pageNumber = event.pageIndex + 1;

    this.userParams.pageSize = event.pageSize;
    this.memberService.setUserParams(this.userParams);
    this.loadMembers();
  }
}
