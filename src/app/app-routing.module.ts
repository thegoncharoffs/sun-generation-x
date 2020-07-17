import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from "./pages/main/main.component";
import { DocumentsComponent } from "./pages/documents/documents.component";
import { ContactsComponent } from "./pages/contacts/contacts.component";
import { LoginComponent } from "./pages/login/login.component";

const routes: Routes = [
    {
        path: 'main',
        component: MainComponent,
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
