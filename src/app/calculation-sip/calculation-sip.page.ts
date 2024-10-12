import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
import { AlertController, LoadingController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-calculation-sip',
  templateUrl: './calculation-sip.page.html',
  styleUrls: ['./calculation-sip.page.scss'],
})
export class CalculationSipPage implements OnInit {
  loader: any;
  sipAmount: any
  doughnutChartDatasets: any;
  params: any;
  data: any = {};
  doughnutChart: any;
  // Total value
  // Doughnut
  doughnutChartLabels = [this.helper.changeLanguageMessage('Invested amount'), this.helper.changeLanguageMessage('Total value')];
  constructor(
    private route: ActivatedRoute,
    public helper: HelperService,
    public alert: AlertController,
    public loadingCtrl: LoadingController,

  ) { }

  ngOnInit() {
  }
  ionViewDidEnter() {
    this.calculate();
  }
  async showLoading() {
    this.loader = await this.loadingCtrl.create({
      message: this.helper.changeLanguageMessage('Loading...'),
      spinner: "bubbles"
    });

    this.loader.present();
  }
  calculate() {
    this.showLoading().then(() => {
      this.route.queryParams.subscribe(params => {
        if (params) {
          this.params = params
        }
        const monthlyRate = (this.params['annualInterestRate'] / 100) / 12;
        const totalMonths = this.params['numberOfYears'] * 12;
        this.sipAmount = this.params['monthlyInvestment'] * (((1 + monthlyRate) ** totalMonths - 1) / monthlyRate) * (1 + monthlyRate);
        let totalInvestment = this.params['monthlyInvestment'] * totalMonths;
        let totalInterest = this.sipAmount - totalInvestment;
        this.data['totalInvestment'] = totalInvestment;
        this.data['totalInterest'] = totalInterest;
        this.doughnutChartDatasets = [
          {
            data: [totalInvestment, totalInterest], backgroundColor: [
              'rgb(145 144 252)',
              'rgb(108 112 223)',
            ]
          }];

          this.loader.dismiss();
      });
    })
  }
} 
