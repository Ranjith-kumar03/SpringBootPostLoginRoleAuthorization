import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {Register} from '../../model/register';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  constructor(private http: HttpClient) { }
   url = 'http://localhost:8080/api/auth/signup';

  register(registerUser: Register): Observable<any>
  {
   return this.http.post(this.url , registerUser).pipe(catchError(this.errorHandler));
  }

    errorHandler(error: HttpErrorResponse)
    {
        return throwError(error || 'server error');
      }
}
