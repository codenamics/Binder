import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/_models/user';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: User;
  constructor(public accountService: AccountService, private router: Router) {}

  ngOnInit() {
  }
  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
