import { Component, OnDestroy, OnInit } from '@angular/core';
import { MoviesService } from '../movies.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit ,OnDestroy {

  constructor(private _Movies:MoviesService) { }
  trendingMovies:any[]=[];
  trendingTVShows:any[]=[];
  searchValue:string='';
  subTrending:any;

  getAllTrending()
  {
    this.subTrending=this._Movies.getTrending('all').subscribe((response)=>{
      // get All Trending Movies
      this.trendingMovies=response.results.filter((data:any)=>{
          return data.media_type=='movie';
      });
      // get All Trending TVshow
      this.trendingTVShows=response.results.filter((data:any)=>{
        return data.media_type=='tv';
      })

    })
  }
  search()//get Search Value From input Search From Nav bar and Put in Search
  {
    this._Movies.setSearch().subscribe((data)=>{
      this.searchValue=data;
    })
  }

  

  

  ngOnInit(): void {
    this.getAllTrending();
    this.search();
  }
  ngOnDestroy()
  {
    this.subTrending.unsubscribe();
  }

}
