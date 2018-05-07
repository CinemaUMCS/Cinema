import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {BaseHttpService} from './base-http.service';
import {SeanceModel} from '../../model/seance.model';


@Injectable()
export class SeanceService extends BaseHttpService {

  actualSeance: SeanceModel;

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

  getSeanceById(seanceId: number) {
    return this.http.get(super.setUrl('seance/' + seanceId));
  }

  setActualSeance(seance: SeanceModel) {
    this.actualSeance = seance;
  }
}
