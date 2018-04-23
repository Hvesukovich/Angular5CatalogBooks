import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { StorageService } from './storage.service';
import { RequestService } from './request.service';
import { UserService } from './user.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
      FormsModule,
      ReactiveFormsModule,
      HttpClientModule,
  ],
  providers: [
      StorageService,
      RequestService,
      UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
