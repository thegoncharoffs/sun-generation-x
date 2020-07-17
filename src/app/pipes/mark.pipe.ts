import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mark'
})
export class MarkPipe implements PipeTransform {

  transform(value: string, substring: string): string {
    substring = substring.toLowerCase();
    const regExp = new RegExp(substring, "ig");

    return value.replace(
        regExp,
        match => `<span class="highlighted">${match}</span>`
    )
  }

}
