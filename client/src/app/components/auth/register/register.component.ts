import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
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
  registerForm: FormGroup;
  constructor(private accountService: AccountService, private router: Router) {}

  ngOnInit() {
    this.initializeForm();
  }
  initializeForm() {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        this.matchValues('password'),
      ]),
    });
  }
  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value
        ? null
        : {
            notMatching: true,
          };
    };
  }
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
