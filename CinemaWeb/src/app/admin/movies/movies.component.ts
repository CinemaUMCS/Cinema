import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { DummyServiceService } from '../../services/dummy-service.service';
import {MatTableDataSource, MatPaginator, MatTable} from '@angular/material';
import { Subscription } from 'rxjs';
import {MovieModel} from '../../../model/movie.model';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit, AfterViewInit, OnDestroy {
  movies: MovieModel[];
  displayedColumns = ['ids', 'title', 'category', 'productionDate', 'options'];
  dataSource;
  subscription: Subscription;
  // constructor(private dummyService: DummyServiceService) { }
  constructor(private movieService: MovieService) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {

  }
  ngOnInit() {
    // this.subscription = this.dummyService.subject.subscribe(
    //   (movies: MovieModel[]) => {
    //     this.movies = movies;
    //     this.dataSource = new MatTableDataSource(movies);
    //   }
    // );
    this.subscription = this.movieService.movieSubject.subscribe(
      (movies: MovieModel[]) => {
        this.movies = movies;
        console.log(movies);
        this.dataSource = new MatTableDataSource(this.movies);
        this.dataSource.paginator = this.paginator;
      }
    );

    this.movieService.updateMoviesFromDb();
    //this.movies = this.movieService.getMovies();

    // this.movieService.getMovies().subscribe(
    //   data => {
    //     this.movies = data;
    //     console.log(this.movies);
    //     this.dataSource = new MatTableDataSource(this.movies);
    //     this.dataSource.paginator = this.paginator;
    //   }
    // );
  }

  remove(id: number) {
    this.movieService.remove(id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
