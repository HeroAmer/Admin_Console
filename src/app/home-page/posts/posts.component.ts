import { Component, OnInit, OnDestroy } from '@angular/core';
import { PostService } from '../../post.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css'],
})
export class PostsComponent implements OnInit {
  posts = [];
  private postSubscription: Subscription;

  constructor(public postService: PostService) {}

  ngOnInit(): void {
    console.log('nestoo');
    this.postService.getPosts();
    console.log(this.posts);
    this.postSubscription = this.postService
      .getPostsUpdatedListener()
      .subscribe(posts => {
        this.posts = posts;
      });
  }

  onEditPost(){

  }

  onDelete(id:string){
    this.postService.deletePost(id);
    alert("Post deleted");
  }

  ngOnDestroy() {
    this.postSubscription.unsubscribe();
  }
  showPosts() {
    console.log(this.posts);
  }
}
