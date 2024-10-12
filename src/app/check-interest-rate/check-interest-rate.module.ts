import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CheckInterestRatePageRoutingModule } from './check-interest-rate-routing.module';

import { CheckInterestRatePage } from './check-interest-rate.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CheckInterestRatePageRoutingModule
  ],
  declarations: [CheckInterestRatePage]
})
export class CheckInterestRatePageModule {}
