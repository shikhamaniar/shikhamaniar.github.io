import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../authentication/auth-service.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
              private router: Router,
              private authservice: AuthServiceService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      grant_type: 'password',
      username: ['', Validators.required],
      password: ['', Validators.required],

    });
  }
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    //    console.log(this.f.username.value + '\n' + this.f.password.value);
    this.loading = true;
    this.authservice.login(this.loginForm.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log('logged in');
          // this.router.navigate([this.returnUrl]);
        },
        error => {
          console.log(error);
          // this.alertService.error(error);
          this.loading = false;
        });
  }
}
