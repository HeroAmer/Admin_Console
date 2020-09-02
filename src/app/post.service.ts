import { Post } from './post.model';
import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {HttpClient} from '@angular/common/http'


@Injectable({providedIn:'root'})

export class PostService{
  private posts: Post [] = [];
  private postsUpdated = new Subject<Post[]>();

  constructor(private http:HttpClient){}

  getPosts(){
    this.http.get<{message:string,posts:Post[]}>('http://localhost:3000/api/posts').subscribe((newData)=>{
    this.posts = newData.posts;
    this.postsUpdated.next([...this.posts]);
    })
  }

  getPostsUpdatedListener(){
    return this.postsUpdated.asObservable();
  }

  addPost(image:string, title:string , content:string){
    const post: Post = {id:null, image, title , content };
    this.http.post('http://localhost:3000/api/posts',post).subscribe((message)=>{
      console.log(message);
      this.posts.push(post);
      // console.log(post);
      this.postsUpdated.next([...this.posts]);
    });
  }

}
