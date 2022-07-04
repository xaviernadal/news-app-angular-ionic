import { Component, ViewChild } from '@angular/core';
import { NewsService } from 'src/app/services/news.service';
import { Article, NewsResponse } from '../../interfaces';
import { IonInfiniteScroll } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  @ViewChild(IonInfiniteScroll, {static: true}) infiniteScroll: IonInfiniteScroll;
  articles: Article[] = [];

  constructor(private newsService: NewsService) {}
  ngOnInit() {
    this.newsService.getTopHeadlines()
    .subscribe( articles => {
      this.articles.push( ...articles )
    });
  }

  loadData() {
    this.newsService.getTopHeadlinesByCategory('general', true)
    .subscribe( articles => {

      if(articles.length === this.articles.length) {
        this.infiniteScroll.disabled = true;
        return;
      }

      this.articles = [ ...this.articles, ...articles ]
      this.infiniteScroll.complete();
    });
  }
}
