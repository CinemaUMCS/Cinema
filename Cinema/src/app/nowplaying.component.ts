import {Component, OnInit} from '@angular/core';


import {DatePipe} from '@angular/common';
import {SeanceService} from './shared/seance.service';
import {MovieModel} from '../model/movie.model';
import {CategoryModel} from '../model/category.model';
import {SeanceModel} from '../model/seance.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-nowplaying',
  templateUrl: './nowplaying.component.html',
  styleUrls: ['./nowplaying.component.scss']
})
export class NowPlayingComponent implements OnInit {

  title = 'app';
  list = [1, 2, 3, 3, 3, 33, 3, 3, 3, 3, 3, 3];
  date = new Date();
  minDate = new Date();
  buttonDates = new Array<any>();
  actualDayOfWeek: number;

  movieAtDay: MovieModel[];
  categories: CategoryModel[];
  seances: SeanceModel[];

  emptyPage: boolean;

  constructor(private datePipe: DatePipe, private seanceService: SeanceService, private router: Router) {
  }

  ngOnInit() {
    this.actualDayOfWeek = new Date().getDay();
    this.containDateWithButton();
    this.getAllCategories();
    this.getRepartioryByDate(this.datePipe.transform(this.date, 'yyyy-MM-dd'));
    // this.getRepartioryByDate('2018-12-01');
  }


  clickWeekBtnEvent(event) {
    const id = event.srcElement.id;
    this.date = this.buttonDates[id];
    this.getRepartioryByDate(this.datePipe.transform(this.date, 'yyyy-MM-dd'));

  }

  setDateFromDataPicker() {
    this.getRepartioryByDate(this.datePipe.transform(this.date, 'yyyy-MM-dd'));
  }


  getRepartioryByDate(date: string) {
    console.log(date);
    this.getMovieByDate(date);
    this.getSeanceByDate(date);
  }


  addDaysToActualDate(numberOfDay: number) {
    return new Date(this.date.getTime() + numberOfDay * (60 * 60 * 24 * 1000));
  }

  containDateWithButton() {
    const day = this.actualDayOfWeek;
    for (let i = 0; i < 7; i++) {
      console.log((day + i) % 7);
      this.buttonDates[(day + i) % 7] = this.addDaysToActualDate(i);
    }
  }

  getMovieByDate(date: string) {
    date = this.datePipe.transform(date, 'yyyy-MM-dd');
    this.seanceService.getAllMovieByDay(date).subscribe(
      response => {
        this.movieAtDay = response.json();
        if (this.movieAtDay.length > 0) {
          this.emptyPage = false;
        } else {
          this.emptyPage = true;
        }
      },
      error => {
        console.log(error);
        this.emptyPage = true;
      }
    );
  }

  getAllCategories() {
    this.seanceService.getAllCategories().subscribe(
      response => this.categories = response.json(),
      error2 => console.log(error2));
  }

  getSeanceByDate(date: string) {
    this.seanceService.getSeanceByDate(date).subscribe(
      response => {
        this.seances = response.json();
        console.log(this.seances);
      },
      error => console.log(error)
    );
  }

  showYoutube(id): void {
    document.getElementById(id).style.display = 'block';
    document.getElementById('hideYoutubeVid').style.display = 'block';
  }

  hideYoutube(id, frame): void {
    var src = document.getElementById(frame).getAttribute('src');
    document.getElementById(frame).setAttribute('src', src);
    document.getElementById(id).style.display = 'none';
    document.getElementById('hideYoutubeVid').style.display = 'none';
  }

  chooseSeance(id) {
    this.router.navigate(['buy', id, 'buy-last']);
  }


}



