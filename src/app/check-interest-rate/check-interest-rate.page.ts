import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from '../services/helper.service';
import { LoadingController } from '@ionic/angular';

@Component({
   selector: 'app-check-interest-rate',
   templateUrl: './check-interest-rate.page.html',
   styleUrls: ['./check-interest-rate.page.scss'],
})
export class CheckInterestRatePage implements OnInit {
   loanType: any = '';
   rateData: any = {};
   loader: any;
   constructor(
      private route: ActivatedRoute,
      public helper: HelperService,
      public loadingCtrl: LoadingController,
   ) { }

   ngOnInit() {
   }

   async showLoading() {
      this.loader = await this.loadingCtrl.create({
         message: this.helper.changeLanguageMessage('Loading...'),
         spinner: "bubbles"
      });

      this.loader.present();
   }
   ionViewDidEnter() {
      this.route.queryParams.subscribe(params => {
         if (params) {
            this.loanType = params['loanType']

         }
      });

      this.getLoanRate()
   }

   changeLoanType(loanType: any) {
      this.loanType = loanType;
      this.getLoanRate()
   }

   getLoanRate() {
      if (!this.rateData[this.loanType]) {
         this.rateData[this.loanType] = [];
         this.showLoading().then(() => {
            this.helper.get(this.loanType).then((resp: any) => {
               this.rateData[this.loanType] = resp;
               this.loader.dismiss();
            }).catch((error) => {
               this.loader.dismiss();
               this.helper.presentToast('Something went wrong')
            })

         })

      }
   }
}
