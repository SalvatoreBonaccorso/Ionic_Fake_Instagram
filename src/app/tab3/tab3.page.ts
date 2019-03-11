import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { PostsServiceService } from '../posts-service.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  public author: string;
  constructor(public postService: PostsServiceService, public toastController: ToastController) {
  }

  ngOnInit() {
    this.author = this.postService.getAuthor();
  }

  set() {
    this.postService.setAuthor(this.author);
    this.presentToast('User has been setted');
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

}
