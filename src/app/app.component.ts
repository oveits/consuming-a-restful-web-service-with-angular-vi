import { Component, OnInit } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
//import { catchError, map } from 'rxjs/operators';
//import { map } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AppService } from './app.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  restItems: any;
  //restItemsUrl = 'https://public-api.wordpress.com/rest/v1.1/sites/vocon-it.com/posts/3078';
  restItemsUrl = 'https://public-api.wordpress.com/rest/v1.1/sites/vocon-it.com/posts';
  count = 0;
  //selectedContent = null;

  constructor(private appService : AppService, public sanitizer: DomSanitizer) {}

  ngOnInit() { 
    this.getRestItems();
  }

  // Read all REST Items
  getRestItems(): void {
    this.appService.getAll()
      .subscribe(
        restItems => {
          this.restItems = restItems;
          console.log(this.restItems);
        }
      )
  }

}
