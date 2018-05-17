import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {BaseHttpService} from './base-http.service';
import {SeanceModel} from '../../model/seance.model';
import {Subject} from 'rxjs/Subject';
import {SeanceRoomDataModel} from '../../model/seanceRoomData.model';
import {MovieModel} from '../../model/movie.model';


@Injectable()
export class SeanceService extends BaseHttpService {

  actualSeance: SeanceModel;
  actualMovie: MovieModel;
  private seanceSubject = new Subject<SeanceModel>();
  private movieSubject = new Subject<MovieModel>();

  seanceMessage = this.seanceSubject.asObservable();
  movieMessage = this.movieSubject.asObservable();

  constructor(private http: Http) {
    super();
  }

  getALlMovies() {
    return this.http.get(super.setUrl('movie'));
  }

  getAllMovieByDay(date: any) {
    return this.http.get(super.setUrl('movie/GetMoviesPlayingAtDate/?date=') + date);
  }

  getAllCategories() {
    return this.http.get(super.setUrl('movie/getCategories'));
  }

  getSeanceByMovieIdAndDate(id: number, date: string) {
    return this.http.get(super.setUrl('getByDateAndMovieId?movieId=') + id + '&date=' + date);
  }

  getSeanceByDate(date: string) {
    return this.http.get(super.setUrl('seance/getByDate/?date=') + date);
  }

  getSeanceRoomData(seanceId: number) {
    return this.http.get(super.setUrl('seance/getSeanceRoomData/' + seanceId));
  }

  getSeanceById(seanceId: number) {
    return this.http.get(super.setUrl('seance/' + seanceId));
  }

  getMovieById(movieId: number) {
    return this.http.get(super.setUrl('movie/' + movieId));
  }

  setActualSeance(seance: SeanceModel) {
    this.actualSeance = seance;
  }

  setActualSeanceObservable(seance: SeanceModel) {
    this.seanceSubject.next(seance);
  }

  setActualMovie(movie: MovieModel) {
    this.actualMovie = movie;
  }

  setActualMovieObservable(movie: MovieModel) {
    this.movieSubject.next(movie);
  }
}
