import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {DialogComponent} from '../buy-step3/dialog/dialog.component';
import {ActivatedRoute, Router} from '@angular/router';
import {BookingSeatsService} from '../shared/booking-seats.service';
import {SeanceRoomDataModel} from '../../model/seanceRoomData.model';
import {RegulationsComponent} from '../regulations/regulations.component';
import {SeanceService} from '../shared/seance.service';
import {SeanceModel} from '../../model/seance.model';

@Component({
  selector: 'app-buy-step-0',
  templateUrl: './buy-step-0.component.html',
  styleUrls: ['./buy-step-0.component.scss']
})
export class BuyStep0Component implements OnInit {
  spinner_flag = true; // odpowiada za wyswietlanie spinnera
  ticket_normal_price: string;
  ticket_concession_price: string;
  ticket_normal = '0';
  ticket_concession = '0';
  seanceId: number;
  seanceRoomData: SeanceRoomDataModel;
  ticketSum: number;
  seance: SeanceModel;
  // seance: SeanceModel;

  allSeats = 120; // wszystkie miejsca na 1 sali

  constructor(public dialog: MatDialog, private router: Router, private route: ActivatedRoute, private booking_service: BookingSeatsService,
              private seance_serivce: SeanceService) {
    this.seanceId = this.route.parent.snapshot.params['seanceId'];
    this.booking_service.setCurrentSeanceId(this.seanceId); //musi zostac
    console.log('seansID', this.seanceId);

  }

  ngOnInit() {
    this.openRegulationsDialog();
    this.getSeanceRoomData();
    this.getActualSeanse();
  }

  nextStep() {
    this.ticketSum = (+this.ticket_normal) + (+this.ticket_concession);
    console.log(this.ticketSum);

    if (this.ticketSum < 1) {
      this.openDialog('Musisz wybrac co najmniej 1 bilet');
      return;
    } else if (this.ticketSum > 10) {
      console.log(this.ticketSum);
      this.openDialog('Możesz zarezerowac maksymalnie 10 miejsc');
      return;
    }
    if (this.allSeats < this.seanceRoomData.reservedSeats.length + this.ticketSum) {
      const free_seats = this.allSeats - this.seanceRoomData.reservedSeats.length;
      this.openDialog('Brak wolnych miejsc, maksymalna ilość dostępnych miejsc wynosi: ' + free_seats);
      return;
    }
    this.setBookingProperties()
    this.router.navigate(['buy', this.seanceId, 'step1']);
  }

  setBookingProperties() {
    this.booking_service.setNumberOfConsessionaryTicket(+this.ticket_concession);
    this.booking_service.setNumberOfNormalTicket(+this.ticket_normal);
    this.booking_service.setChoosenSeatsCount(this.ticketSum);
    this.booking_service.setSeanceId(this.seanceId);
  }

  // potrzebne do wyciagniecia ilosci wolnych miejsc
  getSeanceRoomData() {
    this.booking_service.currentSeance.subscribe(
      message => {
        this.seanceRoomData = message;
        this.spinner_flag = false;
      }
    );
  }

  getActualSeanse() {
    this.seance = this.seance_serivce.actualSeance;
    this.ticket_concession_price = this.seance.concessionaryTicketPrice;
    this.ticket_normal_price = this.seance.normalTicketPrice;
  }

  // getSeanceFromParentResolver() {
  //   this.route.parent.data.subscribe(value => {
  //     this.seance = value['data'].json();
  //   });
  // }

  openDialog(data: string) {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: data,
      minHeight: '210px'
    });

    dialogRef.afterClosed()
      .subscribe(result => {
        console.log(`Dialog result: $ {result}`);
      });
  }

  openRegulationsDialog() {
    const dialogRef = this.dialog.open(RegulationsComponent, {
      height: '300px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
      if (!result) {
        this.router.navigate(['/nowplaying']);
      }
    });
  }
}
