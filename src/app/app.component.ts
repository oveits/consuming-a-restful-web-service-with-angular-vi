import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { SafePost } from './safe-post.interface';

// intervalBackoff:
import { fromEvent } from 'rxjs';
import { sampleTime, startWith, switchMapTo, map, flatMap } from 'rxjs/operators';
import { intervalBackoff } from 'backoff-rxjs';

export const INITIAL_INTERVAL_MS = 1000; // 1 sec, choose larger than mean response time of REST service called
export const MAX_INTERVAL_MS = 60000; // 1 min


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  posts: SafePost[];
  n: number;
  exponentialBackoffTimer$: Observable<void>;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.exponentialBackoffTimer$ =
      fromEvent(document, 'mousemove').pipe(

        // There could be many mousemoves, we'd want to sample only
        // with certain frequency
        sampleTime(INITIAL_INTERVAL_MS),

        // Start immediately
        startWith(null),

        // Resetting exponential interval operator
        switchMapTo(intervalBackoff({
          backoffDelay: (iteration, initialInterval) => Math.pow(1.5, iteration) * initialInterval,
          initialInterval: INITIAL_INTERVAL_MS,
          maxInterval: MAX_INTERVAL_MS
        })),

        flatMap( n => {
          console.log('iteration since reset: ' + n);
          this.n = n;
          return this.getAndAssignPosts$();
        }),
      );
  }

  getAndAssignPosts$(): Observable<void> {
    return this.appService.getAll().pipe(map(posts => {
      this.posts = posts;
    }));
  }

}
