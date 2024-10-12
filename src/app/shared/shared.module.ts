import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [],
  imports: [
    NgChartsModule,
    TranslateModule,
  ], exports: [
    NgChartsModule, TranslateModule,
  ]
})
export class SharedModule { }
