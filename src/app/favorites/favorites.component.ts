import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MoviesService } from '../movies.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  constructor( private _UserService:UserService,private _MoviesService:MoviesService,private _ActivatedRoute:ActivatedRoute) { }

  userFavorites:any[]=[];
  userEmail:any;//get the user Email from userService to get the Data from local store 
  searchValue:string='';
  mediaType:string='';

  

  getUserFavorites()
  {
      this.userFavorites=this._UserService.getFavorite();
      
  }

  search()//get Search Value From NavBar and Send it to Search Pipe in Hmtl 
  {
    this._MoviesService.setSearch().subscribe((data)=>{
      this.searchValue=data;
    })
  }
  

  removeFavorite(index:number)
  {
      this._UserService.removieFavorite(index);
  }
 
  ngOnInit(): void {
   
    this.getUserFavorites();
    this.search();
  }

}
