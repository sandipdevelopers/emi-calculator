import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalculationPageRoutingModule } from './calculation-routing.module';

import { CalculationPage } from './calculation.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    CalculationPageRoutingModule
  ],
  declarations: [CalculationPage]
})
export class CalculationPageModule {}
