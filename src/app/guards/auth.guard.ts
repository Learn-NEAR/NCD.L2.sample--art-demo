import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {ArtService} from "../services/art.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private artService: ArtService) {
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {


    if (this.artService.nearService.wallet.getAccountId() !== '') {
      console.log('da')
      this.router.navigate(['dashboard']);
      return true
    } else {
      console.log('net')
      this.router.navigate(['']);

    }

    return false;
  }

}
