import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/index';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ActionSheetButton, ActionSheetController, Platform } from '@ionic/angular';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { StorageService } from 'src/app/services/storage.service';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {
  @Input() article: Article;
  @Input() i: number;

  constructor(private iab: InAppBrowser, private actionSheetCtrl: ActionSheetController, private socialSharing: SocialSharing, private platform: Platform, private storage: StorageService) { }
  
  openArticle() {
    const browser = this.iab.create(this.article.url);
    browser.show();
  }

  async openMenu() {
    const normalBts: ActionSheetButton[] =
      [
        {
          text: 'Open in browser',
          icon: 'link-outline',
          handler: () => {
            this.openArticle();
          }
        },
        {
          text: 'Cancel',
          icon: 'close-outline',
          role: 'cancel'
        }
      ];

    const saveDeleteBtn: ActionSheetButton[] = [
      {
        text: 'Save article',
        icon: 'save-outline',
        handler: () => {
          this.saveArticle();
        }
      },
      {
        text: 'Delete article',
        icon: 'trash-outline',
        handler: () => {
          this.saveArticle();
        }
      }
    ];
    if(this.storage.saveOrDeleteToggle(this.article)) {
      normalBts.unshift(saveDeleteBtn[1]);
    } else {
      normalBts.unshift(saveDeleteBtn[0]);
    }
    const share: ActionSheetButton = {
      text: "Share this article",
      icon: "share-outline",
      handler: () => {
        this.onShareArticle();
      }
    };
    if (this.platform.is('capacitor')) {
      normalBts.unshift(share);
    }
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Options',
      buttons: normalBts
    });
    await actionSheet.present();
  }
  onShareArticle() {
    this.socialSharing.share(
      this.article.title,
      this.article.source.name,
      null,
      this.article.url
    );
  }

  onFavoriteArticle() {
    console.log('Favorite article');
  }
  saveArticle() {
    this.storage.saveRemoveArticle(this.article);
  }
}
