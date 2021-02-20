import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from './post.model';
import { PostService } from '../post-service/post.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

  posts: Post[] = [];
  isLoading = false;
  private postsSub : Subscription;
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [2, 5, 10];

  constructor(public postService: PostService) { }

  ngOnInit(): void {
    this.isLoading = true;
    //this.postService is created by the constructor(public)
    this.postService.getPosts(this.postsPerPage, this.currentPage);
    /*OnDestory: Need to cancel this subscription
    when this component is teared down to avoid memory leak */
    this.postsSub = this.postService.getPostUpdateListener()
      .subscribe((postData: { posts: Post[], postCount: number}) => {
        this.isLoading = false;
        this.posts = postData.posts;
        this.totalPosts = postData.postCount;
      });
  }

  //Destory subscription
  ngOnDestroy(){
    this.postsSub.unsubscribe();
  }

  handlePageEvent(pageData: PageEvent){
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.postService.getPosts(this.postsPerPage, this.currentPage);
  }

  onDelete(postId:string){
    this.isLoading = true;
    this.postService.deletePost(postId).subscribe(()=>{
      this.postService.getPosts(this.postsPerPage, this.currentPage);
    });
  }

}
