import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { register } from 'swiper/element/bundle';
import { HelperService } from '../services/helper.service';
register();
@Component({
   selector: 'app-frist-init',
   templateUrl: './frist-init.page.html',
   styleUrls: ['./frist-init.page.scss'],
})
export class FristInitPage {
   object: any = {
      amount: '5000000',
      loan_tenure: '5',
      rate: '8.5',
   }

   @ViewChild('swiper')
   swiperRef: ElementRef | any;

   constructor(
      public route: Router,
      public helper: HelperService,
   ) { }

   slideBack() {
      this.swiperRef?.nativeElement.swiper.slidePrev()
   }

   sliderChanges() {
      this.swiperRef?.nativeElement.swiper.slideNext()
   }
   
   ngAfterViewInit() {
      console.log(this.swiperRef)
   }

   goToMain() {
      localStorage.setItem('isFristInEmi', JSON.stringify(1))
      this.helper.changeLanguage()
      this.route.navigate(['/home'])
   }

}

