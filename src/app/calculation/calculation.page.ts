import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HelperService } from '../services/helper.service';
import { AlertController, IonContent, LoadingController } from '@ionic/angular';
import { DatabaseService } from '../services/database.service';
import * as pdfMake from "pdfmake/build/pdfmake";
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { DatePipe } from '@angular/common';
import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.page.html',
  styleUrls: ['./calculation.page.scss'],
})
export class CalculationPage implements OnInit {

  object: any = {}
  calculation: any;
  years: any = [];
  loader: any;
  @ViewChild('content', { static: true })
  content!: IonContent;
  // Doughnut
  doughnutChartLabels = [this.helper.changeLanguageMessage('Total Interest'), this.helper.changeLanguageMessage('Total Payments')];
  doughnutChartDatasets: any = [
    // {
    //   data: [100, 100, 100],
    //   backgroundColor: [
    //     'rgb(145 144 252)',
    //     'rgb(108 112 223)',
    //   ],
    // }
  ]
  constructor(
    private route: ActivatedRoute,
    public helper: HelperService,
    public alert: AlertController,
    public database: DatabaseService,
    public loadingCtrl: LoadingController,
    public datePipe: DatePipe,
    public share: SocialSharing,

  ) { }
  ngOnInit() {

  }
  ionViewDidEnter() {
    this.calculate();
  }

  calculate() {
    this.showLoading().then(() => {
      this.route.queryParams.subscribe(params => {
        if (params) {
          this.object = {
            loanType: params['loanType'],
            periodType: params['periodType'],
            amount: params['amount'],
            period: params['period'],
            loan_tenure: params['loan_tenure'],
            rate: params['rate']
          };
          if(params['id']) {
            this.object['id'] = params['id']
          }
        }
        if (this.object['periodType'] == 'year') {
          this.object['period'] = this.object['loan_tenure'] * 12;
        } else {
          this.object['period'] = this.object['loan_tenure']
        }
        const data: any = this.helper.calculatEmi(this.object);
  
        this.object['emi'] = data['emi'];
        this.object['totalInterestPayable'] = data['totalInterestPayable'];
        this.object['totalPaymentsMade'] = data['totalPaymentsMade'];
        this.object['monthyDetails'] = data['monthyDetails'];
        this.object['yearWise'] = data['yearWise'];
        this.years = Object.keys(data['yearWise']);
        this.doughnutChartDatasets = [{
          data: [this.object['totalInterestPayable'], this.object['totalPaymentsMade'] - this.object['totalInterestPayable']], backgroundColor: [
            'rgb(145 144 252)',
            'rgb(108 112 223)',
          ],
        }];
        this.loader.dismiss();
      });
    })
  }

  async showLoading() {
    this.loader = await this.loadingCtrl.create({
      message: this.helper.changeLanguageMessage('Loading...'),
      spinner: "bubbles"
    });

    this.loader.present();
  }

  saveHistory() {
    this.database.saveHistory(this.object).then((resp) => {
      this.helper.presentToast('Saved Successfully');
      this.helper.navigate('history')
    }).catch((error) => {

    })

  }

  sharePdf() {
    this.showLoading().then(() => {
      let tabalData: any
      let date = this.datePipe.transform(new Date(), 'dd-MM-yyyy');

      let yearsData: any = this.years.map((year: any) => {
        tabalData = this.object['yearWise'][year].map((yearData: any) => {
          return [
            { text: yearData.month_name.substring(0, 3), style: "cellText" },
            { text: yearData.monthlyPrincipal || 0, style: "cellText" },
            { text: yearData.monthlyInterest || 0, style: "cellText" },
            { text: yearData.outstandingLoanAmount || 0, style: "cellText" },
          ];
        });

        return {
          columns: [
            {
              width: '100%',
              stack: [
                {
                  text: year,
                  bold: true,
                  fontSize: 12,
                  margin: [0, 10, 0, 10],
                }, {
                  table: {
                    widths: ['25%', '25%', '25%', '25%'],
                    body: [
                      [
                        {
                          text: 'Month',
                          style: 'headerText'
                        }, {
                          text: 'Principal',
                          style: 'headerText'
                        }, {
                          text: 'Monthly Interest',
                          style: 'headerText'
                        }, {
                          text: 'Outstanding Balance',
                          style: 'headerText'
                        }
                      ],
                      ...tabalData
                    ]
                  },
                  layout: {
                    hLineColor: '#dbd6d6',
                    vLineColor: '#dbd6d6'
                  },
                }
              ]
            },
          ]
        }
      });

      const docDef: any = {
        pageSize: 'A4',
        pageOrientation: 'portrait',
        pageMargins: [20, 10, 40, 60],
        content: [
          {
            columns: [
              {
                text: this.object.loanType,
                fontSize: 18,
                alignment: 'center'
              }
            ],
            style: 'header'
          },
          {
            table: {
              widths: ['50%', '50%'],
              body: [
                [
                  { text: "Date" + ": " + date, fontSize: 12, bold: true },
                  { text: 'Principal Amount' + ": " + ((this.object['totalPaymentsMade'] || 0) - (this.object['totalInterestPayable'] || 0)) || 0, fontSize: 12, bold: true, alignment: 'right' }
                ], [
                  {},
                  { text: "Total Interest" + ": " + (this.object['totalInterestPayable'] || 0), fontSize: 12, bold: true, alignment: 'right' }
                ], [
                  {},
                  { text: "Total Payments" + ": " + (this.object['totalPaymentsMade'] || 0), fontSize: 12, bold: true, alignment: 'right' }
                ],
              ],
            },
            layout: 'noBorders',
            margin: [20, 0, 0, 12],
          },
          ...yearsData,
        ],

        styles: {
          header: {
            margin: [0, 30, 0, 20],
          },

          headerText: {
            fontSize: 10,
            bold: true,
            alignment: 'center',
            fillColor: "#9190FC"
          },
          cellText: {
            fontSize: 9,
            alignment: 'center'
          },
        }
      }

      pdfMake.createPdf(docDef).getDataUrl((resp) => {
        this.loader.dismiss();
        this.share.share('', '', resp, '');
      })
    }).catch((error)=>{
      this.loader.dismiss();

    })
  }

}
