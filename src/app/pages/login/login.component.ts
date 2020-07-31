import { ChangeDetectionStrategy, ChangeDetectorRef, Component, HostBinding, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {
    @HostBinding("class.app-login") true;

    _form: FormGroup;
    _error: string;

    constructor(
        private authService: AuthService,
        private tokenStorage: TokenStorageService,
        private router: Router,
        private cdr: ChangeDetectorRef,
    ) {
    }

    ngOnInit(): void {
        this._form = new FormGroup({
            'login': new FormControl('', Validators.required),
            'password': new FormControl('', Validators.required),
        });

        this.authService.logout();
    }

    _onSubmit() {
        const login = this._form.controls.login.value;
        const password = this._form.controls.password.value;

        this.authService.login({
            login,
            password,
        }).subscribe(
            data => {
                this.tokenStorage.saveToken(data.accessToken);
                this.router.navigate(['/about']);
                this.cdr.detectChanges();
            },
            error => {
                this._error = error.error.message;
                this._form.reset();
                this.cdr.detectChanges();
            }
        );
    }

}
