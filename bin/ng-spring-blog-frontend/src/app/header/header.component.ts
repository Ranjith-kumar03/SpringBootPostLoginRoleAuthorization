import { Component, OnInit } from '@angular/core';
import {LoginService} from '../Service/login.service';
import {LocalStorageService} from 'ngx-webstorage';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public loginService: LoginService , private localStoarage: LocalStorageService , private router: Router) {

  }

  ngOnInit(): void {
  }
  logout()
  {
    this.localStoarage.clear('username');
    this.localStoarage.clear('authenticationToken');
    this.router.navigateByUrl('/login');
  }
}
