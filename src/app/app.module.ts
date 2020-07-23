import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContactsComponent } from './pages/contacts/contacts.component';
import { DocumentsComponent } from './pages/documents/documents.component';
import { SearchFieldComponent } from './components/search-field/search-field.component';
import { LanguageDropdownComponent } from './components/language-dropdown/language-dropdown.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { AngularSvgIconModule } from "angular-svg-icon";
import { AngularYandexMapsModule, IConfig } from "angular8-yandex-maps";
import { MarkPipe } from './pipes/mark.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { AuthService } from "./services/auth.service";
import { TokenStorageService } from "./services/token-storage.service";
import { LoginComponent } from './pages/login/login.component';
import { ReactiveFormsModule } from "@angular/forms";
import { authInterceptorProviders } from './interceptors/auth.interceptor';
import { FileService } from './services/file.service';
import { NewsService } from './services/news.service';
import { NewsComponent } from './pages/news/news.component';
import { AboutComponent } from './pages/about/about.component';

const mapConfig: IConfig = {
    apiKey: 'API_KEY',
    lang: 'ru_RU',
};

@NgModule({
    declarations: [
        AppComponent,
        AboutComponent,
        ContactsComponent,
        DocumentsComponent,
        SearchFieldComponent,
        LanguageDropdownComponent,
        MarkPipe,
        FilterPipe,
        LoginComponent,
        NewsComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        ReactiveFormsModule,
        AngularYandexMapsModule.forRoot(mapConfig),
        AngularSvgIconModule.forRoot(),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    providers: [
        AuthService,
        TokenStorageService,
        FileService,
        NewsService,
        authInterceptorProviders,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}
