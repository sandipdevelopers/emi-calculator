import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FristInitPage } from './frist-init.page';

const routes: Routes = [
  {
    path: '',
    component: FristInitPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FristInitPageRoutingModule {}
