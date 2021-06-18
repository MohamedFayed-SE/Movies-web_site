import { Injectable } from '@angular/core';
import { Observable,BehaviorSubject } from 'rxjs';
import {HttpClient} from '@angular/common/http'
import jwtDecode from 'jwt-decode';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userInfo=new BehaviorSubject<any>([]);
  userFavorites:any[]=[];

  constructor(private _Http:HttpClient) {
   }
  signUp(registrationForm:any):Observable<any>
  {
      return this._Http.post('https://routeegypt.herokuapp.com/signup',registrationForm);
  }

  signIn(loginForm:any):Observable<any>
  {
      return this._Http.post('https://routeegypt.herokuapp.com/signin',loginForm);    
  }
  getUserInfo():Observable<any>// get All User Infromation From User Local Storge
  {
    let token:any=localStorage.getItem('userToken');
      this.userInfo.next(jwtDecode(token));
     return this.userInfo;
  }
 
  
}
