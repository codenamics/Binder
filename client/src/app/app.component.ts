import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './_models/user';
import { AccountService } from './_services/account.service';
import { SPINNER } from 'ngx-ui-loader';
import { PresenceService } from './_services/presence.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private accountService: AccountService,
    private router: Router,
    private presence: PresenceService
  ) {}
  ngOnInit(): void {
    this.setCurrentUser();
  }
  setCurrentUser() {
    const user: User = JSON.parse(localStorage.getItem('user'));

    if (user) {
      this.router.navigateByUrl('/home/binds');
      this.accountService.setCurrentUser(user);
      this.presence.createHubConnection(user);
    }
  }
}
