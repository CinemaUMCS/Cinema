import {Injectable} from '@angular/core';
import {BaseHttpService} from './base-http.service';
import {Headers, Http} from '@angular/http';
import {MyBookingModel} from '../../model/myBooking.model';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class ReservationService extends BaseHttpService {
  constructor(private http: Http, private authenticationService: AuthenticationService) {
    super();
  }

  onSeatsReservation(myBookingModel: MyBookingModel) {
    const header = new Headers({'authorization': this.authenticationService.getToken()});
    return this.http.post(this.setUrl('reservation'), myBookingModel, {headers: header});
  }

}


