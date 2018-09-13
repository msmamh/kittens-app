import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { KittensService } from './Services/kittens.service';
import { KittenService } from './Services/kitten.service';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpModule
  ],
  providers: [KittensService, KittenService],
  bootstrap: [AppComponent]
})
export class AppModule { }
