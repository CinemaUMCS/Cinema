import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MovieModel} from '../../../model/movie.model';
import {Subject} from 'rxjs/Subject';

const url = 'http://localhost:5000/';



@Injectable()
export class MovieService {
  movies: MovieModel[];
  movieSubject = new Subject<MovieModel[]>();

  constructor(private http: HttpClient) {
    this.updateMoviesFromDb();
  }

  getMovies() {
    return this.movies;
  }

  getMovie(id: number) {
    return this.http.get<MovieModel>(url + 'movie/' + id, {responseType: 'json'});
  }

  updateMovie(id: number, model: MovieModel) {
    console.log(model);
    return this.http.put<MovieModel>(url + 'movie/' + id, model);
  }

  addMovie(model: MovieModel) {
    console.log("posting model: ");
    console.log(model);
    return this.http.post<MovieModel>(url + 'movie', model);
  }

  updateMoviesFromDb() {
    this.http.get<MovieModel[]>(url + 'movie', {responseType: 'json'}).subscribe( (data) => {
      this.movies = data;
      console.log(data);
      this.movieSubject.next(this.movies);
    });
  }

  remove(id: number) {
    console.log(id);
    this.http.delete<MovieModel>(url + 'movie/' + id).subscribe(
      data => {
        this.updateMoviesFromDb();
      }
    );
  }


}
