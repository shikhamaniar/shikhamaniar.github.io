import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Role } from '../classes/role';
import { User } from '../classes/user';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  baseurl = 'http://localhost:9191';

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer 5a9a0ba2-c5fc-4eb3-b3ed-3c195e9771df'
    })
  }; // signup


  httpOptions1 = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*',
      Authorization: 'Basic ' + btoa('mobile:pin')
    })
  }; // login

  constructor(private http: HttpClient, private snackBar: MatSnackBar) { }
  login(data) {
    console.log('start');
    return this.http.post(this.baseurl + `/oauth/token`, JSON.stringify(data), this.httpOptions1)
      .pipe(
        //  retry(2),
        map(user => {
          console.log(user);
          // // login successful if there's a jwt token in the response
          // if (user && user.token) {
          //   localStorage.setItem('currentUser', JSON.stringify(user));
          // }
          return user;
        }), catchError(this.errorHandl)
      );
  }

  // logout() {
  //   localStorage.removeItem('currentUser');
  // }
  register(user) {

    return this.http.post(this.baseurl + `/users`, JSON.stringify(user), this.httpOptions).pipe(
      // retry(2),
      map(userdetails => {
        return userdetails;
      }), catchError(this.errorHandl)
    );
  }

  // Error handling
  errorHandl(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    this.snackBar.open(error.error_description, 'Error', { duration: 5000 });
    console.log(errorMessage);
    return throwError(errorMessage);
  }
  createRole(data) {
    return this.http.post(this.baseurl + `/roles`, JSON.stringify(data), this.httpOptions)
      .pipe(
        retry(2),
        map(user => {
          console.log(user);
          return user;
        }), catchError(this.errorHandl)
      );
  }
  viewAllRoles() {
    return this.http.get<Role[]>(this.baseurl + `/roles`, this.httpOptions)
      .pipe(
        retry(2), catchError(this.errorHandl)
      );
  }
  viewAllUsers() {
    return this.http.get<User[]>(this.baseurl + `/users`, this.httpOptions)
      .pipe(
        retry(2), catchError(this.errorHandl)
      );
  }
  userExist(value: string) {
    return this.http.get(this.baseurl + `/users/exist/` + value, this.httpOptions)
      .pipe(
        retry(2),
        map(response => {
          return response;
        }), catchError(this.errorHandl)
      );
  }

}
