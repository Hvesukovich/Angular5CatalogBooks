import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { ControlPanelComponent } from './control-panel/control-panel.component';
import { UsersComponent } from './users/users.component';
import { BooksComponent } from './books/books.component';
import { LoginComponent } from './login/login.component';
import { GenresComponent } from './genres/genres.component';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        AdminRoutingModule
    ],
    declarations: [
        ControlPanelComponent,
        UsersComponent,
        BooksComponent,
        LoginComponent,
        GenresComponent
    ]
})
export class AdminModule {
}
