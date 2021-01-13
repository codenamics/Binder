import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../../_models/user';
import { AccountService } from '../../_services/account.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  user: User;
 
  constructor(public accountService: AccountService, private router: Router) {}

  ngOnInit(): void {}
  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
