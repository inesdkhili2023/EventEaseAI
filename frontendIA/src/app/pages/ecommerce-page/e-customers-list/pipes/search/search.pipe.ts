import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(items: any[], searchText: string): any[] {
    if (!items) return [];
    if (!searchText) return items;

    searchText = searchText.toLowerCase();
    return items.filter(item => {
      return item.customer.name.toLowerCase().includes(searchText) ||
             item.email.toLowerCase().includes(searchText) ||
             item.Adress.toLowerCase().includes(searchText);
    });
  }
}
