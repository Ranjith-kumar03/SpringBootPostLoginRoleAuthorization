import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {PostData} from '../../model/post-data';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostService {
   addurl = 'http://localhost:8080/api/posts/addpost';
   getAllUrl = 'http://localhost:8080/api/posts/all';
   getOneUrl = 'http://localhost:8080/api/posts/get/';
  constructor(private http: HttpClient) { }

  addPost(postData: PostData): Observable<any>
  {
   return  this.http.post(this.addurl, postData).pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse)
  {
    return throwError(error || 'server error');
  }

  getAllPost(): Observable<Array<PostData>>
  {
    return  this.http.get<Array<PostData>>(this.getAllUrl).pipe(catchError(this.errorHandler));
  }

  getOnePost(id: number): Observable<PostData>
  {
    return this.http.get<PostData>(this.getOneUrl + id).pipe(catchError(this.errorHandler));

  }

}
