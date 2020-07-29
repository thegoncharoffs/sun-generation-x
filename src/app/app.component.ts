import { Component, HostBinding, OnDestroy, ViewEncapsulation } from '@angular/core';
import { TokenStorageService } from './services/token-storage.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnDestroy {
    @HostBinding("class.app-root") true;

    constructor(private tokenStorageService: TokenStorageService) {
    }

    ngOnDestroy() {
        this.tokenStorageService.loguot();
    }
}
