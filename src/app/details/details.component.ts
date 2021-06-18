import { Component, OnInit ,OnDestroy} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MoviesService } from '../movies.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit , OnDestroy {

  constructor(private _ActiveRoute:ActivatedRoute,private _MoviesService:MoviesService,private router:Router,private _UserService:UserService) { }
  mediaType:any; //media Type of details item
  id:any;        // id of detail iteam
  details:any=[];// to store all information About  detail item (movie or Tv)
  name:string='';
  subDetail:any; // to unsubscripe Details Data
  subPerson:any;// to unsubscripe Person Data
  
  setDetailsInfo() //get media Type and Id 
  {
    this.mediaType=this._ActiveRoute.snapshot.paramMap.get('mediaType');
    this.id=this._ActiveRoute.snapshot.paramMap.get('id');
    console.log(this.mediaType,this.id);

  }

    getDetails()// get All Details Infromation  and Store it in Details Array Before Display in Details Component
    {
    
        // passing the media Type and ID to Api to Get the Details Data and Store it in Details 
        this.subDetail= this._MoviesService.getDetails(this.mediaType,this.id).subscribe((data)=>{
          if(data)
            this.details=data;
            
         
      
      });       
    }
    //Check if this is TVshow or not 
    isTvshow():boolean
    {
       return  this.mediaType=='tv';
    }
    isPerson()//check if  this Details For Person Or not
    {
       return  this.mediaType=='person';
    }

    setPersonDetails()  
    {
      
       this.subPerson= this._MoviesService.getPopularity('person').subscribe((data)=>{
          //Get Details OF that Person 
          this.details=data.results.filter((item:any)=>{
            return item.id==this.id;
          });
          console.log(this.details,'wewewewe');   
      }); 
        
    }

    addToFavorites(movie:any[],mediaType:string)
  {
      this._UserService.setFavorite(movie,mediaType);
      
  }
 
    reloadCurrentRoute(mediaType:string,id:number) //Reload Current Route TO Update The URl TO go to Works of Person
    {

        this.router.navigateByUrl(`/details/${mediaType}/${id}`);
        this.ngOnInit();
  }

   


  ngOnInit(): void {
    this.setDetailsInfo();
    if(this.isPerson())
        this.setPersonDetails();
        else
          this.getDetails();

           
  }
  

  ngOnDestroy()
  {
    if(this.isPerson())
    this.subPerson.unsubscribe();
    else
      this.subDetail.unsubscribe();
      
  }


}
