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
    if (!terms) return items;
    console.log("terms: " + terms);
    terms = terms.toLowerCase();
    return items.filter(it => {
      return it.payload.val().groupName.toLowerCase().includes(terms);
    });
  }
}
