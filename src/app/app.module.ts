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
  MatSelectModule, MatIconModule, MatCheckboxModule, MatRadioModule, MatTableModule, MatPaginator, MatHeaderRow, MatPaginatorModule, MatFormFieldControl, MatFormFieldModule
} from '@angular/material';
import { ViewAllRolesComponent } from './view-all-roles/view-all-roles.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    CreateRoleComponent,
    ViewAllRolesComponent
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
    FormsModule],
  providers: [AuthServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
