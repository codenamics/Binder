import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../../_services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  @Output() toogleRegister = new EventEmitter()
  model: any = {};
  loggedIn: boolean;

  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit() {}
  login() {
    this.accountService.login(this.model).subscribe(
      (res) => {
        this.router.navigateByUrl('/home/binds');
      },
      (error) => console.log(error)
    );
  }
  toogle() {
    this.toogleRegister.emit(true)
  }
}
