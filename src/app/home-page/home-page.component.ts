import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  posts=[];

  constructor(public postService:PostService) { }

  ngOnInit(): void {
   this.posts = this.postService.getPosts();
   console.log(this.posts);
  }

  showPosts(){
    console.log(this.posts);
  }

}
