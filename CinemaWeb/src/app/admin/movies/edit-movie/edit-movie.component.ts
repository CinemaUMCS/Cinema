import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DummyServiceService} from '../../../services/dummy-service.service';
import {FormGroup, FormControl, FormArray, Validators} from '@angular/forms';
import {MovieModel} from '../../../../model/movie.model';
import {MovieService} from '../../services/movie.service';

@Component({
  selector: 'app-edit-movie',
  templateUrl: './edit-movie.component.html',
  styleUrls: ['./edit-movie.component.scss'],
})
export class EditMovieComponent implements OnInit {
  movie: MovieModel;
  id: number;
  editMode = false;
  loaded = false;
  movieForm: FormGroup;
  categories = [
    ' Undefined',
    'Horror',
    'Comedy',
    'Thriller',
    'Action'
  ];

  constructor(private rr: Router, private route: ActivatedRoute, private movieService: MovieService) {
  }

  ngOnInit() {
    this.route.params.subscribe(
      (params) => {
        this.editMode = params['id'] != null;
        console.log(this.editMode);
        this.id = +params['id'];
        if (this.editMode) {
          this.movieService.getMovie(this.id).subscribe(
            data => {
              this.movie = data;
              console.log(this.movie);
              this.initForm();
            });
        } else {
          this.initForm();
        }

      }
    );

  }

  initForm() {
    let id = '';
    let title = '';
    let description = '';
    let category = '';
    let productionDate = new Date();
    let posterPath = '';
    let trailerPath = '';
    console.log('first');
    if (this.editMode) {

      //  id = this.movie.id;
      title = this.movie.title;
      console.log(this.movie);
      description = this.movie.description;
      category = this.movie.category;
      productionDate = this.movie.productionDate;
      posterPath = this.movie.posterPath;
      trailerPath = this.movie.trailerPath;
      console.log(this.movie);
    }
    console.log(this.movie);


    this.movieForm = new FormGroup({
      'title': new FormControl(title, Validators.required),
      'description': new FormControl(description, Validators.required),
      'category': new FormControl(category, Validators.required),
      'productionDate': new FormControl(productionDate, Validators.required),
      'posterPath': new FormControl(posterPath, Validators.required),
      'trailerPath': new FormControl(trailerPath, Validators.required),
    });
    this.loaded = true;
    console.log(this.id);
  }

  onSubmit() {
    // console.log(this.movieForm.value);
    if (this.editMode) {
      this.movieService.updateMovie(this.id, this.movieForm.value).subscribe(
        () => {
          console.log(this.movieForm.value);
          this.movieService.updateMoviesFromDb();
          this.rr.navigate(['/admin/panel/filmy']);
        }
      );
    } else {
      this.movieService.addMovie(this.movieForm.value).subscribe(
        (data) => {
          this.movieService.updateMoviesFromDb();
          this.rr.navigate(['/admin/panel/filmy']);

        }
      );
    }
    this.onCancel();
  }

  onCancel() {
    this.rr.navigate(['../../'], {relativeTo: this.route});
  }

}


