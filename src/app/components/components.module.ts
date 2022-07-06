import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ArticleComponent } from './article/article.component';
import { ArticlesComponent } from './articles/articles.component';
import { StorageService } from '../services/storage.service';
import { ErrorHandlerComponent } from './error-handler/error-handler.component';



@NgModule({
  declarations: [ArticleComponent, ArticlesComponent, ErrorHandlerComponent],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ArticlesComponent,
    ErrorHandlerComponent
  ],
  providers: [StorageService],
})
export class ComponentsModule { }
