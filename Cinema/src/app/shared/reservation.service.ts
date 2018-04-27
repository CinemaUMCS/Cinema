import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {ReservationModel} from '../../model/reservation.model';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ReservationService {
  message: any;

  constructor() {
    // this.message.next(null);
  }

  setMessage(newMessage: any) {
    this.message = newMessage;
  }

  getMessage() {
    return this.message;
  }

}


