import { Injectable } from '@angular/core';
import { Post } from '../post-list/post.model';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

/**
 * This service pass post data
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
  private postUpdated = new Subject<Post[]>();

  constructor(private http: HttpClient) { }

  getPosts() {
    this.http.get<{ message: string, posts: Post[] }>('http://localhost:3000/api/posts')
      .subscribe((data) => {
        this.posts = data.posts;
        //inform the app and other part of the app about this update
        this.postUpdated.next([...this.posts]);
      });
    /*
    since array and objects are reference types(address),
    don't return this.posts directly.
    Instead, use spread operator for copying
    so that the original array won't be affected whenever altering the new array
     */
    return [...this.posts];
  }

  //Access updated posts but can't emit outside this service
  getPostUpdateListener() {
    return this.postUpdated.asObservable();
  }

  addPost(title: string, content: string) {
    const post: Post = { id: null, title: title, content: content };
    this.http.post<{ message: string }>('http://localhost:3000/api/posts', post)
      .subscribe((data) => {
        console.log(data.message);
        //update local data when receive a successful response
        //push:feed values
        this.posts.push(post);

        //a copy of updated posts
        this.postUpdated.next([...this.posts]);
      });

  }
}
