import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  @Output() toogleLogin = new EventEmitter();
  model: any = {};
  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit() {}
  toogle() {
    this.toogleLogin.emit(false);
  }
  register() {
    this.accountService.register(this.model).subscribe((res) => {
      console.log(res);
      this.router.navigateByUrl('/main');
    });
  }
}
