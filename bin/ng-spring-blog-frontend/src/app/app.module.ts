import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterSuccessComponent } from './auth/register-success/register-success.component';
import {ReactiveFormsModule} from '@angular/forms';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import {RouterModule} from '@angular/router';
import {AuthServiceService} from './Service/auth-service.service';
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from '@angular/common/http';
import {Ng2Webstorage} from 'ngx-webstorage';
import { HomeComponent } from './home/home.component';
import { AdpostComponent } from './adpost/adpost.component';
import {EditorModule} from '@tinymce/tinymce-angular';
import {HttpClientInterceptor} from './Service/http-interceptors.service';
import { PostComponent } from './post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    RegisterComponent,
    LoginComponent,
    RegisterSuccessComponent,
    PageNotFoundComponent,
    HomeComponent,
    AdpostComponent,
    PostComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule ,
    RouterModule ,
    HttpClientModule ,
    Ng2Webstorage.forRoot() ,
    EditorModule ,
    AppRoutingModule
  ],
  providers: [AuthServiceService , { provide: HTTP_INTERCEPTORS , useClass: HttpClientInterceptor , multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
