import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DummyServiceService } from '../../../services/dummy-service.service';
import { Movie } from '../../model/model.component';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss'],
})
export class EditMovieComponent implements OnInit {
  movie: Movie;
  id: number;
  editMode = false;
  movieForm: FormGroup;
  categories = [
    ' Undefined',
    'Horror',
    'Comedy',
    'Thriller',
    'Action'
  ];

  constructor(private rr: Router, private route: ActivatedRoute, private dummu: DummyServiceService) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.editMode = params['id'] != null;
        console.log(this.editMode);
        this.id = +params['id'];
        this.initForm();
      }
    );
    this.id = +this.route.snapshot.params['id'];
    this.movie = this.dummu.getMovie(this.id);

  }

  initForm() {
    let id = 0;
    let title = '';
    let description = '';;
    let category = '';
    let productionDate = new Date();
    let posterPath = '';
    let trailerPath = '';
    if (this.editMode) {
      const movie = this.dummu.getMovie(this.id);
      id = movie.id;
      title = movie.title;
      description = movie.description;
      category = movie.category;
      productionDate = movie.productionDate;
      posterPath = movie.posterPath;
      trailerPath = movie.trailerPath;
    }

    this.movieForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'category': new FormControl(category, Validators.required),
      'productionDate': new FormControl(productionDate, Validators.required),
      'posterPath': new FormControl(posterPath, Validators.required),
      'trailerPath': new FormControl(trailerPath, Validators.required),
    });
  }

  onSubmit() {
    // console.log(this.movieForm.value);
    if (this.editMode) {
      this.dummu.editMove(this.id, this.movieForm.value);
    }
    else {
      this.dummu.addMovie(this.movieForm.value);
    }
    this.onCancel();
  }
  onCancel() {
    this.rr.navigate(['../../'], { relativeTo: this.route });
  }

}


