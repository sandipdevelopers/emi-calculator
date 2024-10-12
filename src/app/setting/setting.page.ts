import { Component, OnInit } from '@angular/core';
import { HelperService } from '../services/helper.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.page.html',
  styleUrls: ['./setting.page.scss'],
})
export class SettingPage {

  constructor(
    public helper: HelperService,
    public router: Router
  ) { }

  ionViewDidEnter() {
    // this.database.setDefaultSetting();
  }

  checkRate() {
    this.router.navigate(['check-rate'], { queryParams: { loanType: 'home-loan' } });
  }

}
