import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(searchObject:any[],searchValue:string):any {

    return searchObject.filter((item:any)=>{
        if(item.title)// if its Movies
        return item.title.toLowerCase().includes(searchValue.toLowerCase());
        else // its TVshow
          return item.name.toLowerCase().includes(searchValue.toLowerCase());
    })

    
  }
  

}
