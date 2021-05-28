import { ThrowStmt } from '@angular/compiler';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material/tabs';
import { ActivatedRoute, Router } from '@angular/router';
import {
  NgxGalleryAnimation,
  NgxGalleryImage,
  NgxGalleryOptions,
} from '@kolkov/ngx-gallery';
import { ToastrService } from 'ngx-toastr';
import { Member } from 'src/app/_models/member';
import { MembersService } from 'src/app/_services/members.service';
import { MessageService } from 'src/app/_services/message.service';
import { PresenceService } from 'src/app/_services/presence.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css'],
})
export class MemberDetailComponent implements OnInit, OnDestroy {
  @ViewChild('tabs', { static: true }) tabGroup: MatTabGroup;
  member: Member;
  photoUrl: string;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  constructor(
    private memberService: MembersService,
    private route: ActivatedRoute,
    public presence: PresenceService,
    private messageService: MessageService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.loadMember();
    this.route.queryParams.subscribe((params) => {
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
        if (this.member.photoUrl === null) {
          this.photoUrl = './assets/user.png';
        } else {
          this.photoUrl = this.member.photoUrl;
        }
      });
  }
  activateMessages(tabIndex: number) {
    this.tabGroup.selectedIndex = tabIndex;
    console.log(tabIndex);
  }
  onTabChange(selectedTabIndex: number): void {
    if (selectedTabIndex !== 3) {
      this.messageService.stopHubConnection();
      return;
    }
  }
  ngOnDestroy(): void {
    this.messageService.stopHubConnection();
  }
  addLike(member: Member) {
    
    this.memberService.addLike(member.username).subscribe(() => {
      this.toastr.success('You have liked ' + member.knownAs);
    });
  }
}
