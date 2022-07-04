import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ArticleComponent } from './article/article.component';
import { ArticlesComponent } from './articles/articles.component';
import { StorageService } from '../services/storage.service';



@NgModule({
  declarations: [ArticleComponent, ArticlesComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ArticlesComponent
  ],
  providers: [StorageService],
})
export class ComponentsModule { }
