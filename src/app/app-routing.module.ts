import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { FristInitGuard } from './guards/frist-init.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'frist-init',
    pathMatch: 'full'
  },
  {
    path: 'setting',
    loadChildren: () => import('./setting/setting.module').then(m => m.SettingPageModule)
  },
  {
    path: 'history',
    loadChildren: () => import('./history/history.module').then(m => m.HistoryPageModule)
  },
  {
    path: 'sip',
    loadChildren: () => import('./sip/sip.module').then(m => m.SipPageModule)
  },
  {
    path: 'calculation',
    loadChildren: () => import('./calculation/calculation.module').then(m => m.CalculationPageModule)
  },
  {
    path: 'check-rate',
    loadChildren: () => import('./check-interest-rate/check-interest-rate.module').then(m => m.CheckInterestRatePageModule)
  },
  {
    path: 'frist-init',
    canActivate: [FristInitGuard],
    loadChildren: () => import('./frist-init/frist-init.module').then(m => m.FristInitPageModule)
  },
  {
    path: 'gst-calc',
    loadChildren: () => import('./gst-calc/gst-calc.module').then( m => m.GstCalcPageModule)
  },
  {
    path: 'calculation-sip',
    loadChildren: () => import('./calculation-sip/calculation-sip.module').then( m => m.CalculationSipPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
