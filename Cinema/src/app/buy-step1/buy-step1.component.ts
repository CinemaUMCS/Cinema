import {Component, Inject, OnInit} from '@angular/core';
import {BookingSeatsService} from '../shared/booking-seats.service';
import {SeatModel} from '../../model/seat.model';
import {MyBookingModel} from '../../model/myBooking.model';
import {SeanceService} from '../shared/seance.service';
import {SeanceModel} from '../../model/seance.model';
import {MovieModel} from '../../model/movie.model';
import {SeanceRoomDataModel} from '../../model/seanceRoomData.model';
import {ReservationService} from '../shared/reservation.service';
import {BuyComponent} from '../buy/buy.component';

@Component({
  selector: 'app-buy-step1',
  templateUrl: './buy-step1.component.html',
  styleUrls: ['./buy-step1.component.scss']
})
export class BuyStep1Component implements OnInit {

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
    this.myBookingModel = this.bookingSeatService.myBookingModel;
    this.actualSeance = this.seanceService.actualSeance;
    // this.seanceService.movieMessage.subscribe(value => {
    //   this.actualMovie = value;
    // });
    this.actualMovie = this.seanceService.actualMovie;
    // console.log('actual movie', this.actualMovie);
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

}
