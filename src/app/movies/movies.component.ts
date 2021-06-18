import { Component, OnInit,OnDestroy } from '@angular/core';
import { MoviesService } from '../movies.service';
import { UserService } from '../user.service';




@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, OnDestroy {

  constructor(private _moviesService:MoviesService ,private _UserService:UserService) {
    
  } 
  movies:any[]=[];
  searchValue:string='';
  anyvalue:any[]=[];
  sub:any;

  getMovies()// get the Response Data From Api and Store it in Movies Array 
  {
    this.sub=this._moviesService.getPopularity('movie').subscribe((response)=>{
     this.movies=response.results;  
    })
  }

  search()//get Search Value From NavBar and Send it to Search Pipe in Hmtl 
  {
    this._moviesService.setSearch().subscribe((data)=>{
      this.searchValue=data;
    })
  }
  addToFavorites(movie:any,mediaType:string)
  {
      this._UserService.setFavorite(movie,mediaType);
      
  }
 

  ngOnInit(): void {
    this.getMovies();// to Get all the Data when Routing to movie
    this.search();
  }
  ngOnDestroy()
  {
      this.sub.unsubscribe();
  }

}
