import { Component, OnInit } from '@angular/core';
import { PostsServiceService, Post } from '../posts-service.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  public posts: Post[] = [];

  constructor(public postsService: PostsServiceService) {
  }

  ngOnInit() {
    this.postsService.allPost().then(response => {
    this.posts = response;
  })
}


}
