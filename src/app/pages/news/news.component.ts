import { ChangeDetectorRef, Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthService } from "../../services/auth.service";
import { News } from 'src/app/models/news.model';
import { NewsService } from 'src/app/services/news.service';

@Component({
    selector: 'app-news',
    templateUrl: './news.component.html',
    styleUrls: ['./news.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class NewsComponent implements OnInit {
    @HostBinding("class.app-documents") true;

    _news: News[] = [];
    _loading: boolean = true;
    _logged: boolean = false;
    _error: string;

    constructor(
        private newsService: NewsService,
        private authService: AuthService,
        private cdr: ChangeDetectorRef,
    ) {
    }

    ngOnInit(): void {
        this._loading = true;

        this.newsService.loadNews().subscribe(
            news => {
                this._news = news;
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

    _postNews(news: News) {
        this._loading = true;

        this.newsService.postNews(news).subscribe(
            news => {
                this._news = news;
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

    _onDeleteNewsClick(date: Date) {
        this._loading = true;

        this.newsService.deleteNews(date).subscribe(
            news => {
                this._news = news;
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
