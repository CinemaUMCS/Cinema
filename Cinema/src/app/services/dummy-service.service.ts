import { Injectable } from '@angular/core';
import { Movie, Seance } from '../admin/model/model.component';
import { Subject } from 'rxjs';
import { log } from 'util';

@Injectable()
export class DummyServiceService {
  subject = new Subject<Movie[]>();
  seances = new Subject<Seance[]>();
  private seancesData: Seance[] = [];
  private movies:Movie[] = [
    {
      'id': 1,
      'category': 'Action',
      'description': 'dummy text',
      'productionDate': new Date(2018,1,1),
      'title': 'xDs',
      'posterPath': '../../assets/dummy/generic.jpg',
      'trailerPath': 'none'
    },
    {
      'id': 2,
      'category': 'Actidsdsddon',
      'description': 'dumdssmysdsds text',
      'productionDate':  new Date(2018,1,1),
      'title': 'xDsds',
      'posterPath': '../../assets/dummy/generic.jpg',
      'trailerPath': 'none'
    },
    {
      'id': 3,
      'category': 'Acdsadsation',
      'description': 'dumdsdsadmy text',
      'productionDate':  new Date(2018,1,1),
      'title': 'xddddD',
      'posterPath': '../../assets/dummy/generic.jpg',
      'trailerPath': 'none'
    },
    {
      'id': 4,
      'category': 'Acdstion',
      'description': 'dummy text',
      'productionDate':  new Date(2018,1,1),
      'title': 'xDDDDD',
      'posterPath': '../../assets/dummy/generic.jpg',
      'trailerPath': 'none'
    },
    {
      'id': 5,
      'category': 'xD',
      'description': 'dummy text',
      'productionDate':  new Date(2018,1,1),
      'title': 'xD!',
      'posterPath': '../../assets/dummy/generic.jpg',
      'trailerPath': 'none'
    },

  ];
  constructor() { }
  getMovies() {
    return this.movies.slice();
  }
  getMovie(id: number) {
    return this.movies.find(m => m.id == id);
  }
  addMovie(movie: Movie) {
    this.movies.push(
      movie
    );
    console.log(this.movies);
    this.subject.next(this.movies.slice());

  }

  removeMovie(id: number) {
    console.log(id);
    var remove = this.movies.indexOf(this.movies.find(n => n.id == id));
    console.log(remove);
    this.movies.splice(remove,1);
    console.log(this.movies);
    this.subject.next(this.movies.slice());
  }
  editMove(index:number, movie: Movie) {
    this.movies[index] = movie;
    this.subject.next(this.movies.slice());
  }
  getSeances(id: number) {
    return this.seancesData.filter(s => s.id == id).slice();
  }

  getSeance(id: number) {
    return this.seancesData.find(s => s.movieId == id);
  }

  addSeance(seance: Seance) {
    this.seancesData.push(seance);
    this.seances.next(this.seancesData.slice());
  }

  removeSeance(id: number) {
    var seanceId = this.seancesData.indexOf(this.seancesData.find(s => s.id == id));
    this.seancesData.splice(seanceId,1);
    this.seances.next(this.seancesData.slice());
  }

  updateSeance(id: number, seance: Seance) {
    this.seancesData[id].seanceStart = seance.seanceStart;
    this.seancesData[id].normalTicketPRice = seance.normalTicketPRice;
    this.seancesData[id].concessionaryTicketPrice = seance.concessionaryTicketPrice;
    this.seancesData[id].movieId = seance.movieId;
    this.seancesData[id].roomId = seance.roomId;
    this.seancesData[id].duration = seance.duration;
  }
}
