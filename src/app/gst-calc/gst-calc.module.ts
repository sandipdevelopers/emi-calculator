import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GstCalcPageRoutingModule } from './gst-calc-routing.module';

import { GstCalcPage } from './gst-calc.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    GstCalcPageRoutingModule
  ],
  declarations: [GstCalcPage]
})
export class GstCalcPageModule {}
