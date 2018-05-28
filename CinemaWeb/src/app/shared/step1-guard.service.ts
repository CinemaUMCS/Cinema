import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {BookingSeatsService} from './booking-seats.service';

@Injectable()
export class Step1GuardService implements CanActivate {
  constructor(private booking_service: BookingSeatsService,private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.booking_service.choosenSeats == null) {
      this.router.navigate(['/nowplaying']);
      return false;
    }
    return true;
  }

}
