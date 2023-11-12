import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { CustomHttpResponse } from '../model/custom-http-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private host=environment.apiURL;
  constructor(private http:HttpClient) { }

  public getUsers():Observable<User[]|HttpErrorResponse>{
    return this.http.get<User[]>(`${this.host}/user/list`);
  }

  public addUser(formData:FormData):Observable<User|HttpErrorResponse>{
     return this.http.post<User>(`${this.host}/user/adduser`,formData)
  }

  public updateUser(formData:FormData):Observable<User|HttpErrorResponse>{
    return this.http.post<User>(`${this.host}/user/updateuser`,formData)
  }

  public resetPassword(email:String):Observable<any|HttpErrorResponse>{
    return this.http.get<CustomHttpResponse>(`${this.host}/user/resetpassword/${email}`)
  }

  public updateProfileImage(formData:FormData):Observable<HttpEvent<User>|HttpErrorResponse>{
    return this.http.post<User>(`${this.host}/user/resetpassword`,formData,{reportProgress:true,observe:'events'})
  }

  public deleteUser(userId:number):Observable<any|HttpErrorResponse>{
    return this.http.delete<CustomHttpResponse>(`${this.host}/user/delete/${userId}`)
  }

  public addUsersToLocalCache(users:User[]):void{
    localStorage.setItem('users',JSON.stringify(users));
  }
  
  public getUsersToLocalCache():any{
    if(localStorage.getItem('users')){
      return JSON.parse(localStorage.getItem('users')||'')
    }
    return null;
  }

  public createUserFormData(loggedInUserName:string,user:User,profileImage:File):FormData{
     const formData=new FormData();
     formData.append('currentUsername',loggedInUserName);
     formData.append('firstName',user.firstName);
     formData.append('lastName',user.lastName);
     formData.append('username',user.userName);
     formData.append('email',user.email);
     formData.append('role',user.role);
     formData.append('profileImage',profileImage);
     formData.append('isActive',JSON.stringify(user.active))
     formData.append('isNonLocked',JSON.stringify(user.notLocked));
     formData.append('profileImage',profileImage)

     return formData;
  }

}
