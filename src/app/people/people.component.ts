import { Component, OnInit,OnDestroy } from '@angular/core';
import { MoviesService } from '../movies.service';



@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.scss']
})
export class PeopleComponent implements OnInit ,OnDestroy {

  persons:any[]=[];
  sub:any;
  searchValue:string='';
  constructor(private _MoviesService:MoviesService) { }

  getPersons()
  {
    this.sub=this._MoviesService.getPopularity('person').subscribe((response)=>{
      this.persons=response.results;
      //console.log(this.persons);
    })
  }
  
  search()
  {
    this._MoviesService.setSearch().subscribe((data)=>{
      this.searchValue=data;
    })
  }


  ngOnInit(): void {
    this.getPersons();
    this.search();
    
  }
  ngOnDestroy()
  {
      this.sub.unsubscribe();
  }


}
