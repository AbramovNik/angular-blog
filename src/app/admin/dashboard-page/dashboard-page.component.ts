import { AlertService } from './../shared/services/alert.service';
import { Post } from 'src/app/shared/interfaces';
import { PostsService } from './../../shared/posts.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  pSub: Subscription;
  dSub: Subscription;
  searchStr = '';
  constructor(private postService: PostsService, private alert: AlertService) {}

  ngOnInit(): void {
    this.pSub = this.postService.getAll().subscribe((posts) => {
      this.posts = posts;
    });
  }
  remove(id: string) {
    this.dSub = this.postService.remove(id).subscribe(() => {
      this.posts = this.posts.filter((post) => post.id !== id);
      this.alert.warning('Пост был удален');
    });
  }

  ngOnDestroy() {
    if (this.pSub) {
      this.pSub.unsubscribe();
    }
    if (this.dSub) {
      this.dSub.unsubscribe();
    }
  }
}
