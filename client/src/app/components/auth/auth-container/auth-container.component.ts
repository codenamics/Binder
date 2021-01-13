import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../../../_services/account.service';

@Component({
  selector: 'app-auth-container',
  templateUrl: './auth-container.component.html',
  styleUrls: ['./auth-container.component.css']
})
export class AuthContainerComponent implements OnInit {

  model: any = {};
  loggedIn: boolean;
  registerMode = false;
  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit() {}
  login() {
    this.accountService.login(this.model).subscribe(
      (res) => {
        this.router.navigateByUrl('/home');
      },
      (error) => console.log(error)
    );
  }
  registerModeToggle(event: boolean){
   this.registerMode = event;
  }
  
}
