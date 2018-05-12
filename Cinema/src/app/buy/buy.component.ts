import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterStateSnapshot} from '@angular/router';
import {SeanceService} from '../shared/seance.service';
import {SeanceModel} from '../../model/seance.model';
import {MatDialog, MatHorizontalStepper, MatStepper} from '@angular/material';
import {MovieModel} from '../../model/movie.model';
import {ReservationService} from '../shared/reservation.service';
import {BuyProcessService} from '../shared/buy-process.service';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss'],
  // providers:[ReservationService]
})
export class BuyComponent implements OnInit {
  @ViewChild('stepper') stepper: MatHorizontalStepper;
  step2Flag: boolean;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  seanceId: number;
  movie: MovieModel;
  seance: SeanceModel;

  constructor(private _formBuilder: FormBuilder, private route: ActivatedRoute, private seance_service: SeanceService,
              public dialog: MatDialog, private buyProcessService: BuyProcessService) {
  }

  ngOnInit() {
    this.buyProcessService.step1flag.subscribe(value => this.step2Flag = value);
    this.route.data.subscribe(value => {
      this.seance = value['data'].json();
      // this.seance_service.setActualSeanceObservable(this.seance);
      this.seance_service.setActualSeance(this.seance);
    });
    this.getMovie(+this.seance.movieId);
    this.validate();

  }

  validate() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  getMovie(movieId: number) {
    this.seance_service.getMovieById(movieId).subscribe(
      value => {
        this.movie = value.json();
        this.seance_service.setActualMovieObservable(this.movie);
        this.seance_service.setActualMovie(this.movie);
      },
      error2 => {
        console.log(error2);
      }
    );
  }

  goForward() {
    this.stepper.next();
  }

  goBack() {
    this.stepper.previous();
  }
}

