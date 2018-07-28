import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { WordPressApiInterceptor } from './wordpress-api.interceptor';

import { AppComponent } from './app.component';
import { AppService } from './app.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule
  ],
  providers: [
    AppService,
    { provide: HTTP_INTERCEPTORS, useClass: WordPressApiInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
