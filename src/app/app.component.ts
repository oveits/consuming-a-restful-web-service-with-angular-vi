import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, pipe, Subscription } from 'rxjs';
import { AppService } from './app.service';
import { SafePost } from './safe-post.interface';

// exponentialBackoff:
import { fromEvent } from 'rxjs';
import { sampleTime, startWith, switchMapTo, tap, map } from 'rxjs/operators';
import { intervalBackoff } from 'backoff-rxjs';

export const INITIAL_INTERVAL_MS = 5000; // 5 sec, choose larger than mean response time of REST service called
export const MAX_INTERVAL_MS = 60000; // 1 min


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  posts$$: Observable<Observable<SafePost[]>>;
  posts$: Observable<SafePost[]>;
  posts: SafePost[];
  mySubscription: Subscription;
  exponentialBackoffTimer: Observable<number>;

  constructor(private appService: AppService) {}

  ngOnInit() {
    // this.posts$ = this.getRestItems$();
    this.exponentialBackoffTimer =
      fromEvent(document, 'mousemove').pipe(

        // There could be many mousemoves, we'd want to sample only
        // with certain frequency
        sampleTime(INITIAL_INTERVAL_MS),

        // Start immediately
        startWith(null),

        // Resetting exponential interval operator
        switchMapTo(intervalBackoff({
          backoffDelay: (iteration, initialInterval) => Math.pow(1.2, iteration) * initialInterval,
          initialInterval: INITIAL_INTERVAL_MS,
          maxInterval: MAX_INTERVAL_MS
        })),

        // attaching the function that is to be reset:
        tap( n => {
          console.log('iteration since reset: ' + n);
          this.mySubscription = this.reSubscribeToGetAndAssignPosts$(
            this.mySubscription,
            this.getAndAssignPosts$()
          );
        }),
      );
  }

  /*
    removes old subscription and returns new subscription
    Parameters: mySybsription
    Returns: Subscription
  */
  reSubscribeToGetAndAssignPosts$(mySubscription: Subscription, myObservable$: Observable<void>): Subscription {
    // remove old subscription:
    if (mySubscription !== undefined) {
      console.log('unsubscribing mySubscription');
      mySubscription.unsubscribe();
    }

    // assign new subscription:
    return myObservable$.subscribe();
  }

  getAndAssignPosts$(): Observable<void> {
    return this.appService.getAll().pipe(map(posts => {
      this.posts = posts;
    }));
  }

  ngOnDestroy() {
    this.mySubscription.unsubscribe();
  }
}
