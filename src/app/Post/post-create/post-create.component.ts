import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PostService } from '../post-service/post.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  constructor(public postservice:PostService) { }

  ngOnInit(): void {
  }

  onAddPost(form:NgForm) {
    if (!form.valid){ return; }
    this.postservice.addPost(form.value.title, form.value.content);
  }
}
