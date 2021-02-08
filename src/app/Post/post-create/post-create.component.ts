import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post-list/post.model';

import { PostService } from '../post-service/post.service';

enum Mode {
  Create = "CREATE",
  Edit = "EDIT"
}

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})

export class PostCreateComponent implements OnInit {
  constructor(public postservice:PostService, public route: ActivatedRoute) { }
  post: Post;
  private mode = Mode.Create;
  private postId:string;


  ngOnInit(): void {
    //By subscribe the route paramMap, we can listen to changes in the route url
    //or in the parameters
    //To find if there is postId parameter in router or not
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      if(paramMap.has('postId')) {
        this.mode = Mode.Edit;
        this.postId = paramMap.get('postId');
        this.postservice.getPost(this.postId)
        .subscribe(postData=>{
          this.post = {id: postData._id, title: postData.title, content: postData.content};
        });
      } else {
        this.mode = Mode.Create;
        this.postId = null;
      }
    });
  }

  onSavePost(form:NgForm) {
    if (!form.valid){ return; }
    if (this.mode === Mode.Create){
      this.postservice.addPost(form.value.title, form.value.content);
    } else {
      this.postservice.updatePost(this.postId, form.value.title, form.value.content);
    }

    form.resetForm();
  }
}
