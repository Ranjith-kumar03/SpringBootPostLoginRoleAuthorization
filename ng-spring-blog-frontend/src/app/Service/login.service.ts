import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Login} from '../../model/login';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError, BehaviorSubject} from 'rxjs';
import {AuthResponse} from '../auth/register-success/JWTAuthResponse';
import {LocalStorageService} from 'ngx-webstorage';
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from 'src/model/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

   url = 'http://localhost:8080/api/auth/login';
   public currentUser: Observable<User>;
  public currentUserSubject: BehaviorSubject<User>;
  constructor(private http: HttpClient , private localStoarage: LocalStorageService) {
    this.currentUserSubject = new BehaviorSubject<User> (JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
console.log(this.currentUser)
  }
  login(user: Login): Observable<boolean>
  {
   return this.http.post<AuthResponse>(this.url, user ).pipe(map(data => {
     console.log(data.authenticationToken)
     console.log(data.username)
     console.log(data.role)
     var user = new User()
     user.username = data.username
     user.token= data.authenticationToken
     user.role = data.role
     this.localStoarage.store('currentUser', JSON.stringify(user));
     this.currentUserSubject.next(user);
  // this.localStoarage.store('authenticationToken', data.authenticationToken);
   // this.localStoarage.store('username', data.username);
   // this.localStoarage.store('role', data.role);
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(data.authenticationToken);
const expirationDate = helper.getTokenExpirationDate(data.authenticationToken);
const isExpired = helper.isTokenExpired(data.authenticationToken);
console.log(decodedToken)
console.log(expirationDate )
console.log(isExpired)
    return true;
   }) , catchError(this.errorHandler));

  }


  errorHandler(error: HttpErrorResponse)
  {
    return throwError(error || 'server error');
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  isLoggedIn(): boolean
  {
  return this.localStoarage.retrieve('currentUser') !== null
  }


}
