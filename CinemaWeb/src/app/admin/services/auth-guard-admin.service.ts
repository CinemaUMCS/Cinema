import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthenticationService} from '../../shared/authentication.service';

@Injectable()
export class AuthGuardAdmin implements CanActivate {
  constructor(private authService: AuthenticationService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const isAuthenticated = this.authService.isLogged();
    if(isAuthenticated) {
      if(localStorage.getItem('role') !== 'admin') {
        this.authService.logout();
        this.router.navigate(['/admin/login']);
        return false;
      }
    } else {
      this.router.navigate(['/admin/login']);
      return false;
    }
    return true;
  }

}
