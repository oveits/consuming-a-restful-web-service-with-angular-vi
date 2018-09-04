import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { SafePost } from './safe-post.interface';
import { interval } from 'rxjs';
import { map, flatMap } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  interval_MSEC = 1000;
  postsVoid$: Observable<void>;
  posts: SafePost[];

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.postsVoid$ = this.getRestItemsIntervalVoid$();
  }

  getRestItemsIntervalVoid$(): Observable<void> {
    return interval(this.interval_MSEC)
      .pipe(
        flatMap(
          counter => {
            console.log(counter + ': read restItems');
            return this.assignRestItemsToPosts$();
          }
        )
      );
  }

  assignRestItemsToPosts$(): Observable<void> {
    return this.appService.getAll().pipe(
      map(posts => {
        this.posts = posts;
      }));
  }
}
