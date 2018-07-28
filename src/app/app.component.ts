import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { SafePost } from './safe-post.interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  posts: SafePost[];

  constructor(private appService: AppService) {}

  ngOnInit() {
    this.getRestItems();
  }

  // Read all REST Items
  getRestItems(): void {
    this.appService.getAll()
      .subscribe(posts => { this.posts = posts; });
  }
}
