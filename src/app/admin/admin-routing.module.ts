import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { UsersComponent } from './users/users.component';
import { BooksComponent } from './books/books.component';
import { LoginComponent } from './login/login.component';
import { GenresComponent } from './genres/genres.component';

const ROUTES = [
    {
        path: '', component: ControlPanelComponent, children: [
        { path: 'login', component: LoginComponent },
        { path: 'users', component: UsersComponent },
        { path: 'books', component: BooksComponent },
        { path: 'genres', component: GenresComponent },
    ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
    providers: []
})
export class AdminRoutingModule {
}


