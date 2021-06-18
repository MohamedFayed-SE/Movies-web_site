import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {
    constructor(private _Router:Router){}
  canActivate():boolean|Observable<boolean> //Every time User Navigate Check if he is Logged in Or Not By Check User Token
  {
      let token=localStorage.getItem('userToken');

      if(token)
        return true;

      this._Router.navigateByUrl('/login');
      return false;

  }
}
