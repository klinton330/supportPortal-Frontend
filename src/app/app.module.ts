import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AuthenticationService } from './service/authentication.service';
import { UserService } from './service/user.service';
import { AuthIntercepterInterceptor } from './intercepter/auth-intercepter.interceptor';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [AuthenticationService,UserService,
    {provide:HTTP_INTERCEPTORS, useClass:AuthIntercepterInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
