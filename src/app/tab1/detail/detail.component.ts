import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { PostsServiceService,Post, Comment } from 'src/app/posts-service.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
})
export class DetailComponent implements OnInit {

  public post: Post;
  public enablePolling: boolean;
  public comment: Comment = {
    author: '',
    message: ''
  };

  constructor(public postService: PostsServiceService,public route: ActivatedRoute,public toast: ToastController) {}


  ngOnInit() {
    this.loadPostAndMessages();
    this.comment.author = this.postService.getAuthor();
    this.enablePolling = true;
    this.polling();
  }

  ionViewWillLeave() {
    console.log('#ionViewWillLeave');
    this.enablePolling = false;
  }

  send() {
    if (!this.comment.author) {
      this.presentToast('Set Author in tab2');
    } else {
      this.postService.addMessage(this.post.id, this.comment).then(() => {
        this.comment.message = ''; // reset dell'input
        this.presentToast('Your comment have been sent.');
      });
    }
  }

  loadPostAndMessages() {
    console.log('#loadChatAndMessages');
    if (this.postService) {
      this.postService.getById(this.route.snapshot.params.id).then(response => {
        this.post = response;
      });
      if (this.enablePolling) {
        this.polling();
      }
    }
  }

  polling() {
    setTimeout(this.loadPostAndMessages, 3000);
  }

  async presentToast(message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

}
