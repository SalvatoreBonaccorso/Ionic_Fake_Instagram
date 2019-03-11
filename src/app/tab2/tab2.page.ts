import { Component } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PostsServiceService,Post } from '../posts-service.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  public post: Post = {
    author: '',
    image: '',
    message: '' 
  };
  constructor(public postService: PostsServiceService, public toastController: ToastController) {
    // mi richiamo l'autore 
    this.post.author=this.postService.getAuthor();
  }

  set() {
    this.postService.newPost(this.post).then(() => {
      this.presentToast('A new post has been created');
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
