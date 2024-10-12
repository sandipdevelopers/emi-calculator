import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HelperService } from '../services/helper.service';
@Component({
  selector: 'app-sip',
  templateUrl: './sip.page.html',
  styleUrls: ['./sip.page.scss'],
})
export class SipPage implements OnInit {
  monthlyInvestment: any;
  annualInterestRate: any;
  numberOfYears: any;


  constructor(
    public router: Router,
    public helper :HelperService
  ) { }

  ngOnInit() {
  }
  calculateSIP() {

    if (!this.monthlyInvestment
      || !this.annualInterestRate
      || !this.numberOfYears)
       {
          this.helper.presentToast("All fields are required.")
        
          return
       }

    let body = {
      monthlyInvestment: this.monthlyInvestment,
      annualInterestRate: this.annualInterestRate,
      numberOfYears: this.numberOfYears,
    }

    this.router.navigate(['calculation-sip'], { queryParams: body })


  }
}
