import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppService } from './app.service';
import { SafePost } from './safe-post.interface';
import { interval, Subscription} from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  posts: SafePost[];
  subInner: Subscription;
  subOuter: Subscription;


  constructor(private appService: AppService) {}

  ngOnInit() {
    this.subOuter = interval(10000).subscribe((counter) => {
      if (this.subInner !== undefined) {
        console.log('unsubscribing subInner');
        this.subInner.unsubscribe();
      }
      this.subInner = this.appService.getAll().subscribe(posts => {
        this.posts = posts;
      });
      console.log(counter + ': read restItems');
    });
  }

  ngOnDestroy() {
    this.subInner.unsubscribe();
    this.subOuter.unsubscribe();
  }
}
