import {Component, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ReservationService} from '../shared/reservation.service';
import {MatMenuTrigger} from '@angular/material';
import {MyBookingModel} from '../../model/myBooking.model';
import {FormControl, Validators} from '@angular/forms';
import {BookingSeatsService} from '../shared/booking-seats.service';

@Component({
  selector: 'app-buy-step2',
  templateUrl: './buy-step2.component.html',
  styleUrls: ['./buy-step2.component.scss']
})
export class BuyStep2Component implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  myBooking: MyBookingModel;
  animalControl = new FormControl('', [Validators.required]);

  animals = [
    {name: 'Normalny', sound: '18PLN'},
    {name: 'Ulgowy', sound: '12PLN'},
  ];

  constructor(private reservationService: ReservationService, private bookingSeatsService: BookingSeatsService) {
    // this.createFormControl();
  }

  ngOnInit() {
    this.myBooking = this.bookingSeatsService.myBookingModel;
    console.log(this.myBooking);
  }

  click() {

  }

}
