import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {RegisterComponent} from './auth/register/register.component';
import {PageNotFoundComponent} from './shared/page-not-found/page-not-found.component';
import {RegisterSuccessComponent} from './auth/register-success/register-success.component';
import {HomeComponent} from './home/home.component';
import {AdpostComponent} from './adpost/adpost.component';
import {PostComponent} from './post/post.component';
import {AutHguardGuard} from './aut-hguard.guard';
import { AdminregisterComponent } from './auth/adminregister/adminregister.component';
import { Role } from 'src/model/role';


const routes: Routes = [
  {path: '', redirectTo: '/login' , pathMatch: 'full'},
  {path: 'login',  component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'registerAdmin', component:  AdminregisterComponent ,canActivate: [AutHguardGuard], data: {roles: [Role.USER, Role.ADMIN]}},
  {path: 'post/:id', component: PostComponent, canActivate: [AutHguardGuard],data: {roles: [Role.USER, Role.ADMIN]}},
  {path: 'registersuccess', component: RegisterSuccessComponent},
  {path: 'home', component: HomeComponent},
  {path: 'addpost', component: AdpostComponent, canActivate: [AutHguardGuard],data: {roles: [Role.USER]}},
  {path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
