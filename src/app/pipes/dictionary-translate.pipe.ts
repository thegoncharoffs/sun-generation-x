import { ChangeDetectorRef, Pipe, PipeTransform } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Dictionary } from '../models/dictionary.model';

@Pipe({
  name: 'dictionaryTranslate',
  pure: false
})
export class DictionaryTranslatePipe implements PipeTransform {
  constructor(
    private translate: TranslateService,
    private cdr: ChangeDetectorRef,
  ) {
  }

  transform(object: Dictionary): string {
    this.cdr.markForCheck();
    return object[this.translate.currentLang];
  }
}
