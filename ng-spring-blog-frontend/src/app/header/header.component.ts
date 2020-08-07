import { Component, OnInit } from '@angular/core';
import {LoginService} from '../Service/login.service';
import {LocalStorageService} from 'ngx-webstorage';
import {Router} from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { User } from 'src/model/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  constructor(public loginService: LoginService , private localStoarage: LocalStorageService , private router: Router) {
    this.loginService.currentUser.subscribe(data => {
      this.currentUser = data;
      console.log(data)
    })

  }


  ngOnInit(): void {
    ///let role = this.localStoarage.retrieve('role')
    //console.log(role)
  }
  logout()
  {
    this.loginService.currentUserSubject.next(null);
    this.localStoarage.clear('currentUser');
    //this.localStoarage.clear('username');
   // this.localStoarage.clear('authenticationToken');
    //this.localStoarage.clear('role');
    this.router.navigateByUrl('/login');
    this.isAdmin()
  }


  isAdmin()
  {
    return this.currentUser?.role === 'ADMIN'? true:false;


  }
}
