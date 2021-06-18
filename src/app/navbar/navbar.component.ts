import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MoviesService } from '../movies.service';
import * as $ from 'jquery'; 


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(private _Router:Router,private _MoviesService:MoviesService) { }
   searchValue:string='';
  isLogIn():boolean // check if user in logged in or not if is not it will it will prevent hime to vist home page ,movies,tvshows for authintication
  {
      if(localStorage.getItem('userToken'))
        return true;
      return false;
  }
  
  logOut() // if user  logged out clear user token from local storge and Navigte hime to Login to Save Users Right
  {
    localStorage.removeItem('userToken');
    this._Router.navigateByUrl('/login');
  }
  getSearchValue(searchInput:string) //get the Input Value of Search Input in Navbar and Send it to Movies Service
  {
    this._MoviesService.getSearch(searchInput);
  }
  

  ngOnInit(): void {
  }

}
