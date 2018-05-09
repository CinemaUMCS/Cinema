import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MovieService} from '../services/movie.service';
import {SeancesService} from '../services/seances.service';
import {RoomService} from '../services/room.service';

@Component({
  selector: 'app-home-panel',
  templateUrl: './home-panel.component.html',
  styleUrls: ['./home-panel.component.scss'],
  providers: [MovieService, SeancesService, RoomService]
})
export class HomePanelComponent implements OnInit {
  mode = new FormControl('side');
  constructor() { }

  ngOnInit() {
  }

}
