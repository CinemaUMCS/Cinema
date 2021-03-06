import {Injectable, OnInit, Optional} from '@angular/core';
import {SeanceService} from './seance.service';
import {SeanceRoomDataModel} from '../../model/seanceRoomData.model';
import {Subject} from 'rxjs/Subject';
import {MyBookingModel} from '../../model/myBooking.model';
import {SeatModel} from '../../model/seat.model';

@Injectable()
export class BookingSeatsService {

  // seance;
  seanceId: number;
  seanceRoomData = new Subject<SeanceRoomDataModel>();
  currentSeance = this.seanceRoomData.asObservable();
  choosenSeats: number;

  myBookingModel: MyBookingModel;
  myBookingModelObs = new Subject<MyBookingModel>();
  currrentMyBookingModel = this.myBookingModelObs.asObservable();

  constructor(private seanceService: SeanceService) {
    this.myBookingModel = {
      seanceId: this.seanceId,
      seatsToReserve: null,
      numberOfConcessionaryTickets: 0,
      numberOfNormalTickets: 0
    };
  }

  resetBookingSeats() {
    this.myBookingModel.seatsToReserve = [];
  }

  setCurrentyMyBookingModel(myBookingModel: MyBookingModel) {
    this.myBookingModelObs.next(myBookingModel);
  }


  setCurrentSeanceId(seanceId: number) {
    this.seanceService.getSeanceRoomData(seanceId).subscribe(
      response => {
        this.seanceRoomData.next(response.json());
      },
      error2 => {
        console.log(error2);
      }
    );
  }

  setBookingSeats(bookingSeats: SeatModel[]) {
    this.myBookingModel.seatsToReserve = bookingSeats;
  }

  setNumberOfNormalTicket(ticket: number) {
    this.myBookingModel.numberOfNormalTickets = ticket;
  }

  setNumberOfConsessionaryTicket(ticket: number) {
    this.myBookingModel.numberOfConcessionaryTickets = ticket;
  }

  setSeanceId(id: number) {
    this.myBookingModel.seanceId = id;
  }

  setChoosenSeatsCount(i: number) {
    this.choosenSeats = i;
  }

}
