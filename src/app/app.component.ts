import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { SafePost } from './safe-post.interface';
import { interval, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  posts$$: Observable<Observable<SafePost[]>>;
  postsVoid$$: Observable<Observable<void>>;
  posts$: Observable<SafePost[]>;
  posts: SafePost[];

  myInterval = interval(5000);
  subInner: Subscription;
  subOuter: Subscription;

  constructor(private appService: AppService) {}

  ngOnInit() {
    // this.getRestItemsIntervalVoidDoesNOtSetPosts$$();
    // this.posts$$ = this.getRestItemsIntervalBlinkingBehavior$$();
    // // this.posts$$.subscribe(posts$ => posts$);
    // // this.posts$.subscribe(posts => posts);
    // this.posts$ = this.getRestItemsIntervalNotRefreshing$();
    // this.posts$$ = this.getRestItemsInterval$$();

    // this.postsVoid$$ = this.getRestItemsIntervalVoid$$();

    // works fine:
    // this.subinner = this.assignRestItemsToPosts$().subscribe();
    // this.subouter = this.myInterval.subscribe(() => {
    //   this.assignRestItemsToPosts$().subscribe();
    // });

    // this.subinner = this.appService.getAll().subscribe(posts => {
    //   this.posts = posts;
    // });

    // simple without unsubscribes:
    // interval(5000).subscribe((counter) => {
    //   this.appService.getAll().subscribe(posts => {
    //     this.posts = posts;
    //   });
    //   console.log(counter + ': read restItems');
    // });

    // this.subOuter = this.myInterval.subscribe((counter) => {
    //   if (this.subInner !== undefined) {
    //     console.log('unsubscribing subInner');
    //     this.subInner.unsubscribe();
    //   }
    //   this.subInner = this.appService.getAll().subscribe(posts => {
    //     this.posts = posts;
    //   });
    //   console.log(counter + ': read restItems');
    // });

    // equivalent:
    this.subOuter = this.myInterval.pipe(map((counter) => {
      if (this.subInner !== undefined) {
        console.log('unsubscribing subInner');
        this.subInner.unsubscribe();
      }
      this.subInner = this.appService.getAll().pipe(map(posts => {
        this.posts = posts;
      })).subscribe();
      console.log(counter + ': read restItems');
    })).subscribe();

    // other way round does not mase sinse, because the getAll() and therefore the REST API is only called once:
    // this.subouter = this.appService.getAll().subscribe(posts => {
    //   this.subinner = this.myInterval.subscribe((counter) => {
    //     console.log(counter + ': read restItems');
    //     this.posts = posts;
    //   });
    // });



  }


  getRestItemsInterval$$(): Observable<Observable<SafePost[]>> {
    return interval(5000)
      .pipe(
        map(
          counter => {
            console.log(counter + ': read restItems');
            return this.appService.getAll().pipe(
              map(posts => {
              this.posts = posts;
              return posts;
          }));
          }
        )
      );
  }

  getRestItemsIntervalVoid$$(): Observable<Observable<void>> {
    return interval(5000)
      .pipe(
        map(
          counter => {
            console.log(counter + ': read restItems');
            return this.assignRestItemsToPosts$();
          }
        )
      );
  }

  getRestItemsIntervalNotRefreshing$(): Observable<SafePost[]> {
    return interval(5000)
      .pipe(
        // map(
          counter => {
            console.log(counter + ': read restItems');
            return this.appService.getAll().pipe(
              map(posts => {
              this.posts = posts;
              return posts;
          }));
          }
        // )
      );
  }

  getRestItemsIntervalBlinkingBehavior$$(): Observable<Observable<SafePost[]>> {
    return interval(5000)
      .pipe(
        map(
          counter => {
          console.log(counter + ': read restItems');
          return this.getRestItems$();
          }
        )
      );
  }

  getRestItemsIntervalTogglingBehavior2$(): Observable<SafePost[]> {
    return interval(5000)
      .pipe(() => this.getRestItems$());
  }

  // Read all REST Items
  // getRestItems$(): Observable<SafePost[]> {
  //   return this.appService.getAll()
  //     .pipe(posts$ => {
  //       this.posts$ = posts$;
  //       return posts$;
  //     });
  // }
  getRestItems$(): Observable<SafePost[]> {
    return this.appService.getAll().pipe(
      map(posts => posts));
  }

  assignRestItemsToPosts$(): Observable<void> {
    return this.appService.getAll().pipe(
      map(posts => {
        this.posts = posts;
      }));
  }

  ngOnDestroy() {
    this.subInner.unsubscribe();
    this.subOuter.unsubscribe();
  }
}
