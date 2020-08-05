import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {LocalStorageService} from 'ngx-webstorage';
import {Observable} from 'rxjs';

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
  constructor(private $localStorage: LocalStorageService) {

  }

  intercept(req: HttpRequest<any>,
            next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.$localStorage.retrieve('authenticationToken');
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
