import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core'; // 1

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  language: string = this.translateService.currentLang; // 2 

  constructor(private translateService: TranslateService) {} //3

  ngOnInit() {
  }
  languageChange() {  // add this
    this.translateService.use(this.language);  // add this
  }  // add this
}
