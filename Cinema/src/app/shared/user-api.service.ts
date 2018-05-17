import {Injectable} from '@angular/core';
import {BaseHttpService} from './base-http.service';
import {Headers, Http} from '@angular/http';
import {AuthenticationService} from './authentication.service';

@Injectable()
export class UserApiService extends BaseHttpService {

  constructor(private http: Http, private authenticationService: AuthenticationService) {
    super();
  }

  getActualUser() {
    const header = new Headers({'authorization': this.authenticationService.getToken()});
    return this.http.get(this.setUrl('account/details'), {headers: header});
  }

}
