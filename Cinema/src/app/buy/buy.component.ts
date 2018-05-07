import {Component, OnInit} from '@angular/core';
import {ReservationService} from '../shared/reservation.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router, RouterStateSnapshot} from '@angular/router';
import {SeancesService} from '../admin/services/seances.service';
import {SeanceService} from '../shared/seance.service';
import {SeanceModel} from '../../model/seance.model';
import {RegulationsComponent} from '../regulations/regulations.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-buy',
  templateUrl: './buy.component.html',
  styleUrls: ['./buy.component.scss'],
  // providers:[ReservationService]
})
export class BuyComponent implements OnInit {
  // isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  seanceId: number;
  seance: SeanceModel;

  constructor(private _formBuilder: FormBuilder, private route: ActivatedRoute, private seance_service: SeanceService, private router: Router, public dialog: MatDialog,) {
  }

  ngOnInit() {
    this.seanceId = this.route.snapshot.params['seanceId'];
    this.getSeance(this.seanceId);
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  getSeance(seanceId: number) {
    this.seance_service.getSeanceById(seanceId).subscribe(
      value => {
        this.seance = value.json();
        this.seance_service.setActualSeance(this.seance);
      },
      error2 => {
        console.log(error2);
      }
    );
  }
}

