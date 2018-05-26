import {Component, OnInit} from '@angular/core';
import {HeaderOpacityService} from '../shared/header-opacity.service';
import {RatingsService} from '../shared/ratings.service';
import {MovieModel} from '../../model/movie.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {

  constructor(private headerOpacityService: HeaderOpacityService, private ratingsService: RatingsService) {
  }

  movieList: MovieModel[];

  ngOnInit() {
    this.headerOpacityService.isDashboardComponentLoad(true);
    this.getTopRatedMovies();
  }

  getTopRatedMovies() {
    this.ratingsService.getTopRatingMovies(5).subscribe(
      value => {
        console.log('test',value);
        this.movieList = value.json();
      },
      error2 => {
        console.log(error2);
      });
  }
}
