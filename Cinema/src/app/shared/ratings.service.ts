import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';
import {AuthenticationService} from './authentication.service';
import {BaseHttpService} from './base-http.service';
import {HttpParams} from '@angular/common/http';

@Injectable()
export class RatingsService extends BaseHttpService {

  constructor(private http: Http, private authenticationService: AuthenticationService) {
    super();
  }

  getUnratedMovies() {
    const header = new Headers({'authorization': this.authenticationService.getToken()});
    return this.http.get(super.setUrl('rating/UnratedMovies'));
  }

  setFilmRatings(movieId: number, mark: string) {
    const header = new Headers({'authorization': this.authenticationService.getToken()});
    // let body = new HttpParams();
    // body = body.set('rating', mark);
    return this.http.post(super.setUrl('rating/') + movieId + '?rating=' + mark, null, {headers: header});
  }

  getAllViewedMovies() {
    const header = new Headers({'authorization': this.authenticationService.getToken()});
    return this.http.get(super.setUrl('rating/WatchedMoviesWithRatings'), {headers: header});
  }

}
