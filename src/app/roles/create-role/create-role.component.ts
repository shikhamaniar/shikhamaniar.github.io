import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { AuthServiceService } from 'src/app/services/auth-service.service';

@Component({
  selector: 'app-create-role',
  templateUrl: './create-role.component.html',
  styleUrls: ['./create-role.component.scss']
})
export class CreateRoleComponent implements OnInit {
  create = false;
  read = false;
  update = false;
  delete = false;
  value;
  createRoleForm: FormGroup;
  loading = false;
  submitted = false;
  permissions = [
    { name: 'Create', id: 1 },
    { name: 'Read', id: 2 },
    { name: 'Update', id: 3 },
    { name: 'Delete', id: 4 }];

  permissionsChecked = [];
  arr = [];
// permissionList;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthServiceService) {
    //    authService.viewAllRoles().subscribe((permissions: Permission[]) => {
    //   this.permissionList =permissions;
    // });

  }

  ngOnInit() {
    this.createRoleForm = this.formBuilder.group({
      name: ['', Validators.required],
      permissionIds: new FormControl(null, [Validators.required])
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.createRoleForm.controls; }

  onSubmit() {

    this.submitted = true;

    for (const item of this.permissionsChecked) {
      this.arr.push({
        id: item
      });
    }
    this.value = {
      name: this.createRoleForm.value.name,
      permissions: this.arr
    };
    if (this.createRoleForm.invalid) {
      return;
    }
    this.loading = true;

    this.authService.createRole(this.value)
      .pipe(first())
      .subscribe(
        data => {
          console.log(data);
          // this.alertService.success('Registration successful', true);
          this.router.navigate(['']);
        },
        error => {
          // this.alertService.error(error);
          this.loading = false;
        });
  }
  onChange(permissionId: number) {
    if (this.permissionsChecked.find(x => x === permissionId)) {
      this.permissionsChecked.splice(this.permissionsChecked.indexOf(permissionId), 1);
    } else {
      this.permissionsChecked.push(permissionId);
    }
  }

  get permissionIds() {
    return this.createRoleForm.get('permissionIds');
  }
}
