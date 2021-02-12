import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Member } from 'src/app/_models/member';
import { Pagination } from 'src/app/_models/pagination';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-likes',
  templateUrl: './likes.component.html',
  styleUrls: ['./likes.component.css']
})
export class LikesComponent implements OnInit {
 members: Partial<Member[]>;
pageNumber = 1;
pageSize = 5;
pagination: Pagination
pageSizeOptions: number[] = [5, 10, 20, 50];
pageEvent: PageEvent;
  constructor(private memberService: MembersService) { }

  ngOnInit(): void {
    this.loadLikes()
  }
  loadLikes(predicate = 'liked'){
    this.memberService.getLikes(predicate, this.pageNumber, this.pageSize).subscribe(response=>{
      this.members = response.result;
      this.pagination = response.pagination;
    
    })
  }
  pageChanged(event: any) {
    this.pageNumber = event.pageIndex + 1;

    this.pageSize = event.pageSize;
    
    this.loadLikes();
  }

}
