import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private host=environment.apiURL;
  private token?:string
  private loggedInUserName?:String
  private jwtHelper=new JwtHelperService();

  constructor(private http:HttpClient){}
  
  login(user:User):Observable<HttpResponse<any>|HttpErrorResponse>{
    return this.http.post<HttpResponse<any>|HttpErrorResponse>(`${this.host}/user/login`,user,{observe:'response'})
    //{observe:'response'} we will get whole http response including the header
  }

  register(user:User):Observable<User|HttpErrorResponse>{
    return this.http.post<User|HttpErrorResponse>(`${this.host}/user/register`,user)
  }

  public logout(){

     this.token=undefined;
     this.loggedInUserName=undefined;
     localStorage.removeItem('user');
     localStorage.removeItem('token');
     localStorage.removeItem('users')
    }
    
    //Saving token in Local Storage
    public saveToken(token:string):void{
      this.token=token;
      localStorage.setItem('token',token);
    }
     //Saving User in Local Storage
    public addUserToLocalCache(user:User):void{
      localStorage.setItem('user',JSON.stringify(user));
    }
    
    public getUserFromLocalCache():User{
      return JSON.parse(localStorage.getItem('user')||'{}');
    }

    public loadToken():void{
      this.token=localStorage.getItem('token')||'';
    }

    public getToken():string{
      return this.token || ''
    }

    public isLoggedIn():Boolean{
      this.loadToken();
      if(this.token!=null&& this.token!=''){
         if(this.jwtHelper.decodeToken(this.token).sub!=null||''){
           if(!this.jwtHelper.isTokenExpired(this.token)){
              this.loggedInUserName=this.jwtHelper.decodeToken(this.token).sub;
              return true;
           }
         }
       }
      else{
        this.logout();
        return false;
      }
      return false;
    }
  }
