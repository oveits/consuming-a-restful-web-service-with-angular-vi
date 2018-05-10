import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { catchError, map } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


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

  constructor(private http: HttpClient, public sanitizer: DomSanitizer) {}

  ngOnInit() { 
    this.getRestItems();
  }

  // Read all REST Items
  getRestItems(): void {
    this.restItemsServiceGetRestItems()
      .subscribe(
        restItems => {
          this.restItems = restItems;
          console.log(this.restItems);
        }
      )
  }

  // Rest Items Service: Read all REST Items
  restItemsServiceGetRestItems() {
    return this.http
      .get<any[]>(this.restItemsUrl)
      .pipe(map(data => data));
  }

  showContent(post){
    console.log(post.content);
    if(selectedContent !== post.content){
      return post.content;
    }else{
      return null;
    }
  }

}
