import { Component, OnInit } from '@angular/core';
import { DummyServiceService } from '../../services/dummy-service.service';
import { Seance, Movie } from '../model/model.component';
import { Subscription } from 'rxjs';
import { MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seances',
  templateUrl: './seances.component.html',
  styleUrls: ['./seances.component.scss']
})
export class SeancesComponent implements OnInit {
  movieId: number;
  movie: Movie;
  seances: Seance[];
  dataSource;
  displayedColumns = ['id', 'date', 'normal_price', 'price', 'edit', 'delete'];
  subscription: Subscription;
  constructor(private route: ActivatedRoute, private dummy: DummyServiceService) { }

  ngOnInit() {
    this.movieId = +this.route.snapshot.params['id'];
    this.movie = this.dummy.getMovie(this.movieId);
    this.route.params.subscribe( params => {
      this.movieId = +params['id'];
      this.movie = this.dummy.getMovie(this.movieId);
    })
    this.seances = this.dummy.getSeances(this.movieId);
    this.dataSource = new MatTableDataSource(this.seances);
    this.subscription = this.dummy.seances.subscribe(
      seances => {
        this.seances = seances;
        this.dataSource = new MatTableDataSource(seances);
      }
    )
  }

}
