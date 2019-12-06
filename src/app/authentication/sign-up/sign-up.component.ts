import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthServiceService } from '../../services/auth-service.service';
import { Role } from '../../classes/role';
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    public authService: AuthServiceService) {
    authService.viewAllRoles().subscribe((roles: Role[]) => {
      this.roleList = roles;
    });

  }

  // convenience getter for easy access to form fields
  get f() { return this.signUpForm.controls; }

  get roleIds() {
    return this.signUpForm.get('roleIds');
  }
  roleList;
  signUpForm: FormGroup;
  loading = false;
  submitted = false;
  rolesChecked = [];
  arr = [];
  phoneExist = false;
  emailExist = false;
  isDisabled = true;
  ngOnInit() {
    this.signUpForm = this.formBuilder.group({
      username: ['', Validators.required],
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      mname: [''],
      phone: ['', [Validators.required, Validators.pattern('[6-9]\\d{9}')]],
      // this.emailCheckUnique.bind(this)
      password: ['', [Validators.required, Validators.minLength(6)]],
      email: ['', [Validators.required, Validators.email]],
      enabled: true,
      accountNonExpired: true,
      credentialsNonExpired: true,
      roles: new FormControl(null, [Validators.required]),
      accountNonLocked: true

    });
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.signUpForm.invalid) {
      return;
    }
    for (const item of this.rolesChecked) {
      this.arr.push({
        id: item
      });
    }
    this.signUpForm.value.roles = this.arr;
    this.loading = true;
    this.authService.register(this.signUpForm.value)
      .pipe(first())
      .subscribe(
        data => {
          // this.alertService.success('Registration successful', true);
          this.router.navigate(['']);
        },
        error => {
          // this.alertService.error(error);
          this.loading = false;
        });
  }
  onChange(roleId: number) {
    if (this.rolesChecked.find(x => x === roleId)) {
      this.rolesChecked.splice(this.rolesChecked.indexOf(roleId), 1);
    } else {
      this.rolesChecked.push(roleId);
    }
  }
  userPhoneUnique(value) {
    if (value !== '') {
      this.authService.userExist(value).subscribe((res: any) => {
        if (res.success === true) {
          this.phoneExist = true;
          this.isDisabled = true;
        } else {
          this.phoneExist = false;
          this.isDisabled = false;
        }
      });
    }
  }
  userEmailUnique(value) {
    if (value !== '') {
      this.authService.userExist(value).subscribe((res: any) => {
        if (res.success === true) {
          this.emailExist = true;
          this.isDisabled = true;
        } else {
          this.emailExist = false;
          this.isDisabled = false;
        }
      });
    }
  }
}
