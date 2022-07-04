import { Component, Input, OnInit } from '@angular/core';
import { Article } from '../../interfaces/index';
import { InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
})
export class ArticleComponent {
  @Input() article: Article;
  @Input() i: number;

  constructor(private iab: InAppBrowser) { }
  openArticle(){
    const browser =this.iab.create(this.article.url);
    browser.show();
    
  }
  onClick(){

  }

}
