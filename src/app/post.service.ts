import { Post } from './post.model';
import { Injectable } from '@angular/core';

@Injectable({providedIn:'root'})

export class PostService{
  private posts: Post [] = [];

  getPosts(){
    return [...this.posts]
  }

  addPost(image:string, title:string , content:string){
    const post: Post = { image, title , content };
    this.posts.push(post);
  }

}
