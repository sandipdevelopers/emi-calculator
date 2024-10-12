import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Market } from '@awesome-cordova-plugins/market/ngx';
import { Share } from '@capacitor/share';
import { AlertController, ToastController } from '@ionic/angular';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor(
    public alert: AlertController,
    public router: Router,
    private toastController: ToastController,
    public market: Market,
    public http: HttpClient,
    public traslate: TranslatePipe,
    public traslateserv: TranslateService,
    public location :Location

  ) { }
  app_name = 'EMI Calculator';
  emi_app: any = {};
  defaultConfig: any = {
    "loanType": "Home Loan",
    "periodType": "year",
    "amount": 5000000,
    "period": 0,
    "loan_tenure": 5,
    "rate": 8.5
  };
  APP_BUNDEL = '';
  APP_LINK = ``;
  MORE_APP_LINK = '';
  VERSION: any = '1.0';
  currentLan: any = 'en';
  tempCurrentLan: any = 'en';
  navigate(route: any) {
    this.router.navigate([route]);
  }

  calculatEmi(data: any) {
    const monthlyInterestRate = (data.rate / 12) / 100;
    const tenureInMonths = data.period;
    const emi = data.amount * (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, tenureInMonths)) / (Math.pow(1 + monthlyInterestRate, tenureInMonths) - 1);

    const totalAmountRepaid = emi * tenureInMonths;
    const totalInterestPayable = totalAmountRepaid - data.amount;

    let outstandingLoanAmount = data.amount;
    let amount = data.amount;
    const monthlyDetails = [];
    const currentDate = new Date();
    let monthIndex = currentDate.getMonth() + 1
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let currentyear: any = currentDate.getFullYear();

    for (let month = 1; month <= tenureInMonths; month++) {
      const monthlyInterest = outstandingLoanAmount * monthlyInterestRate;
      const monthlyPrincipal = emi - monthlyInterest;
      outstandingLoanAmount -= monthlyPrincipal;

      const currentMonth = months[monthIndex];

      monthlyDetails.push({
        month: month,
        month_name: currentMonth,
        year: currentyear,
        amount: amount,
        monthlyPrincipal: monthlyPrincipal.toFixed(),
        monthlyInterest: monthlyInterest.toFixed(),
        outstandingLoanAmount: outstandingLoanAmount.toFixed(),
      });
      amount = outstandingLoanAmount.toFixed();
      monthIndex = monthIndex + 1;
      if (currentMonth == 'December') {
        monthIndex = 0;
        currentyear = currentyear + 1;
      }
    }

    let yearWise: any = {}
    for (let i in monthlyDetails) {
      if (!yearWise[monthlyDetails[i]['year']]) {
        yearWise[monthlyDetails[i]['year']] = []
      }
      yearWise[monthlyDetails[i]['year']].push(monthlyDetails[i])
    }
    return {
      emi: emi.toFixed(),
      totalInterestPayable: totalInterestPayable.toFixed(),
      totalPaymentsMade: totalAmountRepaid.toFixed(),
      monthyDetails: monthlyDetails,
      yearWise: yearWise
    };
  }

  async presentToast(message: any) {
    message = this.changeLanguageMessage(message)
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom',
    });

    await toast.present();
  }

  async shareApp() {
    await Share.share({
      title: 'EMI Calculator - Calculate Your Loan EMI',
      text: 'Check out this EMI calculator app. Easily calculate your monthly loan EMI with just a few clicks!',
      url: this.APP_LINK,
      dialogTitle: 'Share EMI Calculator App',
    });
  }
  rateApp() {
    this.market.open(this.APP_BUNDEL);
  }
  moreApp() {
    window.open(this.MORE_APP_LINK, '_blank');
  }

  

  changeLanguageMessage(message: string) {
    let reMessge: any = this.traslate.transform(message);
    return reMessge;
  }


  async changeLanguageAlert() {
    const alert = await this.alert.create({
      header: this.changeLanguageMessage('Change Language'),
      message: this.changeLanguageMessage('Are you sure, you want to change language.'),
      buttons: [{
        text: this.changeLanguageMessage('No'),
        role: 'cancel',
        handler: () => {
          this.tempCurrentLan = this.currentLan;
        }

      }, {
        text: this.changeLanguageMessage('Yes'),
        handler: () => {
          this.changeLanguage()
        }

      }]
    });

    await alert.present();
  }


  changeLanguage() {
    localStorage.setItem('emiLang', this.tempCurrentLan)
    this.traslateserv.use(this.tempCurrentLan)
    this.currentLan = this.tempCurrentLan;
  }

  get( loanType :any) {
    return new Promise((resolve, reject) => {
      this.http.get(`assets/bank/${loanType}.json`).subscribe((data: any) => {
        resolve(data);
      });
    });
  }

  backLocation() {
    this.location.back()
  }
}
