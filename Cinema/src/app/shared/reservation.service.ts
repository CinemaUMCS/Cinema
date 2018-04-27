import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {ReservationModel} from '../../model/reservation.model';
import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ReservationService {
  private message = new Subject<string>();

  constructor() {
    // this.message.next(null);
  }

  publishMessage(data: string) {
    this.message.next(data);
  }

  getMessage(): Observable<any> {
    return this.message.asObservable();
  }

}


