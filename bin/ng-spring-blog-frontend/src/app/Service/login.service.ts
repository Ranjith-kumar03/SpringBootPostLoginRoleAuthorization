import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Login} from '../../model/login';
import {catchError, map} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {AuthResponse} from '../auth/register-success/JWTAuthResponse';
import {LocalStorageService} from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
   url = 'http://localhost:8080/api/auth/login';
  constructor(private http: HttpClient , private localStoarage: LocalStorageService) {


  }
  login(user: Login): Observable<boolean>
  {
   return this.http.post<AuthResponse>(this.url, user ).pipe(map(data => {
    this.localStoarage.store('authenticationToken', data.authenticationToken);
    this.localStoarage.store('username', data.username);
    return true;
   }) , catchError(this.errorHandler));

  }

  errorHandler(error: HttpErrorResponse)
  {
    return throwError(error || 'server error');
  }


  isLoggedIn(): boolean
  {
  return this.localStoarage.retrieve('username') != null;
  }

}
