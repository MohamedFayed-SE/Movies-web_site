import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(gender:number):string{
    if(gender==1)
      return 'female';
      else
      return 'male';

    
  }

}
