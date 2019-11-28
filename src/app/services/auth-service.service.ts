import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Role } from '../classes/role';
import { User } from '../classes/user';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {
  baseurl = 'http://localhost:9191';
  // 'http://192.168.2.133:9191';//gauri
  // 'http://192.168.2.185:9191';//bhagyashree
  //

  // Http Headers
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer 7d07826b-bc01-4453-9241-1d1559f8a25f'
    })
  }; // signup


  httpOptions1 = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Allow-Credentials': 'true',
      Authorization: 'Basic ' + btoa('mobile:pin')
      // Authorization: `Basic bW9iaWxlOnBpbg==`
    })
  }; // login

  constructor(private http: HttpClient) { }
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
    console.log(error);
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
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


}
