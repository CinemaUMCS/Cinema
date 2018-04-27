import {Component, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ReservationService} from '../shared/reservation.service';
import {MatMenuTrigger} from '@angular/material';
import {MyBookingModel} from '../../model/myBooking.model';

@Component({
  selector: 'app-buy-step2',
  templateUrl: './buy-step2.component.html',
  styleUrls: ['./buy-step2.component.scss']
})
export class BuyStep2Component implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  myBooking: MyBookingModel;

  constructor(private reservationService: ReservationService) {
  }

  click() {

  }

  ngOnInit() {
    this.myBooking = this.reservationService.getMessage();
    console.log(this.myBooking);
  }

}
