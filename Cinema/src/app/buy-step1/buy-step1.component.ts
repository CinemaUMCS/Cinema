import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {BookingSeatsService} from '../shared/booking-seats.service';
import {SeatModel} from '../../model/seat.model';
import {MyBookingModel} from '../../model/myBooking.model';
import {SeanceService} from '../shared/seance.service';
import {SeanceModel} from '../../model/seance.model';
import {MovieModel} from '../../model/movie.model';
import {SeanceRoomDataModel} from '../../model/seanceRoomData.model';
import {ReservationService} from '../shared/reservation.service';
import {BuyComponent} from '../buy/buy.component';
import {MatButton} from '@angular/material';

@Component({
  selector: 'app-buy-step1',
  templateUrl: './buy-step1.component.html',
  styleUrls: ['./buy-step1.component.scss']
})
export class BuyStep1Component implements OnInit {
  @ViewChild('btn_id') btnId: MatButton;

  myBookingModel: MyBookingModel;
  actualSeance: SeanceModel;
  actualMovie: MovieModel;
  ticketsTotalSum = 0;

  constructor(private bookingSeatService: BookingSeatsService, private seanceService: SeanceService,
              private reservationService: ReservationService, @Inject(BuyComponent) private parent: BuyComponent) {
  }

  ngOnInit() {
    this.getAllNessesaryModels();
    this.setTotalTicketSum();
  }

  getAllNessesaryModels() {
    this.bookingSeatService.currrentMyBookingModel.subscribe(value => {
      console.log(this.myBookingModel = value);
    });
    this.myBookingModel = this.bookingSeatService.myBookingModel;
    this.actualSeance = this.seanceService.actualSeance;
    this.actualMovie = this.seanceService.actualMovie;
  }

  setTotalTicketSum() {
    // cena za bilety normalne
    this.ticketsTotalSum += this.myBookingModel.numberOfNormalTickets * (+this.actualSeance.normalTicketPrice);
    // cena za bilety ulgowe
    this.ticketsTotalSum += this.myBookingModel.numberOfConcessionaryTickets * (+this.actualSeance.concessionaryTicketPrice);
  }

  onSeatReservation() {
    console.log(this.myBookingModel);
    this.reservationService.onSeatsReservation(this.myBookingModel).subscribe(
      value => {
        console.log('succes-reservation');
        this.parent.goForward();
      },
      error2 => {
        console.log(error2);
      }
    );
  }

  onClickPrevBtn() {
    close();
    this.bookingSeatService.resetBookingSeats();
    this.parent.goBack();
  }

}
