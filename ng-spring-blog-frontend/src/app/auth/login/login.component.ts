import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Login} from '../../../model/login';
import {LoginService} from '../../Service/login.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginUser: Login;
  constructor(private builder: FormBuilder, private loginService: LoginService , private router: Router) {
    this.loginForm = this.builder.group({
      username: [],
      password: []
    });

  }

  ngOnInit(): void {
  }

  onSubmit()
  {
   this.loginUser = this.loginForm.value;
   this.loginService.login(this.loginUser).subscribe(data => {
     if(data) {
       console.log(` logged in sucess`);
       this.router.navigateByUrl('/home');
     }else {
       console.log(` logged in failed`);
     }


   }, error => {
     console.log(`${error}  on processing data`);
   });
  }

}
