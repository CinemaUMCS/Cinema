import {Component, OnInit} from '@angular/core';
import {HeaderOpacityService} from '../shared/header-opacity.service';
import {MatDialog} from '@angular/material';
import {DialogComponent} from '../buy-step3/dialog/dialog.component';
import {RatingDialogComponent} from './rating-dialog/rating-dialog.component';
import {RatingsService} from '../shared/ratings.service';
import {MovieModel} from '../../model/movie.model';
import {RatingMovieModel} from '../../model/rating-movie.model';
import {RatingsResponseModel} from '../../model/ratingsResponse.model';

@Component({
  selector: 'app-movie-ratings',
  templateUrl: './movie-ratings.component.html',
  styleUrls: ['./movie-ratings.component.scss']
})
export class MovieRatingsComponent implements OnInit {
  constructor(private headerOpacityService: HeaderOpacityService, public dialog: MatDialog, private ratingService: RatingsService) {
  }
  
  isRatingFilterPipeFlag = null;
  dropdownTitle = 'WSZYSTKIE';
  ratingMovieModel: RatingMovieModel[] = [
    {
      id: 1,
      rating: null,
      movie: {
        id: 1,
        title: 'Passanger',
        description: 'test',
        category: 'Action',
        productionDate: new Date(),
        trailerPath: 'testet',
        posterPath: 'fafds',
        duration: '123',
        MinimalAge: 13,
        averageRating: 1
      },
    },
    {
      id: 4,
      rating: null,
      movie: {
        id: 4,
        title: 'Gwiezdne WOjny',
        description: 'test',
        category: 'Action',
        productionDate: new Date(),
        trailerPath: 'testet',
        posterPath: 'fafds',
        duration: '123',
        MinimalAge: 13,
        averageRating: 2
      },
    }, {
      id: 3,
      rating: 2,
      movie: {
        id: 3,
        title: 'M jak milosc',
        description: 'test',
        category: 'Action',
        productionDate: new Date(),
        trailerPath: 'testet',
        posterPath: 'fafds',
        duration: '123',
        MinimalAge: 13,
        averageRating: 1
      },
    }, {
      id: 2,
      rating: 4,
      movie: {
        id: 2,
        title: 'Avengers',
        description: 'test',
        category: 'Action',
        productionDate: new Date(),
        trailerPath: 'testet',
        posterPath: 'fafds',
        duration: '123',
        MinimalAge: 13,
        averageRating: 15
      },
    }
  ];

  ratingModel: RatingsResponseModel[];

  ngOnInit() {
    this.isDashboardComponent();
  }

  getRating(id, movie: MovieModel) {
    this.openDialog([movie, id]);
  }


  isDashboardComponent() {
    this.headerOpacityService.isDashboardComponentLoad(false);
  }

  openDialog(data: any[]) {
    const dialogRef = this.dialog.open(RatingDialogComponent, {
      data: data,
      minHeight: '210px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dummySetRating(data[0].id, data[1]);
      }
    });
  }

  setRating(movieId: number, mark: string) {
    this.ratingService.setFilmRatings(movieId, mark).subscribe(
      value => {
      },
      error2 => {
      }
    );
  }

  dummySetRating(movieId: number, mark: string) {
    this.ratingMovieModel.filter(value => {
      if (value.movie.id === movieId) {
        value.rating = +mark;
      }
    });
  }

  changeMovieMark(id) {
    this.ratingMovieModel.filter(value => {
      if (value.id === id) {
        value.rating = null;
      }
    });
  }

  changeFilterFlag(flag: boolean) {
    this.isRatingFilterPipeFlag = flag;
    this.changeNameDropdown(flag);
  }

  changeNameDropdown(flag: any) {
    if (flag == null) {
      this.dropdownTitle = 'WSZYSTKIE';
    } else if (flag) {
      this.dropdownTitle = 'OCENIONE';
    } else {
      this.dropdownTitle = 'BRAK OCENY';
    }
  }

  getRatingModel() {

  }

}
