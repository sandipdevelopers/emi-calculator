import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GstCalcPage } from './gst-calc.page';

const routes: Routes = [
  {
    path: '',
    component: GstCalcPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GstCalcPageRoutingModule {}
