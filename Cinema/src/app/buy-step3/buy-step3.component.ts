import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ReservedSeatModel} from '../../model/reservedSeat.model';
import {SeatModel} from '../../model/seat.model';
import {SeanceRoomDataModel} from '../../model/seanceRoomData.model';
import {SeanceService} from '../shared/seance.service';
import {ReservationService} from '../shared/reservation.service';
import {ReservationModel} from '../../model/reservation.model';
import {MyBookingModel} from '../../model/myBooking.model';

@Component({
  selector: 'app-buy-step3',
  templateUrl: './buy-step3.component.html',
  styleUrls: ['./buy-step3.component.scss']
})
export class BuyStep3Component implements OnInit {

  seanceId: any;
  number_columns = [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12]];
  word_number_rows = ['startValue', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  number_rows = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  booking_seats: boolean[][]; // lista miejsc zarezerwowanych przy starcie komponentu
  seanceRoomData: SeanceRoomDataModel;
  // true - klikniete miejsce, false - nie klikniete
  clickedSeats: boolean[][];
  // seat1: SeatModel = {id: 1, row: 2, num: 2, roomId: 1};
  // seat2: SeatModel = {id: 2, row: 3, num: 3, roomId: 1};
  clickedSeatsCount = 0;
  listOfBookingSeats = new Array<SeatModel>(); // wybrane miejsca do zarezerowania
  bol: boolean[][];

  // mock_seat = [this.seat1, this.seat2];

  constructor(private route: ActivatedRoute, private seanceService: SeanceService, private reservationService: ReservationService) {
    this.booking_seats = this.onCreateBooleanSeatArrayRepresentationArray();
    this.clickedSeats = this.onCreateBooleanSeatArrayRepresentationArray();
    // this.onCreateArray();
    // console.log(this.bol);
    // console.log(this.clickedSeats);
  }

  ngOnInit() {
    this.seanceId = this.route.snapshot.params['seanceId'];
    this.getSeanceRoomData(this.seanceId);
  }

  onClickSeat(row, col) {
    row = row - 1;
    col = col - 1;
    if (this.clickedSeats[row][col]) {
      this.clickedSeats[row][col] = false;
      this.clickedSeatsCount = this.clickedSeatsCount - 1;
    } else {
      this.clickedSeats[row][col] = true;
      this.clickedSeatsCount = this.clickedSeatsCount + 1;
    }
  }

  getSeanceRoomData(seanceId: number) {
    this.seanceService.getSeanceRoomData(seanceId).subscribe(
      response => {
        this.seanceRoomData = response.json();
        // console.log(this.seanceRoomData);
        this.setBookedSeats(this.seanceRoomData.reservedSeats);

      },
      error2 => {
        console.log(error2);
      }
    );
  }

  setBookedSeats(reservedSeats: SeatModel[]) {
    console.log(reservedSeats);
    for (const s of reservedSeats) {
      console.log(s.row);
      this.booking_seats[s.row][s.number] = true;
    }
  }

  // false - miejsce wolne, true - miejsce zajete
  onCreateBooleanSeatArrayRepresentationArray() {
    let booking: boolean[][];
    booking = new Array<Array<boolean>>();
    for (let i = 0; i <= 10; i++) {
      const row: boolean[] = new Array<boolean>();
      for (let j = 0; j <= 12; j++) {
        row.push(false);
      }
      booking.push(row);
    }
    return booking;
  }

  onCreateArray() {
    for (let i = 0; i <= 10; i++) {
      for (let j = 0; j <= 12; j++) {
        this.bol[i][j] = false;
      }

    }
  }

  getUserBookingSeatsList() {
    for (let i = 0; i <= 10; i++) {
      for (let j = 0; j <= 12; j++) {
        if (this.clickedSeats[i][j]) {
          const seat: SeatModel = {id: null, row: i, number: j, roomId: this.seanceRoomData.roomId};
          this.listOfBookingSeats.push(seat);
        }
        if (this.clickedSeatsCount < 1) {
          break;
        }
      }
    }
  }

  nextStepBtn() {
    this.getUserBookingSeatsList();
    const myBooking: MyBookingModel = {
      seanceId: this.seanceId,
      bookingSeats: this.listOfBookingSeats,
      numberOfConcessionaryTickets: 0,
      numberOfNormalTickets: 0
    };
    this.reservationService.setMessage(myBooking);
  }
}
