import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppService } from './app.service';
import { SafePost } from './safe-post.interface';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  posts$$: Observable<Observable<SafePost[]>>;

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.posts$$ = this.getRestItemsIntervalBlinkingBehavior$$();
  }

  getRestItemsIntervalBlinkingBehavior$$(): Observable<Observable<SafePost[]>> {
    return interval(10000)
      .pipe(
        map(
          counter => {
          console.log(counter + ': read restItems');
          return this.getRestItems$();
          }
        )
      );
  }

  // Read all REST Items
  getRestItems$(): Observable<SafePost[]> {
    return this.appService.getAll()
      .pipe(posts => posts);
  }
}
