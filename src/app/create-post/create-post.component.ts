import { Component, OnInit } from '@angular/core';
import {FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  form:FormGroup;
  imagePreview:string;
  posts=[];

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {validators:[Validators.required]}),
      content : new FormControl(null, {validators:[Validators.required]}),
      image : new FormControl(null, {validators:[Validators.required]})
    });

  }
  onImagePicked(event){
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image:file});
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () =>{
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onSavePost(){
    console.log("Submit was clicked");
    if(this.form.invalid){
      return;
    }else{
      const post = {
        image:'../assets/noPhoto.jpg',
        title: this.form.value.title,
        content: this.form.value.content
      }
      this.posts.push(post);
      console.log(this.posts);
    }

    this.form.reset();
  }



}
