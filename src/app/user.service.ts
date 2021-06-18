import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  
  
  userFavorites:any[]=[];
  userInfo:any;
  mediaType:string='';
  

  constructor( private _AuthService:AuthService) { 

  }

  setUserInfo()
  {
      this._AuthService.getUserInfo().subscribe((data)=>{
        this.userInfo=data;
      })
  }
  getUserFavorites() //Get all Favorite Movies From Local storge  
  {
    this.setUserInfo()
     
    if(localStorage.getItem(this.userInfo.email))
    {

       this.userFavorites=JSON.parse(localStorage.getItem(this.userInfo.email)!);
    }
    else
        this.updateFavorite();
   
  }
  
    
  setFavorite(favorite:any[],mediaType:string)// add movie or Tvshow   in UserFavorites
  {
   
     this.userFavorites.push({favorite:favorite,mediaType:mediaType});
     console.log(mediaType);
     
    this.updateFavorite();
  }
  getFavorite():Array<any[]>
  {
    this.getUserFavorites();
      return this.userFavorites;
  }
  removieFavorite(index:number)
  {
      this.userFavorites.splice(index,1);
      this.updateFavorite();
  }
  updateFavorite() //update the local storge After Add or Delete of userFavorties 
  {
    localStorage.setItem(this.userInfo.email,JSON.stringify(this.userFavorites));

  }
 
  
  

}
