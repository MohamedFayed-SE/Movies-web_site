import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  constructor(private _Http:HttpClient) { }

   private search=new Subject();
 
  getTrending(mediaType:string):Observable<any>  //get all trending Movies or Tv  from Api
  {
    return this._Http.get(`https://api.themoviedb.org/3/trending/${mediaType}/day?api_key=fbd6d9fd6fe6e3f2f9b3afc7ebf785a8`);
  }


  getDetails(mediaType:string,id:number):Observable<any> //get all Details of  (TVshow , Movie,person)
  {
    return this._Http.get(`https://api.themoviedb.org/3/${mediaType}/${id}?api_key=fbd6d9fd6fe6e3f2f9b3afc7ebf785a8&language=en-US`);
  }

  getPopularity(mediaType:string):Observable<any> //get All Popularity of (Movies,Tvshows,Persons)
  {
    return this._Http.get(`https://api.themoviedb.org/3/${mediaType}/popular?api_key=fbd6d9fd6fe6e3f2f9b3afc7ebf785a8&language=en-US&page=1`);
  }

  getSearch(searchValue:string)//get the Search Value From searchInput in Navbar 
  {
      this.search.next(searchValue);
  }
  
  setSearch():Observable<any> //Set the Search Value to the Component that User Search in 
  {
    return this.search;
  }
  


  
  
}
