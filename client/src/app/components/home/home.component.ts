import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';
import { MemberGridComponent } from '../members/member-grid/member-grid.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  user: User;
  totalItems: number;
  currentCount$: Observable<number>;
  private subscription: Subscription;

  constructor(public accountService: AccountService, private router: Router) {}

  ngOnInit() {
  }
  onActivate(component) {
    if (component instanceof MemberGridComponent) {
      this.subscription = component.itemCount.subscribe((count) => {
        this.currentCount$ = count;
      });
    }
  }
  onDeactivate() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
