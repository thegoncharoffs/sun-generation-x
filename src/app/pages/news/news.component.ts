import { ChangeDetectorRef, Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { News } from 'src/app/models/news.model';
import { NewsService } from 'src/app/services/news.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class NewsComponent implements OnInit {
    @HostBinding("class.app-news") true;

    _newsList: News[] = [];
    _loading: boolean = true;
    _logged: boolean = false;
    _error: string;
    _form: FormGroup;

    constructor(
        private newsService: NewsService,
        private authService: AuthService,
        private cdr: ChangeDetectorRef,
        private fb: FormBuilder,
    ) {
    }

    ngOnInit(): void {
        this._form = this.fb.group({
            titleRu: [null, [Validators.required]],
            titleEn: [null, [Validators.required]],
            textRu: [null, [Validators.required]],
            textEn: [null, [Validators.required]],
        })

        this._loading = true;

        this.newsService.loadNews().subscribe(
            newsList => {
                this._newsList = newsList;
                this._loading = false;
                this.cdr.detectChanges();
            },
            err => {
                this._error = err;
                this._loading = false;
                this.cdr.detectChanges();
            },
        );

        this._logged = this.authService.isLoggedIn();
    }

    _postNews(formValue) {
        this._loading = true;
        const news: News = {
            title: {
                ru: formValue.titleRu,
                en: formValue.titleEn,
            },
            text: {
                ru: formValue.textRu,
                en: formValue.textEn,
            },
            date: new Date().toISOString(),
        }

        this.newsService.postNews(news).subscribe(
            newsList => {
                this._newsList = newsList;
            },
            err => {
                this._error = err;
            },
            () => {
                this._loading = false;
                this._form.reset();
                this.cdr.detectChanges();
            }
        );
    }

    _onDeleteNewsClick(date: string) {
        this._loading = true;

        this.newsService.deleteNews(date).subscribe(
            newsList => {
                this._newsList = newsList;
                this._loading = false;
                this.cdr.detectChanges();
            },
            err => {
                this._error = err;
                this._loading = false;
                this.cdr.detectChanges();
            },
        );
    }

    _onLogoutButtonClick() {
        this.authService.logout();
        this._logged = false;
    }
}
