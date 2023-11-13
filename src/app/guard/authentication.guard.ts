import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../service/authentication.service';

@Injectable({providedIn:'root'})
export class AuthenticationGuard{

  constructor(private authService:AuthenticationService, private router:Router){}

  public isLoggedIn():boolean{
    if(this.authService.isLoggedIn()){
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
export const authenticationGuard:CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
  return inject(AuthenticationGuard).isLoggedIn();
};

