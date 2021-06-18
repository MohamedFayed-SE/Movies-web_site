import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-tvshow',
  templateUrl: './tvshow.component.html',
  styleUrls: ['./tvshow.component.scss']
})
export class TvshowComponent implements OnInit {

  constructor(private _MoviesService:MoviesService,private _UserService:UserService) { }
  tvShow:any[]=[];
  searchValue:string='';

  getMovies()
  {
    this._MoviesService.getPopularity('tv').subscribe((response)=>{
     this.tvShow=response.results; // get the Response Data From Api and Store it in Tvshow Array  
    })
  }
  search()//get Search Value From input Search From Nav bar and Put in Search
  {
    this. _MoviesService.setSearch().subscribe((data)=>{
      this.searchValue=data;
    })
  }
  addToFavorites(movie:any,mediaType:string)
  {
      this._UserService.setFavorite(movie,mediaType);
      
  }
 

  ngOnInit(): void {
    this.getMovies();
    this.search();
  }

}
