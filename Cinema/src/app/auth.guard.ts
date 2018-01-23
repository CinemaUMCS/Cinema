import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { UserService } from './user.service';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/take';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private authService: UserService,
    private router: Router
  ) {}
  isLoggedIn:boolean

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    this.isLoggedIn = this.authService.isLoggedIn       // {1}                           // {2} 
        // {3}
        if (!this.isLoggedIn){
          this.router.navigate(['/login']);  // {4}
          return false;
        }
        
        return true;
      }
  }
