import { Injectable } from '@angular/core';
import { Post } from '../post-list/post.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from "@angular/router";

import { environment } from "../../../environments/environment";
const BACKEND_URL = environment.apiUrl + "/posts/";

/**
 * This service handles get, update, delete post data
 */

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private posts: Post[] = [];
  /*
    Subject is a special type of Observable that allows values to be multicasted to many Observers.
    Subjects are like EventEmitters.
   */
  private postUpdated = new Subject<{posts: Post[], postCount: number}>();

  constructor(private http: HttpClient, private router: Router) { }

  getPosts(postsPerpage: number, currentPage:number) {
    const queryParams = `?pageSize=${postsPerpage}&page=${currentPage}`;
    this.http.get<{ message: string, posts: any, maxPosts: number }>(BACKEND_URL + queryParams)
      .pipe(map((data) => {
        return { posts: data.posts.map(post => {
          return {
            title: post.title,
            content: post.content,
            id: post._id,
            imagePath: post.imagePath
          };
        }),
        maxPosts: data.maxPosts};
      }))
      .subscribe((mapedPostsData) => {
        this.posts = mapedPostsData.posts;
        //inform the app and other part of the app about this update
        this.postUpdated.next({
          posts: [...this.posts],
          postCount: mapedPostsData.maxPosts
        });
      });
    /*
    since array and objects are reference types(address),
    don't return this.posts directly.
    Instead, use spread operator for copying
    so that the original array won't be affected whenever altering the new array
     */
    return [...this.posts];
  }

  //retrieve a post by postId
  getPost(postId: string) {
    /*Notes: this return post makes get post returns a post,
    it won't work anymore because if it makes a http call here,
    that'll be an asynchronous code.
    you can't return inside of a subscription, you need to return synchronously
    so that means you can't return in a place which will run sometime in the future. */
    // return { ...this.posts.find(p => p.id === postId) };
    return this.http.get<{_id: string, title: string, content: string, imagePath: string }>(BACKEND_URL + postId);
  }

  //Access updated posts but can't emit outside this service
  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }

  addPost(title: string, content: string, image: File) {
    const postData = new FormData();
    postData.append("title", title);
    postData.append("content", content);
    postData.append("image", image, title);
    this.http.post<{ message: string, post: Post }>(BACKEND_URL, postData)
      .subscribe(data => {
        console.log(data.message);
        this.router.navigate(["/"]);
      });
  }

  updatePost(id: string, title: string, content: string, image: string | File) {
    let postData: Post | FormData ;
    if (typeof(image) === 'object' ){
      postData = new FormData();
      postData.append("id", id);
      postData.append("title", title);
      postData.append("content", content);
      postData.append("image", image, title);
    } else {
      postData = {
        id: id,
        title: title,
        content: content,
        imagePath: image };
    }
    this.http.put(BACKEND_URL + id, postData)
      .subscribe(response => {
        console.log(response)
        this.router.navigate(["/"]);
      });
  }

  deletePost(postId: string) {
    return this.http.delete(BACKEND_URL + postId);
  }
}
