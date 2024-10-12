import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalculationSipPageRoutingModule } from './calculation-sip-routing.module';

import { CalculationSipPage } from './calculation-sip.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CalculationSipPageRoutingModule
  ],
  declarations: [CalculationSipPage]
})
export class CalculationSipPageModule {}
