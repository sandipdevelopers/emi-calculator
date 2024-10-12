import { Component, OnInit, ViewChild } from '@angular/core';
import { HelperService } from '../services/helper.service';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gst-calc',
  templateUrl: './gst-calc.page.html',
  styleUrls: ['./gst-calc.page.scss'],
})
export class GstCalcPage implements OnInit {

  gstObj: any = {
    amount: null,
    rate: "18",
  };

  constructor(
    public helper: HelperService,
    public translate: TranslateService,
    public router: Router
  ) { }

  ngOnInit() {
  }

  calc(key: any) {
    if (key == 1) {
      this.gstObj.gstAmount = (this.gstObj.amount * parseInt(this.gstObj.rate)) / 100;
      this.gstObj.finalAmount = this.gstObj.amount + this.gstObj.gstAmount;
    }
    if (key == 2) {
      let gstRate = parseInt(this.gstObj.rate) / 100;
      const amountWithoutGST = this.gstObj.amount / (1 + gstRate);
      this.gstObj.finalAmount = Math.round(amountWithoutGST * 100) / 100
      this.gstObj.gstAmount = this.gstObj.amount - this.gstObj.finalAmount;
    }
  }
}
