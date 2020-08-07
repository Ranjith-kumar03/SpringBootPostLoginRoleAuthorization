import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {LocalStorageService} from 'ngx-webstorage';
import {Observable} from 'rxjs';
import { LoginService } from './login.service';
import { User } from 'src/model/user';

/*@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorsService implements HttpInterceptor {

  constructor(private $localstorage: LocalStorageService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.$localstorage.retrieve('authenticationToken');
    console.log('jwt token ' + token);
    if (token)
    {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
    });
      return next.handle((cloned));
    }else {
      return next.handle((req));
    }
  }
}*/

@Injectable()
export class HttpClientInterceptor implements HttpInterceptor {
  currentUser: User
  constructor(private loginService: LoginService , private $localStorage: LocalStorageService) {
    this.loginService.currentUser.subscribe(data => {
      this.currentUser = data;
    });
  }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    //const token = this.$localStorage.retrieve('authenticationToken');
    const token = this.currentUser?.token
    console.log('jwt token ' + token);
    if (token) {
      const cloned = req.clone({
        headers: req.headers.set('Authorization',
          'Bearer ' + token)
      });

      return next.handle(cloned);
    }
    else {
      return next.handle(req);
    }
  }
}
