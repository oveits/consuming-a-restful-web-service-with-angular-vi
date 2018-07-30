import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { SafePost } from './safe-post.interface';

@Injectable()
export class AppService {

  protected url = 'https://public-api.wordpress.com/rest/v1.1/sites/vocon-it.com/posts';

  constructor(private http: HttpClient, public sanitizer: DomSanitizer) {}

  safePost(apiDataSinglePost: APIDataSinglePost): SafePost  {
    return {
      'title': this.sanitizer.bypassSecurityTrustHtml(apiDataSinglePost.title),
      'content': this.sanitizer.bypassSecurityTrustHtml(apiDataSinglePost.content)
    };
  }

  // Rest Items Service: Read all REST Items
  getAll() {
    return this.http
      .get<any[]>(this.url)
      .pipe(map(apiDataAllPosts => {
        const mySafePosts: SafePost[] = apiDataAllPosts
          .map(apiDataSinglePost =>  this.safePost(apiDataSinglePost));
        console.log(mySafePosts);
        return mySafePosts;
    }));
  }

}

interface APIDataSinglePost {
  'title': string;
  'content': string;
}
