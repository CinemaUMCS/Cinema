import {Component, OnInit} from '@angular/core';
import {ReservationService} from '../shared/reservation.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterStateSnapshot} from '@angular/router';
import {SeancesService} from '../admin/services/seances.service';
import {SeanceService} from '../shared/seance.service';
import {SeanceModel} from '../../model/seance.model';
import {RegulationsComponent} from '../regulations/regulations.component';
import {MatDialog} from '@angular/material';
import {MovieModel} from '../../model/movie.model';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss'],
  // providers:[ReservationService]
})
export class BuyComponent implements OnInit {
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  seanceId: number;
  movie: MovieModel;
  // loading = true;
  seance: SeanceModel;

  constructor(private _formBuilder: FormBuilder, private route: ActivatedRoute, private seance_service: SeanceService,
              public dialog: MatDialog,) {
  }

  ngOnInit() {
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
        console.log(this.movie);
        this.seance_service.setActualMovieObservable(this.movie);
      },
      error2 => {
        console.log(error2);
      }
    );
  }
}

