import { Component, Input, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-homecarousel',
  templateUrl: './homecarousel.component.html',
  styleUrls: ['./homecarousel.component.scss']
})
export class HomecarouselComponent implements OnInit {

  @Input() trendingMovies:any[]=[];
  constructor() { 
  }
  
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    margin:10,
    autoplayHoverPause:true,
    lazyLoad:true,
    lazyLoadEager:3,
    autoplay:true,
    autoplayTimeout:2000,
    navText: ['', ''],
    animateOut:true,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 8
      }
    },
    nav: false
  }


  ngOnInit(): void {
  }

}
