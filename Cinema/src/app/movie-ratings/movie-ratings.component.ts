import {Component, OnInit} from '@angular/core';
import {HeaderOpacityService} from '../shared/header-opacity.service';

@Component({
  selector: 'app-movie-ratings',
  templateUrl: './movie-ratings.component.html',
  styleUrls: ['./movie-ratings.component.scss']
})
export class MovieRatingsComponent implements OnInit {
  constructor(private headerOpacityService: HeaderOpacityService) {
  }

  ngOnInit() {
    this.isDashboardComponent();
  }

  getRating(id) {
    console.log(id);
  }


  isDashboardComponent() {
    this.headerOpacityService.isDashboardComponentLoad(false);
  }

}
