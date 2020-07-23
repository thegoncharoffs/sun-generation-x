import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocumentsComponent } from "./pages/documents/documents.component";
import { ContactsComponent } from "./pages/contacts/contacts.component";
import { LoginComponent } from "./pages/login/login.component";
import { NewsComponent } from './pages/news/news.component';
import { AboutComponent } from './pages/about/about.component';

const routes: Routes = [
    {
        path: 'main',
        component: AboutComponent,
    },
    {
        path: 'login',
        component: LoginComponent,
    },
    {
        path: 'documents',
        component: DocumentsComponent,
    },
    {
        path: 'contacts',
        component: ContactsComponent,
    },
    {
        path: 'news',
        component: NewsComponent,
    },
    {
        path: '**',
        redirectTo: 'main',
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
