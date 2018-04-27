import { Component, OnInit } from '@angular/core';
import {ReservationService} from '../shared/reservation.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss'],
  // providers:[ReservationService]
})
export class BuyComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
