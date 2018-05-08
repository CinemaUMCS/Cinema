import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ReservedSeatModel} from '../../model/reservedSeat.model';
import {SeatModel} from '../../model/seat.model';
import {SeanceRoomDataModel} from '../../model/seanceRoomData.model';
import {SeanceService} from '../shared/seance.service';
import {ReservationService} from '../shared/reservation.service';
import {ReservationModel} from '../../model/reservation.model';
import {MyBookingModel} from '../../model/myBooking.model';
import {MatDialog} from '@angular/material';
import {DialogComponent} from './dialog/dialog.component';
import {BookingSeatsService} from '../shared/booking-seats.service';

@Component({
  selector: 'app-buy-step3',
  templateUrl: './buy-step3.component.html',
  styleUrls: ['./buy-step3.component.scss']
})
export class BuyStep3Component implements OnInit {

  spinner = true;
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
  choosenSeatsCount: number;
  listOfBookingSeats = new Array<SeatModel>(); // wybrane miejsca do zarezerowania

  constructor(private route: ActivatedRoute, private seanceService: SeanceService,
              private reservationService: ReservationService, private router: Router, public dialog: MatDialog,
              private booking_service: BookingSeatsService) {
    this.booking_seats = this.onCreateBooleanSeatArrayRepresentationArray();
    this.clickedSeats = this.onCreateBooleanSeatArrayRepresentationArray();
  }

  ngOnInit() {
    console.log(this.booking_service.myBookingModel);
    this.seanceId = this.route.parent.snapshot.params['seanceId'];
    // this.seanceId = this.seanceService.actualSeance.id;
    this.getSeanceRoomData(this.seanceId);
    this.choosenSeatsCount = this.booking_service.choosenSeats;
  }

  onClickSeat(row, col, ref) {
    row = row - 1;
    col = col - 1;
    if (this.clickedSeats[row][col]) {
      this.clickedSeats[row][col] = false;
      this.clickedSeatsCount = this.clickedSeatsCount - 1;
      this.choosenSeatsCount = this.choosenSeatsCount + 1;
    } else {
      if (this.choosenSeatsCount < 1) {
        this.openDialog('Wszystkie zadeklarowane miejsca zostaly wybrane!');
        this.clickedSeats[row][col] = false;
        ref.checked = false;
        return;
      }
      this.clickedSeats[row][col] = true;
      this.clickedSeatsCount = this.clickedSeatsCount + 1;
      this.choosenSeatsCount = this.choosenSeatsCount - 1;
    }
  }


  getSeanceRoomData(seanceId: number) {
    this.seanceService.getSeanceRoomData(seanceId).subscribe(
      response => {
        this.seanceRoomData = response.json();
        this.setBookedSeats(this.seanceRoomData.reservedSeats);
        this.spinner = false;
      },
      error2 => {
        console.log(error2);
      }
    );
  }

  setBookedSeats(reservedSeats: SeatModel[]) {
    for (const s of reservedSeats) {
      this.booking_seats[s.row][s.number] = true;
    }
    // this.spinner = false;
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
    if (this.choosenSeatsCount !== 0) {
      this.openDialog('Prosze wybrac jeszcze ' + this.choosenSeatsCount + ' miejsce(a)');
      return;
    }
    this.getUserBookingSeatsList();
    this.booking_service.setBookingSeats(this.listOfBookingSeats);

    // this.router.navigate(['buy', this.seanceId, 'step2']);
  }

  openDialog(data: string) {
    // const dialogRef = this.dialog.open(DialogComponent, {
    //   height: '210px'
    // });
    const dialogRef = this.dialog.open(DialogComponent, {
      data: data,
      minHeight: '210px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
