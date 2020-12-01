import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})
export class IsLoggedInGuard implements CanActivate {


  constructor(
    private afs: AngularFireAuth,
    private route: Router
  ) {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {



    return this.afs.user.pipe(
      map(w => w ? true : this.route.createUrlTree(['/']) )
      )
  }
  
}
