import { Component, HostBinding, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { TranslateService } from "@ngx-translate/core";

@Component({
    selector: 'app-language-dropdown',
    templateUrl: './language-dropdown.component.html',
    styleUrls: ['./language-dropdown.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LanguageDropdownComponent implements OnInit {
    @HostBinding("class.app-language-dropdown") true;

    @HostListener('click', ['$event'])
    onClick(event) {
        event.stopPropagation();
    }

    _languages: string[];
    _language: string;
    _visible: boolean = false;

    constructor(private readonly translate: TranslateService) {
    }

    ngOnInit(): void {
        this.translate.setDefaultLang('ru'); // Will be used as default if nothing is found
        this.translate.use('ru'); // Use russian
        this.translate.addLangs(['ru', 'en']); // Full set of languages

        this.translate.stream('something changed').subscribe(() => {
            this._languages = this.translate.getLangs();
            this._language = this.translate.currentLang;
        });

        document.addEventListener("click", () => {
            this._visible = false;
        })
    }

    _selectLanguage(lang: string): void {
        if (lang !== this._language) {
            this.translate.use(lang);
        }
        this._visible = false;
    }
}
