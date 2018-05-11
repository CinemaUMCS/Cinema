import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {CredentialisModel} from '../../model/credentialis.model';
import {LoggedUserModel} from '../../model/loggedUser.model';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class AuthenticationService {

  BASE_URL = 'http://localhost:5000/';
  logged: boolean;
  private loggedSubject = new Subject<any>();

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
