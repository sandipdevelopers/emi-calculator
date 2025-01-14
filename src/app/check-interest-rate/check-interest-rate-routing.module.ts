import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CheckInterestRatePage } from './check-interest-rate.page';

const routes: Routes = [
  {
    path: '',
    component: CheckInterestRatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CheckInterestRatePageRoutingModule {}
