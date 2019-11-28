import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { SignUpComponent } from './authentication/sign-up/sign-up.component';
import { ViewAllUsersComponent } from './authentication/view-all-users/view-all-users.component';
import { CreateRoleComponent } from './roles/create-role/create-role.component';
import { ViewAllRolesComponent } from './roles/view-all-roles/view-all-roles.component';


const routes: Routes = [
  // { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'role', component: CreateRoleComponent  },
  { path: 'roles', component: ViewAllRolesComponent },
  { path: 'users', component: ViewAllUsersComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
