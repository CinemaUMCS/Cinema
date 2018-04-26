import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { DummyServiceService } from '../../services/dummy-service.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import { Subscription } from 'rxjs';
import { Movie } from '../model/model.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
})
export class MoviesComponent implements OnInit, AfterViewInit, OnDestroy {
  movies: Movie[];
  displayedColumns = ['ids', 'title', 'category', 'productionDate', 'options'];
  dataSource;
  subscription: Subscription;
  constructor(private dummyService: DummyServiceService) { }
  @ViewChild(MatPaginator) paginator: MatPaginator;

  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit() {
    this.subscription = this.dummyService.subject.subscribe(
      (movies: Movie[]) => { 
        this.movies = movies;
        this.dataSource = new MatTableDataSource(movies);
      }
    );
    this.movies = this.dummyService.getMovies();
    this.dataSource= new MatTableDataSource(this.movies);
    console.log(this.movies);
  }

  remove(id: number) {
    this.dummyService.removeMovie(id);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
