import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { NewsResponse } from '../interfaces';
import { Article } from '../interfaces/index';
import {map} from 'rxjs/operators'

const apiKey = environment.apiKey;
const apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private articlesByCategory = {

  }

  constructor(private http: HttpClient) { }


  getTopHeadlines(): Observable<Article[]> {
    return this.getTopHeadlinesByCategory('general');
    //return this.executeQuery<NewsResponse>(`top-headlines?category=business`).pipe(map(resp => resp.articles));  
  }

  getTopHeadlinesByCategory(category: string, loadMore: boolean = false): Observable<Article[]> {

    if(loadMore) {
      return this.getArticlesByCategory(category);
    }
    if(this.articlesByCategory[category]) {
      return of(this.articlesByCategory[category].articles);
    }
    return this.getArticlesByCategory(category);
    }

  private getArticlesByCategory(category: string): Observable<Article[]> {
    if ( Object.keys( this.articlesByCategory).includes(category)) {
      
    }  else {
      this.articlesByCategory[category] = {
        page: 0,
        articles: []
      }
    };
    const page = this.articlesByCategory[category].page +=1;

    return this.executeQuery<NewsResponse>(`top-headlines?category=${category}&page=${page}`).pipe(map(resp => { 

      if (resp.articles.length === 0) return [];

      this.articlesByCategory[category] = {
        page: page,
        articles: [ ...this.articlesByCategory[category].articles, ...resp.articles]
      }
      
      return this.articlesByCategory[category].articles;}));
    }

  private executeQuery<T>(endpoint: string){
    return this.http.get<T>(`${ apiUrl }${ endpoint }`, {
      params: {
        apiKey: apiKey,
        country: 'us'
      }
    });
  }


  

}
