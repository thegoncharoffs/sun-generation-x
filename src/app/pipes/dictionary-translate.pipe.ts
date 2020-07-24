import { Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Dictionary } from '../models/dictionary.model';

@Pipe({
  name: 'dictionaryTranslate',
  pure: false
})
export class DictionaryTranslatePipe implements PipeTransform {
  constructor(private translate: TranslateService) {
  }

  transform(object: Dictionary): string {
    return object[this.translate.currentLang];
  }
}
