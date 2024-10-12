import { Component } from '@angular/core';
import { DatabaseService } from './services/database.service';
import { AlertController, Platform } from '@ionic/angular';
import { App } from '@capacitor/app';
import { HelperService } from './services/helper.service';
import { TranslateService } from '@ngx-translate/core';
import { register } from 'swiper/element/bundle';
register();


@Component({
   selector: 'app-root',
   templateUrl: 'app.component.html',
   styleUrls: ['app.component.scss'],
})
export class AppComponent {
   networkLoseL: any;
   currentLunguage: any = 'en';
   constructor(
      public database: DatabaseService,
      public platform: Platform,
      public helper: HelperService,
      public alert: AlertController,
      private translate: TranslateService
   ) {

      this.platform.ready().then(async () => {

         this.translate.setDefaultLang('en');
         this.translate.addLangs(['hi', 'fil', 'sw']);
         let temp = localStorage.getItem('emiLang');

         if (temp) {
            this.helper.currentLan = temp;
            this.helper.tempCurrentLan = temp;
         }

         this.translate.use(this.helper.currentLan);

      });
      this.platform.backButton.subscribeWithPriority(10, () => {
         if (location.pathname === '/home') {
            App.exitApp()
         } else {
            this.helper.backLocation()

         }
      });

   }


}
