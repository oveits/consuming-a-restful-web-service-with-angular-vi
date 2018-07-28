<<<<<<< HEAD
import { Component, OnInit } from '@angular/core';
=======
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
// import { HttpClient } from '@angular/common/http';
// import { catchError, map } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
>>>>>>> feature/0002-add-unsubscribe
import { AppService } from './app.service';
import { SafePost } from './safe-post.interface';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
<<<<<<< HEAD
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
=======
export class AppComponent implements OnInit, OnDestroy {
  posts: any;
  private subscription: Subscription;

  constructor(private appService: AppService, public sanitizer: DomSanitizer) {}

  ngOnInit() {
    this.subscription = this.getRestItems();
  }

  // Read all REST Items
  getRestItems(): Subscription {
    return this.appService.getAll()
      .subscribe(
        posts => {
          this.posts =
            posts.map(
              post => {
                return {
                  'title': this.sanitizer.bypassSecurityTrustHtml(post.title), 
                  'content': this.sanitizer.bypassSecurityTrustHtml(post.content)
                }
            });
          console.log(this.posts);
        }
      );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
>>>>>>> feature/0002-add-unsubscribe
  }
}
