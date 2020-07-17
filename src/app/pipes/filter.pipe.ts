import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(documents: string[], substring: string): string[] {
    return documents.filter(item => item.toLowerCase().includes(substring.toLowerCase()));
  }
}
