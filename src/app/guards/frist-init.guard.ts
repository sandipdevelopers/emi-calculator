import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FristInitGuard implements CanActivate {
  constructor(public router: Router) {

  }
  canActivate() {
    let isFristInEmi = JSON.parse(localStorage.getItem('isFristInEmi') || "0");
    
    if (!isFristInEmi) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }

}
