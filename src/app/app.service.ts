import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { catchError, map } from 'rxjs/operators';
import { map } from 'rxjs/operators';
//import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Injectable()
export class AppService {

  protected url : string = 'https://public-api.wordpress.com/rest/v1.1/sites/vocon-it.com/posts';

  constructor(private http: HttpClient) {}

  // Rest Items Service: Read all REST Items
  getAll() {
    return this.http
      .get<any[]>(this.url)
      .pipe(map(data => data));
  }

}
