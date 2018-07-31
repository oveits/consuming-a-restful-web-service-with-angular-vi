import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { SafePost } from './safe-post.interface';
import { interval} from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  posts: SafePost[];

  constructor(private appService: AppService) {}

  ngOnInit() {
    interval(10000).subscribe((counter) => {
      this.appService.getAll().subscribe(posts => {
        this.posts = posts;
      });
      console.log(counter + ': read restItems');
    });
  }
}
