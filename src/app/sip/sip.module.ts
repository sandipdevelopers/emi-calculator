import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SipPageRoutingModule } from './sip-routing.module';

import { SipPage } from './sip.page';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    SipPageRoutingModule
  ],
  declarations: [SipPage]
})
export class SipPageModule {}
