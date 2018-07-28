import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { AppService } from './app.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  posts: SafePost[];

  constructor(private appService: AppService, public sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.getRestItems();
  }

  safePost(apiDataSinglePost: APIDataSinglePost): SafePost  {
    return {
      'title': this.sanitizer.bypassSecurityTrustHtml(apiDataSinglePost.title),
      'content': this.sanitizer.bypassSecurityTrustHtml(apiDataSinglePost.content)
    };
  }

  // Read all REST Items
  getRestItems(): void {
    this.appService.getAll()
      .subscribe(
        apiDataAllPosts => {
          this.posts = apiDataAllPosts.map(apiDataSinglePost =>  this.safePost(apiDataSinglePost));
          console.log(this.posts);
        }
      );
  }
}

interface SafePost {
  'title': SafeHtml;
  'content': SafeHtml;
}

interface APIDataSinglePost {
  'title': string;
  'content': string;
}