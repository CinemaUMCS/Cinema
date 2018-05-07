import {Injectable, OnInit, Optional} from '@angular/core';
import {SeanceService} from './seance.service';
import {SeanceRoomDataModel} from '../../model/seanceRoomData.model';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class BookingSeatsService {

  seance;
  seanceId: number;
  seanceRoomData = new Subject<SeanceRoomDataModel>();
  currentSeance = this.seanceRoomData.asObservable();
  choosenSeats: number;

  constructor(private seanceService: SeanceService) {
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

  setChoosenSeatsCount(i: number) {
    this.choosenSeats = i;
  }

}
