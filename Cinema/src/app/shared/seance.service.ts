import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {BaseHttpService} from './base-http.service';


@Injectable()
export class SeanceService extends BaseHttpService {

  constructor(private http: Http) {
    super();
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
}
