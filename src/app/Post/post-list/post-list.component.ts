import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from './post.model';
import { PostService } from '../post-service/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  private postsSub : Subscription;

  constructor(public postService: PostService) { }

  ngOnInit(): void {
    //this.postService is created by the constructor(public)
    this.posts = this.postService.getPosts();//empty
    /*OnDestory: Need to cancel this subscription
    when this component is teared down to avoid memory leak */
    this.postsSub = this.postService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
  }

  //Destory subscription
  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }

}
