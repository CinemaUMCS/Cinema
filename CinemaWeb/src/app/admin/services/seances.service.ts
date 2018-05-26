import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { SeanceModel } from '../../../model/seance.model';
import {Subject} from 'rxjs/Subject';

const url = 'http://localhost:5000/';



@Injectable()
export class SeancesService {
  seances: SeanceModel[];
  seanceSubject = new Subject<SeanceModel[]>();

  constructor(private http: HttpClient) {
    this.updateMoviesFromDb();
  }

  getSeances() {
    return this.seances;
  }

  getSeance(id: number) {
    return this.http.get<SeanceModel>(url + 'seance/' + id, {responseType: 'json'});
  }

  updateSeance(id: number, model: SeanceModel) {
    console.log(model);
    return this.http.put<SeanceModel>(url + 'seance/' + id, model);
  }

  addSeance(model: SeanceModel) {
    console.log("posting model: ");
    console.log(model);
    return this.http.post<SeanceModel>(url + 'seance', model);
  }

  updateMoviesFromDb() {
    this.http.get<SeanceModel[]>(url + 'seance', {responseType: 'json'}).subscribe( (data) => {
      this.seances = data;
      console.log(data);
      this.seanceSubject.next(this.seances);
    });
  }

  remove(id: number) {
    console.log(id);
    this.http.delete<SeanceModel>(url + 'movie/' + id).subscribe(
      data => {
        this.updateMoviesFromDb();
      }
    );
  }

  getSeanceByMovieIdAndDate(id: number, date: string) {
    return this.http.get<SeanceModel[]>(url + 'seance/getByDateAndMovieId?movieId=' + id + '&date=' + date);
  }


}
