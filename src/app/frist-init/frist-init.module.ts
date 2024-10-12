import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FristInitPageRoutingModule } from './frist-init-routing.module';

import { FristInitPage } from './frist-init.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    FristInitPageRoutingModule
  ],
  declarations: [FristInitPage],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
})
export class FristInitPageModule {}
