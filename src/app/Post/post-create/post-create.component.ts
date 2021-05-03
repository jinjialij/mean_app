import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Post } from '../post-list/post.model';
import { mimeType } from './mime-type.validator';

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
  constructor(public postservice: PostService, public route: ActivatedRoute) { }
  post: Post;
  isLoading = false;
  private mode = Mode.Create;
  private postId: string;
  form: FormGroup;
  imagePreview: string;

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, { validators: [Validators.required, Validators.minLength(3)] }),
      content: new FormControl(null, { validators: [Validators.required] }),
      image: new FormControl(null, { validators: [Validators.required], asyncValidators: [mimeType] })
    });
    //By subscribe the route paramMap, we can listen to changes in the route url
    //or in the parameters
    //To find if there is postId parameter in router or not
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('postId')) {
        this.mode = Mode.Edit;
        this.postId = paramMap.get('postId');
        this.isLoading = true;
        this.postservice.getPost(this.postId)
          .subscribe(postData => {
            this.isLoading = false;
            this.post = {
              id: postData._id,
              title: postData.title,
              content: postData.content,
              imagePath: postData.imagePath,
              creator: postData.creator
            };
            this.form.setValue({
              title: this.post.title,
              content: this.post.content,
              image: this.post.imagePath });
          });
      } else {
        this.mode = Mode.Create;
        this.postId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const imageReader = new FileReader();
    imageReader.onload = () => {
      this.imagePreview = imageReader.result as string;
    }
    imageReader.readAsDataURL(file);
  }

  onSavePost() {
    if (this.form.invalid) { return; }
    this.isLoading = true;
    if (this.mode === Mode.Create) {
      this.postservice.addPost(
        this.form.value.title,
        this.form.value.content,
        this.form.value.image);
    } else {
      this.postservice.updatePost(
        this.postId,
        this.form.value.title,
        this.form.value.content,
        this.form.value.image);
    }

    this.form.reset();
  }
}
