import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// import { catchError, map } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AppService } from './app.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
// export class AppComponent {
  posts$: Observable<Post>;

  constructor(private appService: AppService, public sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.posts$ = this.getRestItems$();
  }

  // Read all REST Items
  getRestItems$(): Observable<Post> {
    return this.appService.getAll()
      .pipe(
        map(
          posts => {
            const myPosts = posts.map(
                post => {
                  return {
                    'title': this.sanitizer.bypassSecurityTrustHtml(post.title), 
                    'content': this.sanitizer.bypassSecurityTrustHtml(post.content)
                  };
              });
            console.log(myPosts);
            return myPosts;
            }
          )
      );
  }
}

interface Post {
  'title': DomSanitizer;
  'content': DomSanitizer;
}
