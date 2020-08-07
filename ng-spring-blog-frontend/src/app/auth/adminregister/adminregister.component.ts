import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Register } from 'src/model/register';
import { AuthServiceService } from 'src/app/Service/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adminregister',
  templateUrl: './adminregister.component.html',
  styleUrls: ['./adminregister.component.css']
})
export class AdminregisterComponent implements OnInit {

  adminregisterForm: FormGroup;
  registerUser: Register;

  constructor(private builder: FormBuilder , private authService: AuthServiceService , private router: Router) {
    this.adminregisterForm = this.builder.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      role: ['ADMIN']
    });
  }


  ngOnInit(): void {
  }

  onSubmit()
  {
  this.registerUser = this.adminregisterForm.value;
  this.authService.register(this.registerUser).subscribe(data => {
    // console.log(`${data.value} is added to Backend`);

   this.router.navigateByUrl('/registersuccess');
  }, error => {
    console.log(`${error}  on processing data`);
  });

  }

}
