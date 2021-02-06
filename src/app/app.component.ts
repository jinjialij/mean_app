import { Component } from '@angular/core';

import { Post } from './Post/post-list/post.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'simple-post';
  storedPosts : Post[] = [];

  onPostAdded(post) {
    this.storedPosts.push(post);
  }
}
