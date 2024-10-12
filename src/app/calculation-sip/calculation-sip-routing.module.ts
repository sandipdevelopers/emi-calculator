import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CalculationSipPage } from './calculation-sip.page';

const routes: Routes = [
  {
    path: '',
    component: CalculationSipPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalculationSipPageRoutingModule {}
