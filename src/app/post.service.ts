import { Post } from './post.model';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';


@Injectable({providedIn:'root'})

export class PostService{
  private posts: Post [] = [];
  private postsUpdated = new Subject<Post[]>();

  getPosts(){
    return [...this.posts]
  }

  getPostsUpdatedListener(){
    return this.postsUpdated.asObservable();
  }

  addPost(image:string, title:string , content:string){
    const post: Post = { image, title , content };
    this.posts.push(post);
    this.postsUpdated.next([...this.posts])
  }

}
