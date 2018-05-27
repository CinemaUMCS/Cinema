import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {CredentialisModel} from '../../model/credentialis.model';
import {LoggedUserModel} from '../../model/loggedUser.model';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {UserModel} from '../../model/user.model';

@Injectable()
export class AuthenticationService {

  BASE_URL = 'https://ocenuczelnie.pl/cinema_api/';
  logged: boolean;
  private loggedSubject = new Subject<any>();
  actualUser: UserModel;

  constructor(private http: Http) {
    this.isLogged();
  }

  getUrl(url: string) {
    return this.BASE_URL + url;
  }

  login(credentialis: CredentialisModel) {
    return this.http.post(this.getUrl('account/login'), credentialis);
  }

  userLogIn() {
    this.loggedSubject.next(true);
  }

  isLogged() {
    if (localStorage.getItem('token')) {
      this.loggedSubject.next(true);
      return true;
    }
    this.loggedSubject.next(false);
    return false;
  }

  logout() {
    this.loggedSubject.next(false);
    localStorage.removeItem('token');
  }

  getMessage(): Observable<any> {
    return this.loggedSubject.asObservable();
  }

  getToken() {
    return 'Bearer ' + localStorage.getItem('token');
  }

}
