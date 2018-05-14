import { Component, OnInit } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
//import { catchError, map } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AppService } from './app.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  posts: any;

  constructor(private appService : AppService, public sanitizer: DomSanitizer) {}

  ngOnInit() { 
    this.getRestItems();
  }

  // Read all REST Items
  getRestItems(): void {
    this.appService.getAll()
      .subscribe(
        posts => {
          this.posts = 
            posts.map(
              post => { 
                return { 
                  "title": this.sanitizer.bypassSecurityTrustHtml(post.title), 
                  "content": this.sanitizer.bypassSecurityTrustHtml(post.content)
                } 
            });
          console.log(this.posts);
        }
      )
  }

}
