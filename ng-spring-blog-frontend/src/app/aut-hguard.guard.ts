import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from './Service/login.service';

@Injectable({
  providedIn: 'root'
})
export class AutHguardGuard implements CanActivate {
  constructor(private loginService: LoginService , private router: Router) {
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (this.loginService.isLoggedIn()) {
      return true;
    }
    else {
      this.router.navigateByUrl('/login');
      return false;
    }
  }

}
