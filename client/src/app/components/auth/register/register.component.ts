import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  minDate: Date;
  validationErrors: string[] = [];
  constructor(
    private toastr: ToastrService,
    private accountService: AccountService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initializeForm();
    const currentYear = new Date().getFullYear();
    this.minDate = new Date(currentYear - 18, 0, 0);
  }
  initializeForm() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      gender: ['male'],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(8)],
      ],
      confirmPassword: [
        '',
        [Validators.required, this.matchValues('password')],
      ],
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
    this.accountService.register(this.registerForm.value).subscribe(
      (res) => {},
      (error) => {},
      () => {
        this.router.navigateByUrl('/home/binds');
      }
    );
  }
}
