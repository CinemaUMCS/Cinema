import {Component, OnInit} from '@angular/core';
import {DummyServiceService} from '../../services/dummy-service.service';
import {Subscription} from 'rxjs';
import {MatTabChangeEvent, MatTableDataSource} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {MovieModel} from '../../../model/movie.model';
import {SeanceModel} from '../../../model/seance.model';
import {SeancesService} from '../services/seances.service';
import {MovieService} from '../services/movie.service';
import {DatePipe} from '@angular/common';
import {RoomService} from '../services/room.service';
import {RoomModel} from '../../../model/room.model';
import {Subject} from 'rxjs/Subject';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-seances',
  templateUrl: './seances.component.html',
  styleUrls: ['./seances.component.scss']
})
export class SeancesComponent implements OnInit {
  timeSubject = new Subject<Date>();
  index;
  lock = false;
  movieId: number;
  movie: MovieModel;
  editMode = false;
  loaded = false;
  seances: SeanceModel[][] = [[], [], [], [], [], [], []];
  dataSource;
  myTime;
  seanceForm: FormGroup;
  seance: SeanceModel;
  modelSeance: SeanceModel = <SeanceModel>{};
  options: RoomModel[];
  displayedColumns = ['date', 'normal_price', 'price', 'options'];
  private date = new Date();
  endDate: Date;
  nextDates = [];
  subscription: Subscription;

  constructor(private route: ActivatedRoute, private seanceService: SeancesService, private movieService: MovieService, private pipe: DatePipe, private roomService: RoomService) {
  }


  getTime() {
    return this.myTime;
  }

  setTime(date: Date) {
    this.myTime = date;
  }


  ngOnInit() {
    this.lock = true;
    this.myTime = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), 12, 0);
    this.movieId = +this.route.snapshot.params['id'];
    this.route.params.subscribe(params => {
      this.movieId = +params['id'];
      this.movieService.getMovie(this.movieId).subscribe(
        data => {
          this.movie = data;
        }
      );
    });
    console.log(this.date);
    console.log(this.pipe.transform(this.myTime, 'yyyy-MM-ddTHH:mm:ss'));
    console.log(this.pipe.transform(new Date(this.myTime.valueOf() + 60000), 'yyyy-MM-ddTHH:mm:ss'));
    this.roomService.getGetAvailableRooms(this.pipe.transform(this.myTime, 'yyyy-MM-ddTHH:mm:ss'), this.pipe.transform(new Date(this.myTime.valueOf() + +60000), 'yyyy-MM-ddTHH:mm:ss')).subscribe(
      data => {
        this.options = data;
        this.lock = false;
      }
    );

    for (let i = 0; i < 7; ++i) {
      console.log(i);

      this.seanceService.getSeanceByMovieIdAndDate(this.movieId, this.pipe.transform(this.date, 'yyyy-MM-dd')).subscribe(
        data => {
          console.log(data);
          this.nextDates.push(new Date(this.date.valueOf()));
          this.seances[i] = data;
          this.date.setDate(this.date.getDate() + 1);
        },
        err => {
          console.log('NIC BY TO NIE DALO');
        }
      );

    }
    console.log(this.nextDates);
    this.dataSource = new MatTableDataSource(this.seances);
    this.initForm();

  }

  onLinkClick(event: MatTabChangeEvent) {
    this.index = event.index;
    let currentDate = new Date();
    this.myTime = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + event.index, 12, 0);
    console.log(this.myTime);
    this.seanceService.getSeanceByMovieIdAndDate(this.movieId, this.pipe.transform(this.nextDates[event.index], 'yyyy-MM-dd')).subscribe(
      data => {
        this.seances[event.index] = data;
      },
      err => {
        console.log('NIC BY TO NIE DALO');
      }
    );
  }

  update() {
    this.lock = true;
    let newDate = new Date(this.myTime.valueOf() + +this.seanceForm.controls['durationInMinutes'].value*60000);
    this.roomService.getGetAvailableRooms(this.pipe.transform(this.myTime, 'yyyy-MM-ddTHH:mm:ss'), this.pipe.transform(newDate, 'yyyy-MM-ddTHH:mm:ss')).subscribe(
      data => {
        this.options = data;
        console.log(this.pipe.transform(this.myTime, 'yyyy-MM-ddTHH:mm:ss'));
        console.log(newDate);
        this.lock = false;
      }
    );
  }
  change(event) {
    this.modelSeance.roomId = event.value;
  }
  dodaj() {
    this.modelSeance.movieId = this.movieId.toString();
    this.modelSeance.duration = this.modelSeance.duration;
    this.modelSeance.normalTicketPrice = this.modelSeance.normalTicketPrice;
    this.modelSeance.concessionaryTicketPrice = this.modelSeance.concessionaryTicketPrice;
    this.seanceService.addSeance(this.modelSeance);
  }

  initForm() {
    let seanceId = '';
    let seanceStart = '';
    let durationInMinutes = '';
    let movieId = this.movieId.toString();
    let roomId: string = '';
    let normalTicketPrice = '';
    let concessionaryTicketPrice = '';
    console.log('first');
    if (this.editMode) {

      //  id = this.movie.id;
      seanceStart = this.seance.seanceStart;
      console.log(this.movie);
      durationInMinutes = this.seance.duration;
      roomId = this.seance.roomId;
      normalTicketPrice = this.seance.normalTicketPrice;
      concessionaryTicketPrice = this.seance.concessionaryTicketPrice;
      console.log(this.movie);
    }
    console.log(this.movie);


    this.seanceForm = new FormGroup({
      'seanceStart': new FormControl(seanceStart, Validators.required),
      'durationInMinutes': new FormControl(durationInMinutes, Validators.required),
      'movieId': new FormControl(movieId),
      'roomId': new FormControl(roomId),
      'normalTicketPrice': new FormControl(normalTicketPrice, Validators.required),
      'concessionaryTicketPrice': new FormControl(concessionaryTicketPrice, Validators.required),
    });
    this.loaded = true;
  }

  getCurrentTime() {
    return this.pipe.transform(this.myTime, 'yyyy-MM-ddThh:mm');

  }

  onSubmit() {
    // console.log(this.movieForm.value);
    // if (this.editMode) {
    //   this.movieService.updateMovie(this.id, this.movieForm.value).subscribe(
    //     () => {
    //       console.log(this.movieForm.value);
    //       this.movieService.updateMoviesFromDb();
    //       this.rr.navigate(['/admin/panel/filmy']);
    //     }
    //   );
    // } else {
    //   this.movieService.addMovie(this.movieForm.value).subscribe(
    //     (data) => {
    //       this.movieService.updateMoviesFromDb();
    //       this.rr.navigate(['/admin/panel/filmy']);
    //
    //     }
    //   );
    // }
    console.log(this.seanceForm.value);
    this.seanceService.addSeance(this.seanceForm.value).subscribe(
      data => {
        console.log(data);
        this.seances[this.index].push(this.seanceForm.value);
        this.initForm();
      },
      err => {
        console.log(err);
      }
    );

  }

  onChange(event) {
    this.seanceForm.controls['seanceStart'].setValue(this.pipe.transform(this.myTime, 'yyyy-MM-ddTHH:mm:ss'));
  }

}
