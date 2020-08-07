import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import {LoginService} from './Service/login.service';
import { User } from 'src/model/user';

@Injectable({
  providedIn: 'root'
})
export class AutHguardGuard implements CanActivate {
  currentUser: User
  constructor(private loginService: LoginService , private router: Router) {
    this.loginService.currentUser.subscribe(data => {
      this.currentUser = data;
      console.log(this.currentUser)
    });
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    /* if (this.loginService.isLoggedIn()) {
      return true;
    }
    else {
      this.router.navigateByUrl('/login');
      return false;
    } */
    this.loginService.currentUser.subscribe(data => {
      this.currentUser = data;
      console.log(this.currentUser)
    });
    if(this.currentUser) {
      if(route.data.roles && route.data.roles.indexOf(this.currentUser.role) === -1){
        console.log(route.data.roles)
        console.log(route.data.roles.indexOf(this.currentUser.role))
        this.router.navigate(['/401']);
        return false;
      }
      return true;
    }
    console.log(route.data.roles)
        console.log(route.data.roles.indexOf(this.currentUser?.role))
    console.log(this.currentUser)
    this.router.navigate(['/login']);
    return false;
  }

  }


