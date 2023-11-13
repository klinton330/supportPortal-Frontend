import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../service/authentication.service';

@Injectable()
export class AuthIntercepterInterceptor implements HttpInterceptor {

  constructor(private authenticationService:AuthenticationService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(request.url.includes(`${this.authenticationService.host}/user/login`))
    return next.handle(request);
    if(request.url.includes(`${this.authenticationService.host}/user/register`))
    return next.handle(request);
    if(request.url.includes(`${this.authenticationService.host}/user/resetpassword`))
    return next.handle(request);
    
    this.authenticationService.loadToken();
    const token=this.authenticationService.getToken();
    const newrequest=request.clone({setHeaders:{Authorization:`Bearer ${token}`}})
    return next.handle(request);
    
  }
}
