import {Component, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {ReservationService} from '../shared/reservation.service';

@Component({
  selector: 'app-buy-step2',
  templateUrl: './buy-step2.component.html',
  styleUrls: ['./buy-step2.component.scss']
})
export class BuyStep2Component implements OnInit {
  reservationSub: Subscription;
  message: string;

  constructor(private reservationService: ReservationService) {
  }

  ngOnInit() {
    this.reservationSub = this.reservationService.getMessage().subscribe(value => {
      console.log(value);
      this.message = value;
    });
    console.log(this.message);
  }
}
