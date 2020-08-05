import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Register} from '../../../model/register';
import {AuthServiceService} from '../../Service/auth-service.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  registerUser: Register;
  constructor(private builder: FormBuilder , private authService: AuthServiceService , private router: Router) {
    this.registerForm = this.builder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
  }

  onSubmit()
  {
  this.registerUser = this.registerForm.value;
  this.authService.register(this.registerUser).subscribe(data => {
    // console.log(`${data.value} is added to Backend`);

   this.router.navigateByUrl('/registersuccess');
  }, error => {
    console.log(`${error}  on processing data`);
  });

  }

}
