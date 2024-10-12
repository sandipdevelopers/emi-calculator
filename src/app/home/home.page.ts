import { Component, OnInit, ViewChild } from '@angular/core';
import { HelperService } from '../services/helper.service';
import { DatabaseService } from '../services/database.service';
import { AlertController, Platform } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { SplashScreen } from '@capacitor/splash-screen';
@Component({
   selector: 'app-home',
   templateUrl: 'home.page.html',
   styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

   object: any = JSON.parse(JSON.stringify(this.helper.defaultConfig));

   constructor(
      public helper: HelperService,
      public alert: AlertController,
      public database: DatabaseService,
      private translate:TranslateService,
      public router: Router,
      public platform: Platform,
   ) {
   }


   ngOnInit(): void {
      this.platform.ready().then(async () => {
         await SplashScreen.hide().then(() => {
            this.database.appInitialize();
         });
      });
   }

   ionViewDidEnter() {
   }

   async validationAlert(message: any) {
      if (!message) return;
      let alertL = await this.alert.create({
         cssClass: '',
         header: this.helper.app_name,
         message: message,
         buttons: [
            {
               text: 'Cancel',
               role: 'cancel',
               cssClass: 'secondary',
               handler: (blah: any) => {
                  // this.database.setDefaultSetting();
                  setTimeout(() => {
                     // this.calculate();
                  }, 300);
               },
            },
            {
               text: 'Setting',
               handler: () => {
                  this.helper.navigate('/setting');
               },
            },
         ],
      });

      alertL.present();
   }

   // Used for  Change Loan type
   changeLoanType(type: string, rate: any) {
      this.object = JSON.parse(JSON.stringify(this.helper.defaultConfig));
      this.object['loanType'] = type;
      this.object['rate'] = parseFloat(rate);
   }

   calc() {
      if (!(this.object.amount && this.object.rate && this.object.loan_tenure)) {
         this.helper.presentToast('All fields are required.')
         return
      };

      this.router.navigate(['/calculation'], { queryParams: this.object });
   }

   checkRate() {
      this.router.navigate(['check-rate'], { queryParams: { loanType: 'home-loan' } });
   }
}
