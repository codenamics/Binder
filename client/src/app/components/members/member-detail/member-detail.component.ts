import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryOptions,
} from '@kolkov/ngx-gallery';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent implements OnInit {
  @ViewChild('tabs', {static: true}) tabGroup: MatTabGroup;
  member: Member;
  photoUrl: string;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(
    private memberService: MembersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadMember();
    this.route.queryParams.subscribe(params =>{
      params.tab ? this.activateMessages(params.tab) : this.activateMessages(0);
    });
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
      },
    ];
    
  }
  getImages(): NgxGalleryImage[] {
    const imageUrls = [];
    for (const photo of this.member.photos) {
      imageUrls.push({
        small: photo?.url,
        medium: photo?.url,
        big: photo?.url,
      });
    }
    return imageUrls;
  }
  loadMember() {
    this.memberService
      .getMember(this.route.snapshot.paramMap.get('username'))
      .subscribe((member) => {
        this.member = member;
        this.galleryImages = this.getImages();
        if(this.member.photoUrl === null){
          this.photoUrl = './assets/user.png'
        }else{
          this.photoUrl = this.member.photoUrl
        }
      });
  }
  activateMessages(tabIndex: number){
    this.tabGroup.selectedIndex = tabIndex
    
  }
  onTabChange(selectedTabIndex: number): void {
    // this.router.navigate([], { relativeTo: this.route, queryParams: {
    //   tab: selectedTabIndex
    // }});
    // this.selectedTabIndex = selectedTabIndex;
    console.log(selectedTabIndex);
  }
}
