import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AdminModule } from './admin/admin.module';


const ROUTES = [
    { path: '', component: HomeComponent },
    {
        path: 'admin', loadChildren() {
        return AdminModule;
    }
    },
    { path: '**', component: HomeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(ROUTES)],
    exports: [RouterModule],
    providers: []
})
export class AppRoutingModule {
}


