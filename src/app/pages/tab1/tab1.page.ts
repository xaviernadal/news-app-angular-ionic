import { Component, ViewChild } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { Article, NewsResponse } from '../../interfaces';
import { IonInfiniteScroll } from '@ionic/angular';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { AlertController } from '@ionic/angular';
import { of } from 'rxjs';
import { ModalController } from '@ionic/angular';


import { TranslateService } from '@ngx-translate/core'; // 1


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  @ViewChild(IonInfiniteScroll, { static: true }) infiniteScroll: IonInfiniteScroll;

  language: string = this.translateService.currentLang; // 2 

  articles: Article[] = [];
  showComp: boolean = false;

  constructor(private newsService: NewsService, private alertController: AlertController, private translateService: TranslateService) { }
  ngOnInit() {
    this.newsService.getTopHeadlines()
      .subscribe(
        articles => this.articles.push(...articles),
        (error) => {
          this.showAlert();
          this.showComp = true;
          return of([]);
        });
  }

  loadData() {
    this.newsService.getTopHeadlinesByCategory('general', true)
      .subscribe(articles => {
        if (articles.length === this.articles.length) {
          this.infiniteScroll.disabled = true;
          return;
        }
        this.articles = [...this.articles, ...articles]
        this.infiniteScroll.complete();
      });
  }

  async showAlert() {
    const alert = await this.alertController.create({
      header: 'Error',
      message: 'Error when requesting to the API',
      buttons: [{
        text: 'Refresh',
        handler: () => {
          window.location.reload();
        }
      }],
    });
    await alert.present();
    await alert.onDidDismiss();
  }
 
}
