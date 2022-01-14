import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';


import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { GifsModule } from './gifs/gifs.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,//Lo que no hicimos nosotros ponerlo primero, lo que si hicimos despues
    HttpClientModule,//Lo que no hicimos nosotros ponerlo primero, lo que si hicimos despues
    SharedModule,//Esto si lo hice, por eso lo pongo después
    GifsModule//Esto si lo hice, por eso lo pongo después
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
