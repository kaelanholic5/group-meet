import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the SearchPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'search',
})
export class SearchPipe implements PipeTransform {
  transform(items: any[], terms: string): any[] {
    if (!items) return [];
    if (!terms) return items.sort((a,b)=>{
      if(a.payload.val().groupName != null && b.payload.val().groupName != null){
      if( a.payload.val().groupName.toLowerCase() < b.payload.val().groupName.toLowerCase()){
        return -1;
      }else return 1;
    }
    });
    console.log("terms: " + terms);
    terms = terms.toLowerCase();
    return items.filter(it => {
      if(it.payload.val().groupName !=null){
      return it.payload.val().groupName.toLowerCase().includes(terms);
    }
    });
  }
}
