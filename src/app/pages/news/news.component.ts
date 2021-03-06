import { ChangeDetectorRef, Component, HostBinding, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { News } from 'src/app/models/news.model';
import { NewsService } from 'src/app/services/news.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class NewsComponent implements OnInit, OnDestroy {
    @HostBinding("class.app-news") true;

    _newsList: News[] = [];
    _loading: boolean = true;
    _logged: boolean = false;
    _error: string;
    _form: FormGroup;

    private destroy$: Subject<boolean> = new Subject();

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

        this.newsService.loadNews().pipe(
            takeUntil(this.destroy$),
        ).subscribe(
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

    ngOnDestroy(): void {
        this.destroy$.next()
        this.destroy$.complete();
    }

    _submit(formValue) {
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

        this.newsService.postNews(news).pipe(
            takeUntil(this.destroy$),
        ).subscribe(
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

    _onDeleteNewsClick(id: string) {
        this._loading = true;

        this.newsService.deleteNews(id).pipe(
            takeUntil(this.destroy$),
        ).subscribe(
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
