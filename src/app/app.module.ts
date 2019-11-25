import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule, FormGroup, FormGroupName } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthServiceService } from './authentication/auth-service.service';
import { APP_BASE_HREF } from '@angular/common';
import { SignUpComponent } from './sign-up/sign-up.component';
import { CreateRoleComponent } from './create-role/create-role.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatInputModule, MatCardModule, MatButtonModule,
  MatSelectModule, MatIconModule, MatCheckboxModule, MatRadioModule,
   MatTableModule, MatPaginatorModule, MatFormFieldModule, MatProgressBarModule
} from '@angular/material';
import { ViewAllRolesComponent } from './view-all-roles/view-all-roles.component';
import { ViewAllUsersComponent } from './view-all-users/view-all-users.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    CreateRoleComponent,
    ViewAllRolesComponent,
    ViewAllUsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCheckboxModule,
    MatCardModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MatRadioModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })],
  providers: [AuthServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
