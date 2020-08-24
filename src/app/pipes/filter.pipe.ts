import { Pipe, PipeTransform } from '@angular/core';
import { FileModel } from '../models/file.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(files: FileModel[], substring: string): FileModel[] {
    return files.filter(item => item.name.toLowerCase().includes(substring.toLowerCase()));
  }
}
